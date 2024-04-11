"use client";

import React, { useRef, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { inspect } from 'util';

inspect;

const ImageUploader = (props: {baseUrl: string}) => {

  // For file upload
  // This ref can be used to get the selected file for upload
  const fileSelectionRef = useRef<HTMLInputElement>(null);

  // An image selected for upload is provided with a URL for the preview
  const [createPreviewURL, setCreatePreviewURL] = useState<any>(null);
  // An uploaded image is given a 'name' in storage
  const [newImageName, setNewImageName] = useState('');
  // The Upload button is disabled while upload is in progress
  const [uploadInProgress, setUploadInProgress] = useState(false);

  // For image review
  const [imageNames, setImageNames] = useState<Array<string> | null>(null);
  // Only get an image to review once the name is submitted ('enter')
  const [showReviewImage, setShowReviewImage] = useState(false);
  // The name of the image to preview
  const [nameForReview, setNameForReview] = useState<any>('');

  // For image delete
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const getImageNamesForDisplay = () => {
    if(imageNames) {
      if(imageNames.length === 0) {
        return <>The bucket is empty - start filling it by uploading an image</>;
      } else {
        return imageNames.map((i: string) =>{
          return <div key={`imageList${i}`}>{i}</div>
        });
      }
    } else {
      return <>Loading...</>;
    }
  }
  const refreshImageNames = () => {
    setImageNames(null);
  }
  const generatePreviewImage = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // Only preview the 1st one - could there be more?
      const imageFile = event.target.files[0];
      setCreatePreviewURL(URL.createObjectURL(imageFile));
    }
  };

  const imageExists = async (event: any) => {
    const url = `${props.baseUrl}/api/uploads/${nameForReview}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      return true;
    } else {
      return false;
    }    
  }

  const submitForUpload = async (e: any) => {
    e.preventDefault();

    const input = fileSelectionRef.current!;

    const formData = new FormData();
    if (input.files) {
      formData.append(newImageName, input.files[0]);
    }

    // e.g. disable the Upload button
    // we could show a spinner...
    setUploadInProgress(true);

    // trigger the upload (and wait)
    try {
      const url = `${props.baseUrl}/api/upload`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      };
      const response = await fetch(url, options);
      if (response.ok) {
        console.log(`upload response ok, response.statusText = ${inspect(response.statusText)}`);

        if(response.statusText === "Bucket full") {
          alert('the bucket is full');
          // re-enable the Upload button
          setUploadInProgress(false);
          return;
        } else if(response.statusText === "Duplicate filename") {
          alert(`there's already a file with this name`);
          // re-enable the Upload button
          setUploadInProgress(false);
          return;
        } else {
          // clear input fields when done
          input.value = "";
          setNewImageName('');
          setCreatePreviewURL('');
        }
      } else {
        console.log(`upload response not ok, response.statusText = ${inspect(response.statusText)}`);
        alert(`not uploaded: ${inspect(response.statusText)}`);
      }
    } catch(err: any) {
      console.log(`upload err.response = ${inspect(err.response)}`);
      alert(`error ${JSON.stringify(err)}`);
    }

    // re-enable the Upload button
    setUploadInProgress(false);

    // Wait for 1 second before setting isPostsLoading to true
    setTimeout(() => {
      refreshImageNames();
    }, 1000);
  };

  const deleteAllImages = async (e: any) => {
    e.preventDefault();
    setDeleteInProgress(true);

    const url = `${props.baseUrl}/api/deleteImages`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      // clear input fields when done
      setTimeout(() => {
        refreshImageNames();
      }, 1000);
    } else {
      console.log(`deleteImages response.statusText = ${inspect(response.statusText)}`);
      alert(response.statusText);
    }

    setDeleteInProgress(false);
  }

  const getImageNames = async () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    };
    const res = await fetch(
      `${props.baseUrl}/api/getImageNames`,
      options,
    )
    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    setImageNames(await res.json());
  }

  if (imageNames === null) {
    getImageNames();
  }


  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className='my-4 mx-2'
      >
        <Container fluid>
          <h2>My images</h2>
            {getImageNamesForDisplay()}
        </Container>
      </Form>

      <Form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className='my-4 mx-2'
      >
        <Container fluid>
        <h2>Upload an image</h2>
          <Row>
            <Col sm={6}>
              <Form.Label>Image to upload</Form.Label>
              <Form.Control
                type="file"
                name="files"
                onChange={generatePreviewImage}
                ref={fileSelectionRef}
                accept="image/*"
              />
            </Col>
            <Col>
              <Form.Label>Image name for upload</Form.Label>
              <Form.Control
                className='required-field'
                id='name'
                type='text'
                placeholder='Enter name'
                onChange={(e) =>
                  setNewImageName(e.target.value)
                }
                value={newImageName}
              />
            </Col>
          </Row>
          <Row
            className='my-2'
          >
            <Col sm={6}>
              {nameForReview !== null &&
                <div>
                  <img
                    src={createPreviewURL}
                    height={'auto'}
                    width={200}
                  />
                </div>
              }
            </Col>
            <Col>
              <Button
                type="submit"
                onClick={submitForUpload}
                disabled={uploadInProgress || !newImageName}
              >
                Upload
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>

      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // console.log('setting setShowReviewImage true');
          if (await imageExists(nameForReview)) {
            setShowReviewImage(true);
          } else {
            alert(`image ${nameForReview} doesn't exist`);
          }
        }}
        className='my-4 mx-2'
      >
        <Container fluid>
          <h2>Review or download an image</h2>
          <Row
            className='my-2'
          >
            <Col>
            <Form.Label>Provide image name to view</Form.Label>
              <Form.Select
                className='required-field'
                id='nameForReview'
                onChange={(e) =>
                  {
                    // console.log('setting setShowReviewImage false');
                    setNameForReview(e.target.value);
                    setShowReviewImage(false);
                  }
                }
                value={nameForReview !== '' ? nameForReview : 'none'}
              >
                {imageNames ? imageNames.map((i) => {
                  // console.log(`for option n = ${i.name}`);
                  return <option
                    value={i}
                    key={i}
                  >{i}</option>;
                  }).concat([<option
                    value={'none'}
                    key={'none'}
                  >none</option>]) : <></>
                }
              </Form.Select>
              {nameForReview && showReviewImage &&
              <>
              <div
                key={`${props.baseUrl}/api/uploads/${nameForReview}`}
                className='my-2'
              >
                <img
                  key={`${nameForReview}`}
                  src={`${props.baseUrl}/api/uploads/${nameForReview}`}
                  alt={`a preview image of ${nameForReview}`}
                  height={'auto'}
                  width={200}
              />
              </div>
              </>
              }
            </Col>
            <Col>
            <Button
              onClick={()=>{setShowReviewImage(true)}}
              disabled={!nameForReview || nameForReview === 'none'}
            >
              Preview image
            </Button>
            <Button
              onClick={async ()=>{
                // console.log(`save image from DB to server for ${i.name}`);
                const url = `${props.baseUrl}/api/uploads/${nameForReview}`;
                const options = {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                  },
                };
                const response = await fetch(url, options);
                // console.log(response);
                const fileBlob = await response.blob();
                // this works and prompts for download
                var link = document.createElement('a')  // once we have the file buffer BLOB from the post request we simply need to send a GET request to retrieve the file data
                link.href = window.URL.createObjectURL(fileBlob);
                link.download = `${nameForReview}.jpg`;
                link.click();
                link.remove();  //afterwards we remove the element  
              }}
              disabled={!nameForReview || nameForReview === 'none'}
            >
              Download image
            </Button>
            </Col>
          </Row>
        </Container>
      </Form>

      <Form
        onSubmit={(e) => {
          e.preventDefault();

        }}
        className='my-4 mx-2'
      >
        <Container fluid>
          <h2>Delete all my images</h2>
          <Button
            type="submit"
            onClick={(e) => {
              deleteAllImages(e);
              setNameForReview('');
              setShowReviewImage(false);
            }}
            disabled={deleteInProgress}
          >
            Delete all my images
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default ImageUploader;
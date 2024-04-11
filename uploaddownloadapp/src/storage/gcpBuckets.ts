import { BucketExistsResponse, Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { inspect } from 'util';

// adapted from https://github.com/googleapis/nodejs-storage/blob/main/samples/streamFileUpload.js

// This bucket must exist
const GCP_BUCKET_NAME = 'demo-images-app-bucket';

export async function uploadFileGCP(
  blob: Blob, 
  filename: string,
) {
  console.log(`GCP go to ${filename} upload to ${GCP_BUCKET_NAME}`);
  // Creates a client
  const storage = new Storage();

  // Get a reference to the bucket
  const myBucket = storage.bucket(GCP_BUCKET_NAME);

  // Create a reference to a file object
  const file = myBucket.file(filename);

  // The new ID for your GCS file
  //const destFileName = filename;
  // The content to be uploaded in the GCS file
  //const contents = 'your file content';
  // Create a pass through stream from a string
  //const passthroughStream = new stream.PassThrough();
  //passthroughStream.write(contents);
  //passthroughStream.end();

  const buffer = Buffer.from(await blob.arrayBuffer());
  const stream = Readable.from(buffer);

  async function streamFileUpload() {
    stream.pipe(file.createWriteStream()).on('finish', () => {
      // The file upload is complete
      console.log('uploaded stream to GCP bucket')
    });

    console.log(`${filename} uploaded to ${GCP_BUCKET_NAME}`);
  }

  await streamFileUpload().catch(console.error);
  // [END storage_stream_file_upload]

  return NextResponse.json({ status: 200 }, {statusText: "Stream initiated" });
}

export async function fileExistsGCP(
  filename: string,
): Promise<BucketExistsResponse> {

  console.log(`GCP go to see if ${filename} exists in ${GCP_BUCKET_NAME}`);

  // Creates a client
  const storage = new Storage();

  // Get a reference to the bucket
  const myBucket = storage.bucket(GCP_BUCKET_NAME);

  // Create a reference to a file object
  const file = myBucket.file(filename);

  console.log(`made GCP file to see if ${filename} exists...`);
  
  return file.exists();
}

export async function getFileDataGCP(
  filename: string,
) {
  console.log(`GCP get ${filename} from ${GCP_BUCKET_NAME}`);

  // Creates a client
  const storage = new Storage();

  // Get a reference to the bucket
  const myBucket = storage.bucket(GCP_BUCKET_NAME);

  const remoteFile = myBucket.file(filename);
  const stream = remoteFile.createReadStream() as unknown as ReadableStream;

  console.log(`GCP pass back readstrem for ${filename} from ${GCP_BUCKET_NAME}`);

  return new Response(stream);
}

export async function getImageNamesGCP(
): Promise<NextResponse> {
  console.log(`GCP get image names from ${GCP_BUCKET_NAME}`);

  // Creates a client
  const storage = new Storage();

  // Get a reference to the bucket
  const myBucket = storage.bucket(GCP_BUCKET_NAME);

  const [files] = await myBucket.getFiles();
  const names = files.map((gcpFile) => {
    return gcpFile.metadata.name;
  });

  console.log(`GCP got image names ${inspect(names)}`);

  return NextResponse.json(names);
}

// See https://github.com/googleapis/nodejs-storage/blob/main/samples/deleteFile.js
export async function deleteFilesGCP(
): Promise<NextResponse> {
  console.log(`GCP delete image names from ${GCP_BUCKET_NAME}`);

  // Creates a client
  const storage = new Storage();

  // Get a reference to the bucket
  const myBucket = storage.bucket(GCP_BUCKET_NAME);

  const fileNamesResponse = await getImageNamesGCP();

  if (fileNamesResponse.ok) {
    const fileNames = await fileNamesResponse.json();
    for (const filename of fileNames) {
      console.log(`delete ${filename}...`);

      // Optional:
      // Set a generation-match precondition to avoid potential race conditions
      // and data corruptions. The request to delete is aborted if the object's
      // generation number does not match your precondition. For a destination
      // object that does not yet exist, set the ifGenerationMatch precondition to 0
      // If the destination object already exists in your bucket, set instead a
      // generation-match precondition using its generation number.
      const deleteOptions = {
        //ifGenerationMatch: generationMatchPrecondition,
      };
      const filenameForDelete = `${filename}`;
      await myBucket.file(filenameForDelete).delete(deleteOptions);
      console.log(`deleted ${filename}`);
    }
    return NextResponse.json({ status: 200 }, {statusText: "Files deleted" })
  } else {
    return NextResponse.json({ status: 500 }, {statusText: "Failed to get filenames for delete" })
  }
}

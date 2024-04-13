Examples of python-backed APIs, implemented with fastAPI and deployed on Google Cloud Platform.

## Python server

Uses [uvicorn](https://www.uvicorn.org/) and [fastAPI](https://fastapi.tiangolo.com/) to offer a simple hello-world API backed by python code. 

---

## Running locally

### Prerequisites:
Install python from [here](https://www.python.org/downloads/).
Use pip for python libraries.
~~~~
pip install fastapi
pip install uvicorn
~~~~

### To run:

    ./start1pythonRun.sh

or

    uvicorn main:app

Expect to see this response
~~~~
INFO:     Started server process [41218]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
~~~~

Then in a browser visit http://127.0.0.1:8000

---
## Using docker

To have docker available locally on the command line, install from [here](https://docs.docker.com/get-docker/)

See the docker environment defined in the requirements.txt and the Dockerfile.

The (./buildAndRunDockerContainer.sh) script includes commands to build the docker image and deploy a docker container.  

Visiting http://localhost:8000/hello validates that we're seeing the reponse from the python script.

Opening the docker desktop application shows a container called mycontainer and an image called myimage.

## Build and deploy on Google Cloud Platform

1. Enable the gcloud command line interface (CLI) with a guide [here](https://cloud.google.com/sdk/docs/install).

2. Create or choose a project on Google Cloud Platform and give it a name, for eaxmple, python-project.  Find the ID of this project, in the Dashboard, you'll see the name of the project and the ID that GCP assigned.  That ID will be used in further gcloud set up, the build and run commands.

3. In [buildAndRunDockerContainer.sh](./buildAndRunDockerContainer.sh), at the top of the file, set the project id, the chosen region and a repo name of your choosing (e.g. my-repo).  Also set an image name of your choosing (e.g. my-image)  and a service name of your choosing (e.g. my-service).

4. Run [buildAndRunDockerContainer.sh](./buildAndRunDockerContainer.sh).  The first time this is run in a given project which hasn't run Cloud Builr or Cloud Run before, you'll need to say y to enable each of cloudresourcemanager.googleapis.com, cloudbuild.googleapis.com and run.googleapis.com.  On subsequent runs (e.g. after a source code update), you can leave this script to run without interaction until completion.  As the script runs, you may see 'WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager.'.  This is a warning that is safe to ignore when running the docker build. 


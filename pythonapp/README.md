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

2. Create or choose a project on Google Cloud Platform, say python-project

3. Enable the Artifact Registry API (e.g. from Dashboard, go to Artifact Registry)

4. Create a repository in Artifact Registry called python-project-repo
 - format should be Docker
 - set the location to a suitable region
 - other settings as default

5. Enable the Cloud Build API (e.g. from Dashboard, go to Cloud Build, or from running the script, say 'y')

6. Create a bucket in Cloud Storage ending in my-project-id_cloudbuild (e.g. called python-project_cloudbuild)

7. Create a service in Cloud Run (e.g. called python-project-service)

Configure project settings and run commands in (./buildAndRunDockerContainer.sh).

### Trouble shooting

Capitalised variables GCLOUD_PROJECT_ID, REPO, SERVICE are set in the (buildAndRunDockerContainer.sh) script, and these are some errors that may be issued for misconfigured script/GCP.

1. Error reported from script
~~~~
#ERROR: (gcloud.auth.application-default.set-quota-project) User [jean.flower@generativealchemy.com] does not have permission to access projects instance [vernal-verve-419408:testIamPermissions] (or it may not exist)
~~~~
Check that the GCLOUD_PROJECT_ID is right

2. Error reported from script
~~~~
#API [cloudresourcemanager.googleapis.com] not enabled on project [adroit-medium-419410]. Would you like to enable and retry (this will take a few minutes)? (y/N)?
~~~~
say y

3. Error reported from script
~~~~
#API [cloudbuild.googleapis.com] not enabled on project [adroit-medium-419410]. Would you like to enable and retry (this will take a few minutes)? (y/N)?
~~~~
say y

4. Error reported from script
~~~~
name unknown: Repository "demo-repo" not found
ERROR: push attempt 1 detected failure, retrying: step exited with non-zero status: 1
~~~~
Check that Artefact Register has a repo called REPO

5. Error reported from script
~~~~
The following APIs are not enabled on project [adroit-medium-419410]:
        run.googleapis.com
~~~~
say y

6. Error reported from script
~~~~
ERROR: (gcloud.run.deploy) PERMISSION_DENIED: Cannot access API run.googleapis.com in project adroit-medium-419410
~~~~
Check that there's a service called SERVICE in Cloud Run

7. Service creation seems to get stuck on 
~~~~
Deploying container to Cloud Run service [demo-service] in project [adroit-medium-419410] region [us-central1]
    ⠹ Deploying...
      ⠹ Creating Revision...                             
      . Routing traffic...
      ✓ Setting IAM Policy... 
~~~~
Check the Container Port is set to 80

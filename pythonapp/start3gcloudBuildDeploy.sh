set -x # verbose mode for running script

# pick up this ID from the dashboard - GCP will assign an ID to each project
export GCLOUD_PROJECT_ID="affable-envoy-123"

# we'll use a repository in Artifact Registry, choose a name for it here
export REPO="my-repo"
# choose a region where you want the build anf run work to happen
export REGION="us-central1"
# choose a name for the docker image that cloud build will create
export IMAGE="my-image"
# choose a name for the service image that cloud run will offer up
export SERVICE="my-service"

####  GCP credentials for command line work
# you can comment these out if you're already authenticated with the right account
# revoke if you may have used the CLI for a different account
gcloud auth revoke
# login goes to the browser for google authentication
gcloud auth login 

####  GCP set up correct project
# you can comment these out if you're already using GCP CLI with your project
gcloud auth application-default set-quota-project ${GCLOUD_PROJECT_ID}
gcloud config set project ${GCLOUD_PROJECT_ID}

# TODO script this part for simpler first setup
# query for repos in this project
# (side-effect will ask to enable Artifact Registry if it's not enabled)
# then if there's not one called REPO then create one
# and set the type as docker and the region as REGION

# create a repo for the built images to land in
# if the REPO already exists the following will trigger a red ERROR
# ERROR: (gcloud.artifacts.repositories.create) ALREADY_EXISTS
# so you can comment out this line if you don't need it
gcloud artifacts repositories create ${REPO} \
    --repository-format=docker \
    --location=${REGION} \
    --description="DESCRIPTION"
# for more arguments and settings see 
# https://cloud.google.com/artifact-registry/docs/repositories/create-repos#docker

####  GCP Cloud Build create docker image
export IMAGE_TAG=${REGION}-docker.pkg.dev/$GCLOUD_PROJECT_ID/$REPO/$IMAGE
gcloud auth configure-docker ${REGION}-docker.pkg.dev
gcloud builds submit --tag ${IMAGE_TAG}
# shows up in Cloud Build
# shows up in Artefact Registry
# for full arguments and settings see
# https://cloud.google.com/sdk/gcloud/reference/builds/submit

####  GCP Cloud Run deploy docker image
gcloud run deploy ${SERVICE}\
            --image ${IMAGE_TAG}:latest \
            --region ${REGION} \
            --allow-unauthenticated \
            --port 8080
# then shows up in Cloud Run
# for full arguments and settings see 
# https://cloud.google.com/sdk/gcloud/reference/run/deploy

# Go somewhere like
# https://demo-python-deploy-service-edcmupgszq-uc.a.run.app/hello
# and see Hello World

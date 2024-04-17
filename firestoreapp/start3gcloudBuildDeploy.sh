set -x # verbose mode for running script

export GCLOUD_PROJECT_ID="nextjs-project-419706" # assigned by google

export REPO="nextjs-project-repo"
export REGION="us-central1"
export IMAGE="nextjs-project-image"
export SERVICE="firebase-auth-service"

####  GCP credentials for command line work
# revoke if you may have used the CLI for a different account
gcloud auth revoke
# login goes to the browser for google authentication
gcloud auth login 

####  GCP set up correct project
gcloud config set project ${GCLOUD_PROJECT_ID}
gcloud auth application-default set-quota-project ${GCLOUD_PROJECT_ID}

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


####  GCP build docker image
export IMAGE_TAG=${REGION}-docker.pkg.dev/$GCLOUD_PROJECT_ID/$REPO/$IMAGE
gcloud auth configure-docker ${REGION}-docker.pkg.dev
gcloud builds submit --tag ${IMAGE_TAG}
# shows up in Cloud Build
# shows up in Artefact Registry

####  GCP deploy docker image
gcloud run deploy $SERVICE\
            --image ${IMAGE_TAG}:latest \
            --region ${REGION} \
            --allow-unauthenticated
# shows up in Cloud Run

set -x # verbose mode for running script

export GCLOUD_PROJECT_ID="nextjs-project-419706" 
export REPO="nextjs-project-repo"
export REGION="us-central1"
export IMAGE="nextjs-project-image"
export SERVICE="nextjs-auth-project-service"

####  GCP credentials for command line work
# revoke if you may have used the CLI for a different account
gcloud auth revoke
# login goes to the browser for google authentication
gcloud auth login 

####  GCP set up correct project
gcloud config set project ${GCLOUD_PROJECT_ID}
gcloud auth application-default set-quota-project ${GCLOUD_PROJECT_ID}

####  GCP build docker image
export IMAGE_TAG=${REGION}-docker.pkg.dev/$GCLOUD_PROJECT_ID/$REPO/$IMAGE
gcloud auth configure-docker ${REGION}-docker.pkg.dev
gcloud builds submit --tag $IMAGE_TAG
# shows up in Cloud Build
# shows up in Artefact Registry

####  GCP deploy docker image
gcloud run deploy $SERVICE\
            --image ${IMAGE_TAG}:latest \
            --platform managed \
            --region ${REGION} \
            --allow-unauthenticated
# shows up in Cloud Run

# Go somewhere like
# https://demo-python-deploy-service-edcmupgszq-uc.a.run.app/hello
# and see Hello World

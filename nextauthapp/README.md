## Summary

This nextjs app allows users of the site to register an email/password and get an account. After verifying their email address, they can use their email/password combination to log in and access a 'doUsefulThings' page.  Only logged in people can access this page.

Credentials management, email verification and a 'forgot password' workflow are provided by Google Firebase authentication.

## To run the code locally
Pre-requisites - nodejs, npm.

Clone this repo and ```npm install```.

Configure the site for redirect after customers verify their email. Add a (gitignored) .env file alongside the .env.sample file and add the URL where you're going to run the site, see .env.sample for an example.

In https://console.firebase.google.com/, have a firebase Project. Enable Authentication for this app, of the Email/Password type. Go to Users and add a user (with a real, accessible email address).  

Have a firebase App, of a Web App type. Get an apiKey and authDomain for our firebase app and set those values in firebaseConfig.js.  It's OK for these keys to be available in client code, see https://firebase.google.com/docs/projects/api-keys.

### Local dev build

To run the webserver, run (start1localServer.sh) or ```npm run dev```.

### In docker desktop

1. Ensure that the ENV NEXT_PUBLIC_SIGNIN_URL= line in the Dockerfile has value matching the target URL e.g. http://localhost:8123

2. Run (start3dockerRunAndBuild.sh).

### On Google Cloud Platform

1. Enable the gcloud command line interface (CLI) with a guide [here](https://cloud.google.com/sdk/docs/install).

2. Create or choose a project on Google Cloud Platform, say nextjs-project

3. Enable the Artifact Registry API (e.g. from Dashboard, go to Artifact Registry)

4. Create a repository in Artifact Registry called nextjs-project-repo
 - format should be Docker
 - set the location to a suitable region
 - other settings as default

5. Enable the Cloud Build API (e.g. from Dashboard, go to Cloud Build, or from running the script, say 'y')

6. Create a bucket in Cloud Storage ending in my-project-id_cloudbuild (e.g. called nextjs-project_cloudbuild)

7. Create a service in Cloud Run (e.g. called nextjs-auth-project-service).  

8. Ensure that the ENV NEXT_PUBLIC_SIGNIN_URL= line in the Dockerfile has value matching the target URL e.g. https://nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app/

9. Ensure that the target URL domain is whitelisted in the Firebase app (under Settings, Authorized Domains, add something like nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app).

10. Run [start3gcloudBuildDeploy.sh](start3gcloudBuildDeploy.sh).

## Next steps
To assign roles to users and use role-based access control, look into https://cloud.google.com/identity-platform/docs/how-to-configure-custom-claims.

Read through this with specific attention to the Authentication section.
https://firebase.google.com/support/guides/security-checklist#security_rules. 

Delete users as well as adding them.

Ensure that the customer-facing verification emails and password reset emails look good.

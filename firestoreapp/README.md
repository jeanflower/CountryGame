## Summary

This app authenticates the user with Firebase auth and then access data for that user on firestore.

This nextjs app allows users of the site to register an email/password and get an account. After verifying their email address, they can use their email/password combination to log in and access a data page for viewing, adding and deleting data.  Only logged in people can access this page.

Credentials management, email verification and a 'forgot password' workflow are provided by Google Firebase authentication.   We can see in [package.json](package.json) that we have included a dependency on the [firebase](https://www.npmjs.com/package/firebase) library. 

## Setup

In https://console.firebase.google.com/, have a firebase Project. Enable Authentication for this app, of the Email/Password type. Go to Users and add a user (with a real, accessible email address).  

Have a firebase App, of a Web App type. Get the Firebase configuration (seven settings including apiKey) for the firebase app and set those values in .env and Dockerfile.  It's OK for these keys to be available in client code, see https://firebase.google.com/docs/projects/api-keys.

## To run the code locally
Pre-requisites - nodejs, npm.

Clone this repo and ```npm install```.

To run the webserver, run (start1localServer.sh) or ```npm run dev```.

### In docker desktop

1. Ensure that the ENV NEXT_PUBLIC_SIGNIN_URL= line in the Dockerfile has value matching the target URL e.g. http://localhost:8123

2. Set the seven FIREBASE congiguration kets in the Dockerfile.

3. Ensure that the target URL domain is whitelisted in the Firebase app (under Settings, Authorized Domains, add something like nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app).

4. Run (start2dockerRunAndBuild.sh).

### On Google Cloud Platform

1. Enable the gcloud command line interface (CLI) with a guide [here](https://cloud.google.com/sdk/docs/install).

2. Create or choose a project on Google Cloud Platform, say nextjs-project.  Set the Project ID as GCLOUD_PROJECT_ID in the [start3gcloudBuildDeploy.sh](start3gcloudBuildDeploy.sh) script

3. Set a REGION in in the [start3gcloudBuildDeploy.sh](start3gcloudBuildDeploy.sh) script.

4.  Choose names for the REPO, IMAGE and SERVICE in the [start3gcloudBuildDeploy.sh](start3gcloudBuildDeploy.sh) script

5. Set the seven FIREBASE congiguration kets in the Dockerfile.

6. Ensure that the ENV NEXT_PUBLIC_SIGNIN_URL= line in the Dockerfile has value matching the target URL e.g. https://nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app/

7. Ensure that the target URL domain is whitelisted in the Firebase app (under Settings, Authorized Domains, add something like nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app).

8. Run [start3gcloudBuildDeploy.sh](start3gcloudBuildDeploy.sh).

## Next steps
To assign roles to users and use role-based access control, look into https://cloud.google.com/identity-platform/docs/how-to-configure-custom-claims.

Read through this with specific attention to the Authentication section.
https://firebase.google.com/support/guides/security-checklist#security_rules. 

Delete users as well as adding them.

Ensure that the customer-facing verification emails and password reset emails look good.

## What it looks like

This image shows the login page, a page only accessible to authenticated users, and a view of the Firebase Console Users table.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/firestoreapp.png" width=60% height=60%>



Based on https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/
with some code migration to typescript, some fixes and code extensions.

See firebase auth examples here
https://github.com/firebase/snippets-web/tree/1abb6ce1a784ae5552946dff5f1f5aab7dcbda30/snippets/auth-next/email

To runm you need
NEXT_PUBLIC_SIGNIN_URL (in .env and in Dockerfile)
is
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
https://firebase.google.com/docs/auth/web/email-link-auth 
Got to Authentication->Settings->Authorized Domains, URL something like
https://console.firebase.google.com/u/1/project/my-auth-example-11111/authentication/settings

Also seven settings prefxed NEXT_PUBLIC_FIREBASE_ also in .env and Dockerfile.

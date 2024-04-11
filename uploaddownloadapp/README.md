This app is connected with a bucket on Google Cloud Storage.  It allows the client to upload a file and download an image file. 

The app shows names of files in the bucket.  We can upload a file from
our local filesystem and give it a name for the upload.

A difficult issue to debug and understand was about Nextjs caching.
The production page used caching for getImageNames and thus 
showed out-of-date results after a new image was added. After some time
researching how to disable nextjs caching, I switched to
use POST instead of GET for the getImageNames API.

The filenames on the cloud populate a drop-down list where
we can select a file for preview or download.

There was a difficult glitch to overcome; repeating
failure of upload when using production build with
logged errors 
```p [Error]: Expected signal to be an instanceof AbortSignal```
Fixed with a nextjs config change to disable serverMinification as described [here](https://github.com/node-fetch/node-fetch/issues/784).  Perhaps in future nextjs versions this will be fixed.

The site is hosted at
https://nextjs-uploaddownload-service-qzwnizxtoa-uc.a.run.app/

There are scripts to deploy [start1, locally](start1localServer.sh) and on [start3, GCP](/Users/jeanflower/outsideICloud/git/full-stack-demos/uploaddownloadapp/start3gcloudBuildDeploy.sh).  The script to run on [start2, Docker desktop](start2dockerRunAndBuild.sh) will run but doesn't have privileges to interact with the cloud Storage.  If we want to have the app to work in Docker Desktop we need to do something like [this](https://stackoverflow.com/questions/57137863/set-google-application-credentials-in-docker).

When running locally, as long as we are logged in to the Google CLI, the site can access the cloud storage.

When running on Google Cloud, the default service agent for run already has access to storage. Default permissions are listed [here](https://cloud.google.com/iam/docs/understanding-roles#run.serviceAgent).

This image shows the web app and a browser view of the bucket contents.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/uploaddownloadappScreenshot.png" width=90% height=90%>

A deployed version of the app can be found [here](https://nextjs-uploaddownload-service-qzwnizxtoa-uc.a.run.app/).

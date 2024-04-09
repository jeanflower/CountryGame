This repo is made up of a set of small demo examples which focus on individual capabilities which might fit together to build a full-stack web app.  The complete app would be a python-backed compute presented through an API with a javascript web app, with access control.  The part solutions are intended to provide bite-sized steps along the way to such a full-stack web app.

The running example is an app that gets specified start and end countries from a user and reports back a shortest path passing through neighbouring countries.  The idea is that the logic for this path-finding is best set out in back-end server-side python code, perhaps using a database, while the best customer-facing front-end experience is presented using javascript frameworks.

# Front end 

## jswebapp

[Link to folder](jswebapp)

This includes an HTML file for our game with input fields to fill in and a button to click.  

When the button is clicked, a response is computed by calling an API.

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://storage.googleapis.com/static-website-bucket2/jswebapp/index.html)

Learn more HTML from the MDN docs [here](https://developer.mozilla.org/en-US/docs/Web/HTML).

This image shows the page in a browser. The browser's Network panel shows some details about the call to the API when the Get Path button is clicked.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/jswebScreenshot.png" width=90% height=90%>

## stylingcssapp

[Link to folder](stylingcssapp)

A demo of various css styling controls.  Refer to https://www.w3schools.com/css/ for more.  To run, load index.html into a browser and explore making changes.

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://storage.googleapis.com/static-website-bucket2/stylingcssapp/index.html)

Learn more CSS by following the w3schools tutorial [here](https://www.w3schools.com/css/).

This image shows some of the rendered HTML. The HTML for the two sections is the same but different CSS styling has been applied for color, border, background and layout.  The browser Elements tab shows details of the styling for selected page elements.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/stylingcssScreenshot.png" width=90% height=90%>

## reactapp

[Link to folder](reactapp)

React is a javascript front-end library created by Facebook.  React apps are built out of react components, and use JSX syntax, a kind of hybrid between HTML and js. They are designed to be .. reactive.  

Learn more React by following the react tutorial and docs [here](https://react.dev/learn/tutorial-tic-tac-toe).

This image shows the react app in action.  A React development browser add-in showing details about components and props.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/reactappScreenshot.png" width=80% height=80%>

# Backend

## pythonapp

[Link to folder](pythonapp)

The pythonapp folder includes an algorithm in app/main.py, served using uvicorn. There are three scripts for running the python; one running directly, the second building a docker container, and the third builds and deploys a docker container in Google Cloud Platform (using Cloud Build and Cloud Run).

A deployed version of the game can be found at https://python-project-service-2ldm6ft3ha-uc.a.run.app/game

Learn more about Dockerizing python [here](https://fastapi.tiangolo.com/deployment/docker/#build-a-docker-image-for-fastapi) and deploying on GCP [here](https://medium.com/@taylorhughes/how-to-deploy-an-existing-docker-container-project-to-google-cloud-run-with-the-minimum-amount-of-daca0b5978d8).

This image shows the served page and a view of the Cloud Run page for the corrensponding service, with its logs.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/pythonappScreenshot.png" width=90% height=90%>

## nodeapp

[Link to folder](nodeapp)

There is a node app which can be run directly, and uses fetch to call the python-backed API.  Results are printed to the console.

The app queries for start and end countries and prints a path

Learn more about nodejs development in VSCode [here](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial).

This image shows the node app running in a local terminal.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/nodejsappScreenshot.png" width=50% height=50%>

## mongoapp

[Link to folder](mongoapp)

A nodejs app which connects to a specified mongodb (mongo database) to perform some CRUD (create read update delete) operations.  The mongo database requires a database called crudExample. Create a .env.local file in the monfoapp folder (your env file will be gitignored) and follow the pattern of .env.sample, to point the code at your mongoDB location.

Learn more from the mongodb node docs [here](https://www.mongodb.com/docs/drivers/node/current/).

This image shows the mongo app running in a local terminal and a web view of the mongo content.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/mongoappScreenshot.png" width=80% height=80%>

# Full stack

## nextjsapp

[Link to folder](nextjsapp)

Use the nextjs framework to write client-side HTML and server-side fetch calls to build a working web app that uses the python API call on the back end.  The nextjs app will work with our python API endpoint even if the python API prohibits cross-origin requests, because the call to the python API is from our back-end server and not directly from the browser.

A deployed version of the app can be found at https://nextjs-project-service-qzwnizxtoa-uc.a.run.app/

Learn more by following the nextjs tutorial [here](https://nextjs.org/learn).

This image shows the nextjs app delivering content to the browser.  In the Network panel we can see details about a call to the server side of the nextjs deployment. 

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/nextjsScreenshot.png" width=90% height=90%>

## nextauthapp

[Link to folder](nextauthapp)

Use the nextjs framework with Google Firebase Authentication to write an app with customer login, logout and a page which can only be accessed by a customer who has logged in.

This app has a configuration setting which is used to tell Google Firebase a 'continuation URL'.  After someone has verified their email, this defines where the web page goes to to continue.  That is, where is the site hosted?  For local running, this is managed using a NEXT_PUBLIC_ environment variable set in .env. For docker (including Google Cloud Run), it's managed by setting an environment variable in the Dockerfile.  Note that this setting is not a secret and must be known to the client code.

There are a huge number of tutorials and blog pages about firebase and authentication.  We want to avoid using firebase hosting (so we can be free to host however we want) and we don't want to restrict users to log in with Google accounts (many tutorials have an outcome where anyone with a google account can log in).  So tread carefully when seeking more information.  This post is quite good [here](https://www.stoman.me/articles/nextjs-firebase-auth).

This image shows the login page, a page only accessible to authenticated users, and a view of the Firebase Console Users table.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/nextauthappScreenshot.png" width=90% height=90%>

A deployed version of the app can be found at 
https://nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app/

## nextauthtsapp

[Link to folder](nextauthtsapp)

A Typescript version of our javascript [nextauthapp](nextauthapp).  Adding type definitions adds to code quality.  Enforcing types revealed some bugs and weaknesses in the javascript implementation (passing a wrong argument to a function, assuming values are properly defined before using them without any guard to handle the undefined cases).

Learn more about typescript [here](https://www.typescriptlang.org/docs/).

This image shows a diff between the plain javascript version of the home page and a typescript version.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/nextauthtsappScreenshot.png" width=90% height=90%>

The customer-facing outcome of this app is the same as [nextauthapp](nextauthapp).

# More steps

 - Styling using bootstrap
 - handling of secrets
 - nextjs routing, server-side work, middleware
 - Testing with jest and Cypress
 - Upload and download of text and binary files to cloud storage
 - Encryption of data
 - Sending emails from code
 - Cookie management

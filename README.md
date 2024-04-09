This repo is about delivering a python-backed compute result through a javascript web app.  The solutions are intended to provide bite-sized steps along the way to a full-stack web app.

The running example is an app that gets specified start and end countries from a user and reports back a shortest path passing through neighbouring countries.  The idea is that the logic for this path-finding is best set out in back-end server-side python code, perhaps using a database, while the best customer-facing front-end experience is presented using javascript frameworks.

# Front end 

## jswebapp

[Link to folder](jswebapp)

This includes an HTML file for our game with input fields to fill in and a button to click.  

When the button is clicked, a response is computed by calling an API.

About CORS : The server in our example provides a response only because it has been configured to allow CORS (cross-origin requests).  For security, browsers check with an API whether a call is permitted before making an actual request.  Our API endpoint is allowing calls from any client (cross-origin).  More usually, an API doesn't allow cross-origin, so we'd need to offer up our HTML from an origin which also provides an API (same-origin).  In the back-end, a same-origin API can then make a further call to a different address for the ultimate data-providing API.  Read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://storage.googleapis.com/static-website-bucket2/jswebapp/index.html)

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/jswebScreenshot.png" width=90% height=90%>

## stylingcssapp

[Link to folder](stylingcssapp)

A demo of various css styling controls.  Refer to https://www.w3schools.com/css/ for more.  To run, load index.html into a browser and explore making changes.

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/stylingcssScreenshot.png" width=90% height=90%>

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://storage.googleapis.com/static-website-bucket2/stylingcssapp/index.html)

## reactapp

[Link to folder](reactapp)

React is a javascript front-end library created by Facebook.  React apps are built out of react components, and use JSX syntax, a kind of hybrid between HTML and js. They are designed to be .. reactive.  Have a look at ```npm test``` as well.

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/reactappScreenshot.png" width=80% height=80%>

# Backend

## pythonapp

[Link to folder](pythonapp)

The pythonapp folder includes an algorithm in app/main.py, served using uvicorn. There are three scripts for running the python; one running directly, the second building a docker container, and the third builds and deploys a docker container in Google Cloud Platform (using Cloud Build and Cloud Run).

A deployed version of the game can be found at https://python-project-service-2ldm6ft3ha-uc.a.run.app/game

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/pythonappScreenshot.png" width=90% height=90%>

## nodeapp

[Link to folder](nodeapp)

There is a node app which can be run directly, and uses fetch to call the python-backed API.  Results are printed to the console.

The app queries for start and end countries and prints a path

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/nodejsappScreenshot.png" width=50% height=50%>

## mongoapp

[Link to folder](mongoapp)

A nodejs app which connects to a specified mongodb (mongo database) to perform some CRUD (create read update delete) operations.  The mongo database requires a database called crudExample. Create a .env.local file in the monfoapp folder (your env file will be gitignored) and follow the pattern of .env.sample, to point the code at your mongoDB location.

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/mongoappScreenshot.png" width=50% height=50%>

# Full stack

## nextjsapp

[Link to folder](nextjsapp)

Use the nextjs framework to write client-side HTML and server-side fetch calls to build a working web app that uses the python API call on the back end.  The nextjs app will work with our python API endpoint even if the python API prohibits cross-origin requests, because the call to the python API is from our back-end server and not directly from the browser.

A deployed version of the app can be found at https://nextjs-project-service-qzwnizxtoa-uc.a.run.app/

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/nextjsScreenshot.png" width=50% height=50%>

## nextauthapp

[Link to folder](nextauthapp)

Use the nextjs framework with Google Firebase Authentication to write an app with customer login, logout and a page which can only be accessed by a customer who has logged in.

This app has a configuration setting which is used to tell Google Firebase a 'continuation URL'.  After someone has verified their email, this defines where the web page goes to to continue.  That is, where is the site hosted?  For local running, this is managed using a NEXT_PUBLIC_ environment variable set in .env. For docker (including Google Cloud Run), it's managed by setting an environment variable in the Dockerfile.  Note that this setting is not a secret and must be known to the client code.

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/nextauthappScreenshot.png" width=90% height=90%>

A deployed version of the app can be found at 
https://nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app/

# More steps

 - Use typescript instead of javascript
 - Styling using bootstrap
 - handling of secrets
 - nextjs routing, server-side work, middleware



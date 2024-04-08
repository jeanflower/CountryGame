This repo is about delivering a python-backed compute result through a javascript web app.  The solutions are intended to provide bite-sized steps along the way to a full-stack web app.

The running example is an app that gets specified start and end countries from a user and reports back a shortest path passing through neighbouring countries.  The idea is that the logic for this path-finding is best set out in back-end server-side python code, perhaps using a database, while the best customer-facing front-end experience is presented using javascript frameworks.

# Front end 

## jswebapp

[Link to folder](jswebapp)

This includes an HTML file for our game with input fields to fill in and a button to click.  

When the button is clicked, a response is computed by calling an API.

About CORS : The server in our example provides a response only because it has been configured to allow CORS (cross-origin requests).  For security, browsers check with an API whether a call is permitted before making an actual request.  Our API endpoint is allowing calls from any client (cross-origin).  More usually, an API doesn't allow cross-origin, so we'd need to offer up our HTML from an origin which also provides an API (same-origin).  In the back-end, a same-origin API can then make a further call to a different address for the ultimate data-providing API.  Read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://ffddc03fb35d1a0ef5560a519deba7a51189fb389eefd3a4dadd7c2-apidata.googleusercontent.com/download/storage/v1/b/demo-static-site/o/jswebapp%2Findex.html?jk=AWNiL9JZgTDzEn477vpJQHNWua_uQpVpwZtXAOCvIV610Lspnwh7-zvU305Fi_a3aPN_oIIoulTY6JPazQ0zmDDekkmnsK9tHuarXWIIVrb9MOEFIvZSeqzaBKtEXB01ScZryxVdYkPwONZEdQpLcEagtP-b7e1UlTt0IOLmDsuiO2rKSxCwO3snXNyEncjC-feDICriNKYMnLiNhtpZN4_GA0T4ipMyhsF6D1t_Z_SQV49cDlxeQ-JyA5VVEt5YupQT3MGwrWAFXU47PqADMj7mjEFz-Q9HMsNKC-lK0VEsxNwGynWWR5iK_T0UmjdYLm5JqaXGzZO6LsOF-h0-gB5_wREvo7FrwUgn05lx52Dv_fUgqUyPS68zW_Cj3HAMEi8gVCquZZ6te48zjFXXme3iRkiUtQ79FhxF099vEVIAMK44vddh35DBFHD-KsB91rQ1rH5-aM8dubfHwBzmluZFWqw564fzYPQ0SJtjSLhdXQ1zCUNRWQsmBF_2tqRlumcYZ5kZP-EahtP8aNtcjaU2HsAm2NUlegepTp4Nat_fNLjaeLh71Aj2jP6fqcAc2W7UmIHgYnpwxx4OhuKFuw60LwL0qa84UCM8xhnE7AB8IlxMqLOFcPTvxtx3BEGWnFExWVnwoGpL8eKRw-a9Imm2sFJz3D5VOOi5djod09mj6pb-9i8sArJyyqMzl_VWWXrrBE53tzRx9SeDFD-UIaWqqfj9KthTxRk6ILa8BGoH0seOxSL44VJVXTRyLnnf0qwJqEbleDCiBWGKcqE3yc7OEZA_-NsE3NuYSjpS4DkFzgVBS0WRh-a3LNyToS1fScw929SVp5tKXc9ovmmK8kMpsGADjLKYr7VD5eOIrNdj75qYgEiURhXkAI0yOGHcGxpvDRMxGlrytsSvByg_KEy_KcBFGZNTQl8WaUyfZJkYO8u6TPIy1cNSLT-J22eTDzm9ksNsJBT5nl2QzlptfQJcSCa7wIkDhWw_itNZfxkUAIlas7xf_SDP5eRctjFSW8PkoGyTrIxEDbZ9pUJd_a2j5qTmX11h7C6WgKNZ6Qo9cZWiYg03kNOlWhdf-5PjaDGVFmmLeXDM6cmt9iHZ-J7YZSAUZZimWW4Yoa7nj7Je_0HgQIyUmqulk32dXdiP7nlJFY7gcWWT3oUApkUWhFOxleP9GvpUl_Wqs7s4I5yEhsreuHbU-w&isca=1)

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/jswebScreenshot.png" width=90% height=90%>

## stylingcssapp

[Link to folder](stylingcssapp)

A demo of various css styling controls.  Refer to https://www.w3schools.com/css/ for more.  To run, load index.html into a browser and explore making changes to mystyles.css.


<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/stylingcssScreenshot.png" width=50% height=50%>

## reactapp

[Link to folder](reactapp)

React is a javascript front-end library created by Facebook.  React apps are built out of react components, and use JSX syntax, a kind of hybrid between HTML and js. They are designed to be .. reactive.  Have a look at ```npm test``` as well.

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/reactappScreenshot.png" width=30% height=30%>

# Backend

## pythonapp

[Link to folder](pythonapp)

The pythonapp folder includes an algorithm in app/main.py, served using uvicorn. There are three scripts for running the python; one running directly, the second building a docker container, and the third builds and deploys a docker container in Google Cloud Platform (using Cloud Build and Cloud Run).

A deployed version of the game can be found at https://python-project-service-2ldm6ft3ha-uc.a.run.app/game

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/pythonappScreenshot.png" width=50% height=50%>

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

Use the nextjs framework to writes client-side HTML and server-side fetch calls to build a working web app that uses the python API call on the back end.  A deployed version of the app can be found at https://nextjs-project-service-qzwnizxtoa-uc.a.run.app/

<img src="https://github.com/jeanflower/Full-stack-demos-country-game/blob/main/nextjsScreenshot.png" width=50% height=50%>

# More steps

 - Use typescript instead of javascript
 - Styling using bootstrap
 - nextjs routing, server-side work, middleware


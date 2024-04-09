This includes an HTML file for our game with input fields to fill in and a button to click.  

When the button is clicked, a response is computed by calling an API.

About CORS : The server in our example provides a response only because it has been configured to allow CORS (cross-origin requests).  For security, browsers check with an API whether a call is permitted before making an actual request.  Our API endpoint is allowing calls from any client (cross-origin).  More usually, an API doesn't allow cross-origin, so we'd need to offer up our HTML from an origin which also provides an API (same-origin).  In the back-end, a same-origin API can then make a further call to a different address for the ultimate data-providing API.  Read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://storage.googleapis.com/static-website-bucket2/jswebapp/index.html)

This image shows the page in a browser. The browser's Network panel shows some details about the call to the API when the Get Path button is clicked.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/jswebScreenshot.png" width=90% height=90%>
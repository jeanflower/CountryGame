This includes an HTML file for our game with input fields to fill in and a button to click.  To learn more about HTML, visit [here](https://developer.mozilla.org/en-US/docs/Web/HTML).

When the button is clicked, a response is computed by calling an API.  The browser sends a start and end pair to an API endpoint and gets a reply back with the path.

This way of building a webapp implementation is extremely simple.  We write browser code and use an API call to get some information to display. 

But anyone visiting the web page can view the source and see how the page works. This approach in building websites is impractical in many circumstances, for reasons described in the next three paragraphs. 

When the game Wordle first became a viral hit, it was possible to view the page's javascript in a browser and immediately learn the target word.  It was easy to grab the javascript code and clone the site, monetising a copy of the site. Also, "cheat" sites popped up which, each day, automated a reveal of the target word.  A later update of Wordle was released which held the target word in server-side logic.  The updated client code simply passed a player's guesses to the server and displayed a response to each guess.  Although people could inspect the client-side code, the code on the server is hidden from view.  Anyone writing a "cheat" site would have to actually play Wordle each day to find out the target word before publicising it.  More complex games and apps prefer to put their game logic on the server to preserve their IP.

Frequently a web page needs database access. A call to get data from a database is accompanied by credentials. Using a complet client-side implementation, anyone looking closely at the browser source code would be able to see the location of the database and the credentials that are passed to gain access.  This is a clear security risk.  The same principle applies to any API that needs to impose access control through secrets and passwords.  A full-stack architecture calls such APIs from the back-end, not directly from the client code.

About CORS : The server in our example provides a response only because it has been configured to allow CORS (cross-origin requests).  For security, browsers check with an API whether a call is permitted before making an actual request.  Our API endpoint is allowing calls from any client (cross-origin).  More usually, an API doesn't allow cross-origin, so we'd need to offer up our HTML from an origin which also provides an API (same-origin).  In the back-end, a same-origin API can then make a further call to a different address for the ultimate data-providing API.  Read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

You can run the page by loading the HTML file into a browser, or you can visit a statically-hosted version of the file [here](https://storage.googleapis.com/static-website-bucket2/jswebapp/index.html)

This image shows the page in a browser. The browser's Network panel shows some details about the call to the API when the Get Path button is clicked.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/jswebScreenshot.png" width=90% height=90%>

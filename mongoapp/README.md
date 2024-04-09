This javascript code works with data in a cloud mongoDB database.  We can see in [package.json](package.json) that we have included a dependency on the [mongodb](https://www.npmjs.com/package/mongodb) library.

The access credentials for the database are stored in an environment variable.  First add a .env.local file and set the value of MONGODB_URI (see [.env.sample](.env.sample)).  Then run [startRunMongoApp.sh](startRunMongoApp.sh).

This image shows the mongo app running in a local terminal and a web view of the mongo content.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/mongoappScreenshot.png" width=80% height=80%>

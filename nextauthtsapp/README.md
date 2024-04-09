This is a Typescript version of the nextauthapp.

File extensions change.  Notice that in place of, for example, layout.js, we now have layout.tsx. Variables are assigned types (or their types are inferred) and during development, type-checks are in place to avoid coding errors.  Type-safety is especially valuable for large and complex projects when change is underway.

Type safety brings extra benefits in nextjs apps because the tools ensure consistent types pass through our APIs as the client calls into server-side code, or as data passes from a database into the rest of our back-end code.  Read more [here](https://nextjs.org/docs/app/building-your-application/configuring/typescript).

This image shows a diff between the plain javascript version of the home page and a typescript version.

<img src="https://github.com/jeanflower/full-stack-demos/blob/main/nextauthtsappScreenshot.png" width=90% height=90%>

# Use Node.js as the base image
FROM node:18.17.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD_5bAbzWXuRPkLIHHXjxn86nkf4SSO1fg
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fir-firebase-f425c.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=fir-firebase-f425c
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fir-firebase-f425c.appspot.com
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=230834076064
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:230834076064:web:97922c60710086e01f8cc5
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-N3GKRX22L5

ENV NEXT_PUBLIC_SIGNIN_URL=https://nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app/
#ENV NEXT_PUBLIC_SIGNIN_URL=http://localhost:8123

# Build the Next app
RUN npm run build

# Serve the production build
CMD ["npm", "start"]

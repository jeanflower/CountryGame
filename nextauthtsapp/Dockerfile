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

ENV NEXT_PUBLIC_SIGNIN_URL=https://nextjs-auth-project-service-qzwnizxtoa-uc.a.run.app/
#ENV NEXT_PUBLIC_SIGNIN_URL=http://localhost:8123

# Build the Next app
RUN npm run build

# Serve the production build
CMD ["npm", "start"]

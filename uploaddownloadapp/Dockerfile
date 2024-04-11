# Use Node.js as the base image
FROM node:21-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

ENV NEXT_PUBLIC_BASEURL=https://nextjs-uploaddownload-service-qzwnizxtoa-uc.a.run.app/
#ENV NEXT_PUBLIC_BASEURL=http://localhost:8123

# Build the Next app
RUN npm run build

# Serve the production build
CMD ["npm", "start"]

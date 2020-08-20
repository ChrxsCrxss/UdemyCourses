# Specify base image
# an 'alpine' version of an image is a minimized image
# it's basically the bare essentials 
FROM node:alpine 

# specify working directory
WORKDIR ./usr/app

# Copy the package.json first so we can specify and download dependencies 
COPY ./package.json ./

# Install dependencies 
RUN npm install 

# Copy everything into the current directory (the index.js
# and package.json) into the image
COPY ./ ./

# Defualt command
CMD ["npm", "start"]
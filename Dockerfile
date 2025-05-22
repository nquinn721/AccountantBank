# Base image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm install
    
# Bundle app source
RUN npm run build
# RUN npm run setup:client

# Creates a "dist" folder with the production build


ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080
 
# Start the server using the production build
CMD [ "node", "dist/main.js" ]

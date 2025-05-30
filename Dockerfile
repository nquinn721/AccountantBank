# Base image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./


# Install app dependencies
RUN npm install
COPY . .
# Bundle app source
RUN npm run setup:clientnew
RUN npm run build

# Creates a "dist" folder with the production build


ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080
 
# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
    
# Bundle app source
COPY . .

EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "start" ]

# Use an official Node runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /web

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

RUN npm install -g nodemon

# Copy the local files to the container
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
# CMD ["nodemon", "server/server.js"]
CMD ["npm", "run", "start-dev"]

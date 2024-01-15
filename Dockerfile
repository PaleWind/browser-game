# Use an official Node runtime as the base image
FROM node:20

# Copy package.json and package-lock.json
# COPY package*.json ./
RUN git clone --bare https://github.com/PaleWind/browser-game app

# Set the working directory in the container
WORKDIR /app/branches
RUN git worktree add main && cd main && git pull
WORKDIR /app/branches/main

# Install any dependencies
RUN npm install

RUN npm install -g nodemon

# Copy the local files to the container
# COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
# CMD ["nodemon", "server/server.js"]
# CMD ["npm", "run", "dev"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
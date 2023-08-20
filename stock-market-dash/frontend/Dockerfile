# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app/frontend

# Copy package.json and package-lock.json to the container
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY frontend/ .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]


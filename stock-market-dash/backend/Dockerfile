# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json to the container
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY backend/ .

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]

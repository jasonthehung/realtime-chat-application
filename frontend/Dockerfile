## Vite project

# Use the official Node.js image as a base image
FROM node:23-alpine
# Set the working directory inside the container
WORKDIR /usr/src/app-frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the application dependencies
RUN npm install
# Copy the rest of the application files
COPY . .
# Build the Vite application
RUN npm run build
# Expose the application port
EXPOSE 5173
# Command to run the application
CMD ["npm", "run", "preview"]

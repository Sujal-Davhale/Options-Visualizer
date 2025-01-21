FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the entire frontend directory into the container
COPY frontend ./

# Expose the port the app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]

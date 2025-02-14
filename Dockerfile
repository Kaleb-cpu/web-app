# Parent image
FROM node:20-alpine

# The working directory in the container
WORKDIR /web-app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "src/app.js"]

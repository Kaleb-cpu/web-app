# Use a Debian-based Node image so we can install mongosh
FROM node:20-bullseye

# Install mongosh (MongoDB Shell)
RUN apt-get update && apt-get install -y wget gnupg curl \
 && curl -fsSL https://pgp.mongodb.com/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-6.0.gpg \
 && echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" > /etc/apt/sources.list.d/mongodb-org-6.0.list \
 && apt-get update && apt-get install -y mongodb-mongosh \
 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /web-app

# Copy dependencies and install them
COPY package*.json ./
RUN npm install

# Copy rest of the project files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "src/app.js"]

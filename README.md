# Web App

A simple web application built with Node.js and Express, using MongoDB as the database. It allows users to add students to the database via CLI or a GUI built with simple HTML and CSS.

## Dependencies

The application requires the following dependencies:
- [Express](https://www.npmjs.com/package/express) (`^4.21.2`) - Web framework for Node.js
- [Mongoose](https://www.npmjs.com/package/mongoose) (`^8.10.0`) - MongoDB object modeling tool
- [Cors](https://www.npmjs.com/package/cors) (`^2.8.5`) - Middleware for enabling CORS requests
- [Dotenv](https://www.npmjs.com/package/dotenv) (`^16.4.7`) - Environment variable management

## Features
- Add students to the database via CLI or GUI.
- Frontend built with HTML and CSS.
- Backend powered by Node.js and Express.
- Uses MongoDB for data storage.
- Environment variables managed with dotenv.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Kaleb-cpu/web-app.git
   cd web-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     ```sh
     MONGO_URI=your_mongodb_connection_string
     ```

4. Start the application:
   ```sh
   node src/app.js
   ```

## Usage
- Access the web interface through `http://localhost:3000`
- Use CLI commands to add students to the database


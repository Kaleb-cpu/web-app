const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const dbconnect = require('./config/dbconnect');
const studentRoutes = require('./routes/student');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

dbconnect();

// Public route for login
app.use('/api/auth', authRoutes);

// Protected route for students
const verifyToken = require('./middleware/verifyToken');

// We can use the logic below once we implement login for the frontend
// Right now we will just use the app unprotected
// app.use('/api/student', verifyToken, studentRoutes); 
app.use('/api/student', studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const dbconnect = require('./config/dbconnect')
const studentRoutes = require('./routes/student')

app.use(cors());

app.use(express.json());

dbconnect()

app.use('/student', studentRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
    
})

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT; 
const MONGO_URL= process.env.MONGO_URL;

const router = require('../Router/router');
app.use('/api', router);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('You are connected to the database');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});



  
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server is not connected on port ${PORT}`);
    } else {
        console.log(`Server is connected on port ${PORT}`);
    }
});
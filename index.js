const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./models/movies.models');
const { PORT } = require('./configs/server.config');
const { DB_URL } = require('./configs/db.config');

//IIFE
(async ()=> {
    try{    
        await mongoose.connect(DB_URL);
        console.log('db connected');
    }
    catch(err){
        console.error('error getting while connecting mongoDB', err);
    }

})()

app.listen(PORT, ()=> {
    console.log(`server is running on port: ${PORT}, please access it on http://localhost:${PORT}`)
})
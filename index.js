const express = require('express');

const app = express();

console.log(process.env.NODE_ENV);
// require('./configs/server.config');

app.listen(4000, ()=> {
    console.log(`server is running on port: 4000, please access it on http://localhost:4000`)
})
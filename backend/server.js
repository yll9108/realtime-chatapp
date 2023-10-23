const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;
//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})
//routes
app.get('/', (req, res) =>{
    res.json({msg : 'Welcome to real-time chat app'});
})
//listen for requests
app.listen(port, () =>{
    console.log(`listening on port : ${port}`);
})

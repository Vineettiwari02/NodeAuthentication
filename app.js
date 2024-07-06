const express = require('express');
const app = express();
const cors = require("cors");
 const db = require('./config/db.js');
const user = require('./router/userRouter.js');
const env = require('dotenv').config();
const port = process.env.PORT;
const hostname = process.env.HOSTNAMES;
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use('/user',user);
app.listen(port,  console.log(`server is running on port ${port}`))
const mysql = require('mysql');
const env = require('dotenv').config();
const db = mysql.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD
})
db.connect((err)=>{
    if(err) throw err
    console.log('database connected sucessfully')
})
module.exports= db;

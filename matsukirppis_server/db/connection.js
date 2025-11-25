/* eslint-disable indent */
const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    port:process.env.PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    connectionLimit: 5,
    dateStrings: true
});

const connectToDatabase= async ()=> {
    try{
        await connection.getConnection()
        console.log("MySQL connection works!")

    }catch(e){
        console.log("Database error".e)
        // throw e;
    }
}


module.exports =  {connectToDatabase,connection};

/* eslint-disable indent */
const { connection } = require('../db/connection');
const bcrypt = require('bcrypt');

const userLogin = async (username, password) => {
    const QUERY = "SELECT * FROM Users WHERE username = ? AND password = ?"
    try {
        const client = await connection.getConnection()
        const result = await client.query(QUERY, [username,password])
        return result;
    } catch (e) {
        console.log("error occured in addproduct", e)
        throw e;
    }

}

const addUser = async (username, email, phonenumber, password) => {
    const QUERY = "INSERT INTO Users (username, email, phonenumber, password) VALUES (?,?,?,?) "
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const client = await connection.getConnection()
        const result = await client.query(QUERY, [username, email, phonenumber, hashedPassword])
        return result;
    } catch (e) {
        console.log("error occured in addUser", e)
        throw e;
    }

}

module.exports = { userLogin,addUser};

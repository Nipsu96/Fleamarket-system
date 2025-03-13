/* eslint-disable indent */
const { userLogin, addUser } = require('../models/user');


const loginUser = async (req, res) => {
    try {
    const {username,password} = req.body
    if (!username || !password ) {
        return res.json({ message: "Input parameters were not provided" })
    }else{
        const results = await userLogin(username, password);
        if (results) {
            console.log("Login success!",results[0]);
            return results[0];
        }
    }} catch (e) {
        console.log("Error controllers",e)
    }

};

const registerUser = async (req, res) => {
    try {
        try {
            const { username, email, phonenumber,password } = req.body
            if (!username || !email || !phonenumber || !password ) {
                return res.json({ message: "Input parameters were not provided" })
            } else {
                const results = await addUser(username, email, phonenumber, password);
                if (results) {
                    console.log("Käyttäjä lisätty");
                }
            }
        } catch (e) {
            console.log("Error controllers", e)
        }
    } catch (e) {
        console.log("Error controllers", e)
    }

};



module.exports = {
    loginUser,
    registerUser

};

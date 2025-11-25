/* eslint-disable indent */
const { addUser, findUser } = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, response) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return response.json({ message: "Input parameters were not provided" })
        } else {
            const results = await findUser(username);
            if (results) {
                console.log("Login success!");
                const user = results[0][0]
                bcrypt.compare(req.body.password, user.password, function (err, res) {
                    if (err) {
                        // handle error
                        console.log("Error in comparin passwords",err)
                    }
                    if (response) {
                        // Send JWT
                        console.log("Yippee",user.user_id)
                        let userToken;
                        const userTokenObject = {
                            username: user.username,
                            password: user.password,
                            user_id:user.user_id,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90)
                        };
                        try {
                            userToken = jwt.sign(userTokenObject, process.env.JWT_SECRET_KEY);
                        } catch (err) {
                            return next({ type: "LoginInternalError", message: "Error signing token during login." });
                        }
                        return response.json({
                            userToken
                        }).end();
                    } else {
                        // response is OutgoingMessage object that server response http request
                        return response.json({ success: false, message: 'passwords do not match' });
                    }
                });
                return;
            }
        }
    } catch (e) {
        console.log("Error controllers", e)
    }

};

const registerUser = async (req, res) => {
    try {
        try {
            const { username, email, phonenumber, password } = req.body
            if (!username || !email || !phonenumber || !password) {
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

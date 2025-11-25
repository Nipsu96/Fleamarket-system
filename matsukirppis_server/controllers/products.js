/* eslint-disable indent */
const { findAll, addProductToDB } = require('../models/products.js');
const jwt = require('jsonwebtoken');


const getProducts = async (req, res) => {
    try {
        const results = await findAll();
        if (results) {
            res.json(results);
        }
    } catch (e) {
        res.sendStatus(500);
        console.log(e)
    }

};
const addProducts = async (req, response) => {
    try {
        const { product_name, product_price, is_k18, user_id, category_id } = req.body
        if (!product_name || !product_price || is_k18 == null || !user_id || !category_id) {
            return response.json({ message: "Input parameters were not provided" })
        } else {
            const userToken = jwt.decode(req.headers.authorization.split(" ")[1]);
            const results = await addProductToDB(product_name, product_price, is_k18, userToken.user_id, category_id);
            if (results) {
                console.log("Tuote lisätty");
                let productID = results[0].insertId
                return response.json({
                    productID
                        }).end();

            }
        }
    } catch (e) {
        console.log("Error controllers", e)
    }

};



module.exports = {
    getProducts,
    addProducts

};

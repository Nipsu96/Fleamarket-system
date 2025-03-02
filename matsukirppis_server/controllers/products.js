/* eslint-disable indent */
const { findAll, addProductToDB } = require('../models/products');


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
const addProducts = async (req, res) => {
    try {
    const { product_name, product_price, is_k18, user_id, category_id } = req.body
    if (!product_name || !product_price || !is_k18 || !user_id || !category_id) {
        return res.json({ message: "Input parameters were not provided" })
    }else{
        const results = await addProductToDB(product_name, product_price, is_k18, user_id, category_id);
        if (results) {
            console.log("Tuote lisätty");
        }
    }} catch (e) {
        console.log("Error controllers",e)
    }

};



module.exports = {
    getProducts,
    addProducts

};

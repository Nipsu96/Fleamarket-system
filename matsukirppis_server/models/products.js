/* eslint-disable indent */
const { connection } = require('../db/connection');



const findAll = async () => {
    const QUERY = "SELECT * FROM products"
    try {
        const client = await connection.getConnection()
        const result = await client.query(QUERY)
        return result;
    } catch (e) {
        console.log("error occured in findAll", e)
        throw e;
    }
}
const addProductToDB = async (product_name, product_price, is_k18, user_id, category_id) => {
    const QUERY = "INSERT INTO products (product_name,product_price,is_k18,user_id,category_id,status) VALUES (?,?,?,?,?,0) "
    try {
        const client = await connection.getConnection()
        const result = await client.query(QUERY, [product_name, product_price, is_k18, user_id, category_id])
        return result;
    } catch (e) {
        console.log("error occured in addproduct", e)
        throw e;
    }
}

module.exports = { findAll, addProductToDB };

const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const data = await Product.getProducts();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const getHighlightedProducts = async (req, res) => {
    try {
        const data = await Product.getHighlightedProducts();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const getProductCategories = async (req, res) => {
    try {
        const categories = await Product.getProductCategories();
        return res.status(200).send(categories);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

module.exports = { getProducts, getHighlightedProducts, getProductCategories };

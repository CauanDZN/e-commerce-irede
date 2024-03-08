const Sale = require('../models/saleModel');
const Order = require('../models/orderModel');

const createSale = async (req, res) => {
    const { items } = req.body;

    try {
        const saleId = await Order.createSale(items);
        return res.status(201).json({ saleId });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao tentar criar venda' });
    }
};

module.exports = { createSale };

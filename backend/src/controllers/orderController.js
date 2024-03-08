const Sale = require('../models/saleModel');
const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    const { items } = req.body;
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
        return res.status(401).json({ message: "Token não encontrado" });
    }

    const split = tokenWithBearer.split(' ');
    const token = split[1];

    try {
        const saleId = await Sale.createSale(items, token);
        return res.status(201).json({ saleId });
    } catch (err) {
        console.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Token inválido" });
        }
        res.sendStatus(500);
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.getOrders();
        return res.status(200).json(orders);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = { createOrder, getOrders };

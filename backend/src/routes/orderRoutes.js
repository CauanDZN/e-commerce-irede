const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const orders = await pool.query(`
            SELECT v.id AS venda_id, v.data AS venda_data, p.id AS produto_id, p.nome AS produto_nome, 
            p.categoria AS produto_categoria, p.preco AS produto_preco, p.imagem AS produto_imagem, 
            i.quantidade AS quantidade, i.preco AS preco_total, v.status AS status_venda
            FROM vendas v
            JOIN itens i ON v.id = i.id_venda
            JOIN produtos p ON i.id_produto = p.id
        `);
        const formattedOrders = formatOrders(orders.rows);
        res.status(200).send(formattedOrders);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

function formatOrders(orders) {
    const formattedOrders = {};
    orders.forEach(order => {
        if (!formattedOrders[order.venda_id]) {
            formattedOrders[order.venda_id] = {
                id: order.venda_id,
                date: order.venda_data,
                products: []
            };
        }
        formattedOrders[order.venda_id].products.push({
            id: order.produto_id,
            name: order.produto_nome,
            category: order.produto_categoria,
            price: order.produto_preco,
            image: order.produto_imagem,
            quantity: order.quantidade,
            totalPrice: order.preco_total,
            status: order.status_venda
        });
    });
    return Object.values(formattedOrders);
}

module.exports = router;

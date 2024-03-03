const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { data, items } = req.body;

    try {
        const userId = items.id_usuario;
        const saleId = await createSale(data);
        await updateProductsAndInsertItems(items, saleId, userId);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const createSale = async (data) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const newSale = await client.query('INSERT INTO vendas (data) VALUES ($1) RETURNING id', [data]);
        await client.query('COMMIT');
        return newSale.rows[0].id;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateProductsAndInsertItems = async (items, saleId, userId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await Promise.all(items.map(async (item) => {
            await updateProductQuantity(client, item.id_produto, item.quantidade);
            await insertItem(client, userId, item.id_produto, item.quantidade, item.preco, saleId);
        }));
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateProductQuantity = async (client, productId, quantity) => {
    await client.query('UPDATE produtos SET quantidade = quantidade - $1 WHERE id = $2', [quantity, productId]);
};

const insertItem = async (client, userId, productId, quantity, price, saleId) => { 
    await client.query('INSERT INTO itens (id_usuario, id_produto, quantidade, preco, id_venda) VALUES ($1, $2, $3, $4, $5)', [userId, productId, quantity, price, saleId]);
};

module.exports = router;

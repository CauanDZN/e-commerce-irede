const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { data } = req.body;
    try {
        await pool.query('INSERT INTO vendas (data) VALUES ($1)', [data]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/:idSale/items', async (req, res) => {
    const { id_produto, quantidade, preco } = req.body;
    const { idSale } = req.params;
    try {
        await pool.query('INSERT INTO itens (id_produto, quantidade, preco, id_venda) VALUES ($1, $2, $3, $4)', [id_produto, quantidade, preco, idSale]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { items } = req.body;
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
        return res.status(401).json({"message": "Token não encontrado"});
    }

    const split = tokenWithBearer.split(' ');
    const token = split[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const saleId = await createSale(items, decoded);
        return res.status(201).json({ saleId });
    } catch (err) {
        console.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({"message": "Token inválido"});
        }
        res.sendStatus(500);
    }
});

const createSale = async (items, decoded) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const newSale = await client.query('INSERT INTO vendas DEFAULT VALUES RETURNING id');
        const idSale = newSale.rows[0].id;

        for (const item of items) {
            const product = await getProduct(client, item.id_produto);
            if (!product) {
                throw new Error(`Produto com ID ${item.id_produto} não encontrado`);
            }
            if (product.quantidade < item.quantidade) {
                throw new Error(`Quantidade insuficiente em estoque para o produto com ID ${item.id_produto}`);
            }
            await updateProductQuantity(client, item.quantidade, item.id_produto);
            await insertItem(client, decoded.id, item.id_produto, item.quantidade, item.preco, idSale);
        }
        await client.query('COMMIT');
        return idSale;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getProduct = async (client, id_produto) => {
    const result = await client.query('SELECT * FROM produtos WHERE id = $1', [id_produto]);
    return result.rows[0];
};

const updateProductQuantity = async (client, quantidade, id_produto) => {
    await client.query('UPDATE produtos SET quantidade = quantidade - $1 WHERE id = $2', [quantidade, id_produto]);
};

const insertItem = async (client, id_usuario, id_produto, quantidade, preco, id_venda) => { 
    const precoTotal = quantidade * preco;
    await client.query('INSERT INTO itens (id_usuario, id_produto, id_venda, quantidade, preco) VALUES ($1, $2, $3, $4, $5)', [id_usuario, id_produto, id_venda, quantidade, precoTotal]);
};

module.exports = router;

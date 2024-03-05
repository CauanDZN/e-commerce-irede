const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { items } = req.body;

    try {
        const date = new Date();
        const saleId = await createSale(date);
        await updateProductsAndInsertItems(items, saleId);
        res.status(201).send({ saleId });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const createSale = async (date) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const newSale = await client.query('INSERT INTO vendas (data, status) VALUES ($1, $2) RETURNING id', [date, 'Em andamento']);
        await client.query('COMMIT');
        return newSale.rows[0].id;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateProductsAndInsertItems = async (items, saleId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (const item of items) {
            const product = await getProduct(client, item.id_produto);
            if (!product) {
                throw new Error(`Produto com ID ${item.id_produto} não encontrado`);
            }
            if (product.quantidade < item.quantidade) {
                throw new Error(`Quantidade insuficiente em estoque para o produto com ID ${item.id_produto}`);
            }
            await updateProductQuantity(client, item.quantidade, item.id_produto);
            await insertItem(client, item.id_usuario, item.id_produto, item.quantidade, item.preco, saleId);
        }
        await client.query('COMMIT');
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

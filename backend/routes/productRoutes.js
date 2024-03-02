const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM produtos');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM categorias');
        res.status(200).send(categories.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;

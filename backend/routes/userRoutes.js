const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
        if (user.rows.length > 0) {
            res.json(user.rows[0]);
        } else {
            res.status(401).send('Email ou senha incorretos');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;

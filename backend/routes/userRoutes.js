const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

const gerarHash = async (senha) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
};

router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const hashSenha = await gerarHash(senha);
        
        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, hashSenha]);
        
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;

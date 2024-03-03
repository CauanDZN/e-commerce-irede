const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query('SELECT id, nome, email, avatar, senha_hash FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);

            if (senhaCorreta) {
                delete user.senha_hash;
                res.status(200).json({ message: 'Login bem-sucedido', user });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao tentar fazer login' });
    }
});

module.exports = router;

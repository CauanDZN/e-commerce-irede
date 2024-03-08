const pool = require('../databases/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../services/validationService');

const createUser = async (nome, email, senha) => {
    try {
        const hashSenha = await hashPassword(senha);
        const result = await pool.query('INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email, avatar', [nome, email, hashSenha]);
        const user = result.rows[0];
        delete user.senha_hash;
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { message: 'Usuário criado com sucesso', token };
    } catch (err) {
        throw err;
    }
};

const login = async (email, senha) => {
    try {
        const result = await pool.query('SELECT id, nome, email, avatar, senha_hash FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);

            if (senhaCorreta) {
                delete user.senha_hash;
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
                return { message: 'Login bem-sucedido', token };
            } else {
                throw new Error('Credenciais inválidas');
            }
        } else {
            throw new Error('Credenciais inválidas');
        }
    } catch (err) {
        throw err;
    }
};

module.exports = { createUser, login };

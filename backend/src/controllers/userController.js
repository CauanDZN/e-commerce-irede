const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../services/validationService');

const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const newUser = await User.createUser(nome, email, senha);
        return res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json();
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await User.login(email, senha);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao tentar fazer login' });
    }
};

module.exports = { createUser, login };

const bcrypt = require('bcrypt');

const hashPassword = async (senha) => {
    const saltRounds = 8;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateProduct = (product) => {
    if (!product.nome || !product.preco || !product.quantidade || !product.categoria) {
        return false;
    }
    return true;
};

const validateSale = (sale) => {
    if (!sale.items || sale.items.length === 0) {
        return false;
    }
    return true;
};

const validateUser = (user) => {
    if (!user.nome || !user.email || !user.senha) {
        return false;
    }
    return true;
};

module.exports = { hashPassword, validateEmail, validateProduct, validateSale, validateUser };

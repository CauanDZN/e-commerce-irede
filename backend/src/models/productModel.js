const pool = require('../databases/db');

const getProducts = async () => {
    try {
        const data = await pool.query('SELECT p.*, c.nome AS categoria_nome FROM produtos p INNER JOIN categorias c ON p.categoria = c.id');
        return data.rows;
    } catch (err) {
        throw err;
    }
};

const getHighlightedProducts = async () => {
    try {
        const data = await pool.query('SELECT p.*, c.nome AS categoria_nome FROM produtos p INNER JOIN categorias c ON p.categoria = c.id WHERE p.destaque = true');
        return data.rows;
    } catch (err) {
        throw err;
    }
};

const getProductCategories = async () => {
    try {
        const categories = await pool.query('SELECT * FROM categorias');
        return categories.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = { getProducts, getHighlightedProducts, getProductCategories };

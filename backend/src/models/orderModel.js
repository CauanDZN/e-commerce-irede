const pool = require('../databases/db');

const createSale = async (items) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const newSale = await client.query('INSERT INTO vendas DEFAULT VALUES RETURNING id');
        const saleId = newSale.rows[0].id;

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
        return saleId;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getProduct = async (client, productId) => {
    const result = await client.query('SELECT * FROM produtos WHERE id = $1', [productId]);
    return result.rows[0];
};

const updateProductQuantity = async (client, quantidade, productId) => {
    await client.query('UPDATE produtos SET quantidade = quantidade - $1 WHERE id = $2', [quantidade, productId]);
};

const insertItem = async (client, userId, productId, quantidade, preco, saleId) => { 
    const precoTotal = quantidade * preco;
    await client.query('INSERT INTO itens (id_usuario, id_produto, id_venda, quantidade, preco) VALUES ($1, $2, $3, $4, $5)', [userId, productId, saleId, quantidade, precoTotal]);
};

const getOrders = async () => {
    try {
        const orders = await pool.query(`
            SELECT v.id AS venda_id, v.data AS venda_data, p.id AS produto_id, p.nome AS produto_nome, 
            p.categoria AS produto_categoria, p.preco AS produto_preco, p.imagem AS produto_imagem, 
            i.quantidade AS quantidade, i.preco AS preco_total, v.status AS status_venda
            FROM vendas v
            JOIN itens i ON v.id = i.id_venda
            JOIN produtos p ON i.id_produto = p.id
        `);
        return formatOrders(orders.rows);
    } catch (err) {
        throw err;
    }
};

function formatOrders(orders) {
    const formattedOrders = {};
    orders.forEach(order => {
        if (!formattedOrders[order.venda_id]) {
            formattedOrders[order.venda_id] = {
                id: order.venda_id,
                date: order.venda_data,
                products: []
            };
        }
        formattedOrders[order.venda_id].products.push({
            id: order.produto_id,
            name: order.produto_nome,
            category: order.produto_categoria,
            price: order.produto_preco,
            image: order.produto_imagem,
            quantity: order.quantidade,
            totalPrice: order.preco_total,
            status: order.status_venda
        });
    });
    return Object.values(formattedOrders);
}

module.exports = { createSale, getOrders };

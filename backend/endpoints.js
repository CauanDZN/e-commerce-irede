module.exports = function (app) {
    const orderController = require('./controllers/orderController');
    const productController = require('./controllers/productController');
    const saleController = require('./controllers/saleController');
    const userController = require('./controllers/userController');

    app.post('/orders', orderController.createOrder);

    app.get('/products', productController.getProducts);
    app.get('/products/highlighteds', productController.getHighlightedProducts);
    app.get('/products/categories', productController.getProductCategories);

    app.post('/sales', saleController.createSale);

    app.post('/users', userController.createUser);
    app.post('/users/login', userController.login);

    app.post('/orders', (req, res) => {
        const { items } = req.body;
        orderController.createOrder(req, res);
    });

    app.get('/products', (req, res) => {
        productController.getProducts(req, res);
    });

    app.get('/products/highlighteds', productController.getHighlightedProducts);
    app.get('/products/categories', productController.getProductCategories);

    app.post('/sales', (req, res) => {
        const { items, userId } = req.body;
        saleController.createSale(req, res);
    });

    app.post('/users', (req, res) => {
        const { nome, email, senha } = req.body;
        userController.createUser(req, res);
    });

    app.post('/users/login', userController.login);
};

const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const saleRoutes = require('./src/routes/saleRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/sales', saleRoutes);
app.use('/orders', orderRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    console.log(`Servidor inicializado na porta: ${port}`)
    
});

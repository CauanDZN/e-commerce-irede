const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/sales', saleRoutes);

app.listen(port, () => console.log(`Servidor inicializado na porta: ${port}`));

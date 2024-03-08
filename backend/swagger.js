const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API - E-commerce - E-REDE Store",
        description: "API desenvolvida durante a residência em TIC 10."
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" }
                },
                required: ["nome", "email", "senha"]
            },
            UserLogin: {
                type: "object",
                properties: {
                    email: { type: "string" },
                    senha: { type: "string" }
                },
                required: ["email", "senha"]
            },
            SaleItem: {
                type: "object",
                properties: {
                    id_produto: { type: "integer" },
                    quantidade: { type: "integer" },
                    preco: { type: "number" }
                },
                required: ["id_produto", "quantidade", "preco"]
            },
            Sale: {
                type: "object",
                properties: {
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/SaleItem" }
                    }
                },
                required: ["items"]
            },
            Product: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                    preco: { type: "number" },
                    categoria: { type: "string" },
                    destaque: { type: "boolean" }
                },
                required: ["id", "nome", "descricao", "preco", "categoria", "destaque"]
            },
            OrderProduct: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    category: { type: "string" },
                    price: { type: "number" },
                    image: { type: "string" },
                    quantity: { type: "integer" },
                    totalPrice: { type: "number" },
                    status: { type: "string" }
                },
                required: ["id", "name", "category", "price", "image", "quantity", "totalPrice", "status"]
            },
            Order: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    date: { type: "string" },
                    products: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderProduct" }
                    }
                },
                required: ["id", "date", "products"]
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./endpoints.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js');
});
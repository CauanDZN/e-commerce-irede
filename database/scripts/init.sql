-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

-- Tabela de itens
CREATE TABLE IF NOT EXISTS itens (
    id SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id) NOT NULL,
    id_produto INT REFERENCES produtos(id) NOT NULL,
    id_venda INT REFERENCES vendas(id) NOT NULL,
    quantidade INT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    imagem TEXT
);

-- Tabela de vendas
CREATE TABLE IF NOT EXISTS vendas (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL
);

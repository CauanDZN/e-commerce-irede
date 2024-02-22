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
    id_u INT REFERENCES usuarios(id) NOT NULL,
    id_p INT NOT NULL,
    id_v INT REFERENCES vendas(id) NOT NULL,
    qtd INT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    qtd INT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    imagem VARCHAR(255)
);

-- Tabela de vendas
CREATE TABLE IF NOT EXISTS vendas (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL
);

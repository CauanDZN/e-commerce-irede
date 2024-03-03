DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'usuarios') THEN
        CREATE TABLE usuarios (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            senha_hash VARCHAR(100) NOT NULL,
            avatar TEXT
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'categorias') THEN
        CREATE TABLE categorias (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'produtos') THEN
        CREATE TABLE produtos (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            categoria INT REFERENCES categorias(id) NOT NULL,
            quantidade INT NOT NULL,
            preco NUMERIC(10, 2) NOT NULL,
            imagem TEXT
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'vendas') THEN
        CREATE TABLE vendas (
            id SERIAL PRIMARY KEY,
            data DATE NOT NULL
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'itens') THEN
        CREATE TABLE itens (
            id SERIAL PRIMARY KEY,
            id_usuario INT REFERENCES usuarios(id) NOT NULL,
            id_produto INT REFERENCES produtos(id) NOT NULL,
            id_venda INT REFERENCES vendas(id) NOT NULL,
            quantidade INT NOT NULL,
            preco NUMERIC(10, 2) NOT NULL
        );
    END IF;
END $$;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios (nome, email, senha_hash, avatar) VALUES
    ('Cauan', 'cauan@gmail.com', crypt('123456', gen_salt('bf', 8)), 'https://github.com/CauanDZN.png'),
    ('Darlan', 'darlan@gmail.com', crypt('123456', gen_salt('bf', 8)), 'https://github.com/DarlanMendes.png'),
    ('Carlos', 'carlos@gmail.com', crypt('123456', gen_salt('bf', 8)), 'https://media.licdn.com/dms/image/D4D03AQEyKzEOtkP6Yw/profile-displayphoto-shrink_800_800/0/1687389340081?e=1715212800&v=beta&t=5b5MQeexixVprhgqVJLA3bCc2vKi9hmTiYr88BxwbYs');

INSERT INTO categorias (nome) VALUES
    ('Roupas'),
    ('Calçados'),
    ('Acessórios');

INSERT INTO produtos (nome, categoria, quantidade, preco, imagem) VALUES
    ('Camiseta JavaScript', 1, 10, 25.00, 'https://cdn.awsli.com.br/600x450/608/608801/produto/128299601/2f03ec2890.jpg'),
    ('Calça Jogger', 1, 5, 50.00, 'https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/w2steaoe/catalog/produtos-1/calca-moletom/masculino/preta/cm6000-pos01.jpg'),
    ('Tênis Nike', 2, 15, 120.00, 'https://static.kapiva.com.br/public/kapiva/imagens/produtos/tenis-nike-revolution-6-next-nature-preto-branco-3306.png'),
    ('Bermuda Jeans', 1, 8, 70.00, 'https://d3vnyi5j6ba1mc.cloudfront.net/Custom/Content/Products/16/20/1620524_bermuda-jeans-masculina-relax-34601712_l1_638267526375253651.jpg'),
    ('Boné Adidas', 3, 12, 35.00, 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b956a1c41340f9b6dfafc201082ee6_9366/Bone_Baseball_Sarja_Algodao_3-Stripes_Preto_IB3242_01_standard.jpg'),
    ('Blusa de Moletom', 1, 7, 80.00, 'https://www.tocha.com.br/image/cache/data/1-Casual/Masculino/MOLETOM%20PTO-800x800.jpg'),
    ('Sandália Havaianas', 2, 20, 30.00, 'https://d2kh0jmrbw4y83.cloudfront.net/Custom/Content/Products/37/65/37654_sandalias-havaianas-slim-logo-pop-up-prebra-3738-1264842_s2_637683449052254012.jpg'),
    ('Óculos de Sol', 3, 14, 60.00, 'https://cdn.awsli.com.br/600x700/1559/1559198/produto/191006198/d785b20fb8.jpg'),
    ('Smartwatch', 3, 13, 75.00, 'https://cvcacessorios.com.br/wp-content/uploads/2022/05/relogio-m6-2.png'),
    ('Jaqueta de Couro', 1, 7, 150.00, 'https://galleryrock.vtexassets.com/arquivos/ids/163714/jaqueta-de-couro-masculino.jpg'),
    ('Bota Timberland', 2, 0, 180.00, 'https://cdn.awsli.com.br/600x450/2574/2574235/produto/207463592/whatsapp-image-2022-10-27-at-08-45-42-pywuyd.jpg');

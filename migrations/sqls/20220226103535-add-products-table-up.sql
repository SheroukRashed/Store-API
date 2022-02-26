CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories (id) 
);
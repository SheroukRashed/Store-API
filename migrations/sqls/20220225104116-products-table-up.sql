CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price DECIMAL(5,2),
    category_id INTEGER REFERENCES categories (id)
);
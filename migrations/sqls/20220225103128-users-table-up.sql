CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password_digest VARCHAR(150)
);
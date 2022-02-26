CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL
);

INSERT INTO categories(name) SELECT 'cat_1'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name='cat_1'
);

INSERT INTO categories(name) SELECT 'cat_2'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name='cat_2'
);

INSERT INTO categories(name) SELECT 'cat_3'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name='cat_3'
);

INSERT INTO categories(name) SELECT 'cat_4'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name='cat_4'
);

INSERT INTO categories(name) SELECT 'cat_5'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name='cat_5'
);

INSERT INTO categories(name) SELECT 'cat_6'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name='cat_6'
);
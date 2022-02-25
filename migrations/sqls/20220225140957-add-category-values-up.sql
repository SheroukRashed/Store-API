INSERT INTO categories(name) SELECT 'category_1'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='category_1'
);

INSERT INTO categories(name) SELECT 'category_2'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='category_2'
);

INSERT INTO categories(name) SELECT 'category_3'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='category_3'
);

INSERT INTO categories(name) SELECT 'category_4'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='category_4'
);

INSERT INTO categories(name) SELECT 'category_5'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='category_5'
);

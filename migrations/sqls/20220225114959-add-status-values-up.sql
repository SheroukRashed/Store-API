INSERT INTO statuses(name) SELECT 'active'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='active'
);

INSERT INTO statuses(name) SELECT 'complete'
WHERE NOT EXISTS (
    SELECT 1 FROM statuses WHERE name='complete'
);
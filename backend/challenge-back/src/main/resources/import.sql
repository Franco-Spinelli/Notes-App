INSERT INTO categories (title) VALUES ('Work');
INSERT INTO categories (title) VALUES ('Personal');

INSERT INTO notes (title, content, created_at, archived, category_id) VALUES ('Meeting Notes', 'Discuss project updates', '2022-01-01', false, 1);

INSERT INTO notes (title, content, created_at, archived, category_id) VALUES ('Grocery List', 'Milk, eggs, bread', '2022-01-02', false, 2);

INSERT INTO notes (title, content, created_at, archived, category_id) VALUES ('Personal Journal', 'Reflections on the day', '2022-01-03', false, 2);

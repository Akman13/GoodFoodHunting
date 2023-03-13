CREATE DATABASE goodfoodhunting;
\c goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image_url TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);



INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes (title, image_url) VALUES ('pudding', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');



-- INSERT INTO users (email) VALUES ('dt@ga.co');
-- INSERT INTO users (email) VALUES ('dt@generalassemb.ly');

-- ALTER TABLE users ADD password_digest TEXT;

ALTER TABLE dishes ADD COLUMN user_id INTEGER;
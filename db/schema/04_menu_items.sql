CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    description TEXT,
    price SMALLINT,
    category VARCHAR(255),
    image_url VARCHAR(255),
);

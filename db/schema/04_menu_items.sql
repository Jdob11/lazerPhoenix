CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price SMALLINT,
    category VARCHAR(255),
    image_url VARCHAR(255),
    owner_id INTEGER REFERENCES users(id)
);
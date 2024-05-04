DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(14),
    email VARCHAR(255),
    password VARCHAR(255),
    is_owner BOOLEAN DEFAULT false
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    phone VARCHAR(14),
    email VARCHAR(255),
    password VARCHAR(255),
    is_owner BOOLEAN DEFAULT false
);

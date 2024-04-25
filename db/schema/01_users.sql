CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    id INTEGER REFERENCES users_data(id),
    phone VARCHAR(10),
    email VARCHAR(255),
    password VARCHAR(255),
    is_owner BOOLEAN DEFAULT false
);
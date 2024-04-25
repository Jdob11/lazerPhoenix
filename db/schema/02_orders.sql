CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    time_ordered TIMESTAMP,
    total_cost SMALLINT,
    completed_at TIMESTAMP
);

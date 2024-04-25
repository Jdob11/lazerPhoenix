DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE ordered_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    menu_item_id INTEGER REFERENCES menu_items(id),
    quantity SMALLINT
);
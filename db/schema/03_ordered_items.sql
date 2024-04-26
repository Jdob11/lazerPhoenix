CREATE TABLE ordered_items (
    id INTEGER REFERENCES users_data(id),
    user_id INTEGER REFERENCES users(id),
    order_id INTEGER REFERENCES orders(id),
    menu_item_id INTEGER REFERENCES menu_items(id),
    quantity SMALLINT
);
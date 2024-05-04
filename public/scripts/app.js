// Client facing scripts here
const userId = window.location.pathname.split('/').pop();

$('.navbar').on('click', '#menuView', (event) => {
  event.preventDefault();
  $('#menuContainer').empty();
  getUserAndGenerateMenu(userId);
});

$('.navbar').on('click', '#ordersView', (event) => {
  event.preventDefault();
  $('#menuContainer').empty();
  getOrders(createOrderElement);
  // const orderData = {
  //   order_id: 123,
  //   customer: 'John Doe',
  //   phone: '555-123-4567',
  //   food_name: 'Burger',
  //   price: 10.00,
  //   quantity: 2
  // };
  // const $orderElement = createOrderElement(orderData);
  // $('#menuContainer').prepend($orderElement);
});


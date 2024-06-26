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
});


const getOrders = (cb) => {
  $.get('/users/orderItems', function(data) {
    const orders = {};

    data.forEach(orderItem => {
      if (!orders[orderItem.order_id]) {
        orders[orderItem.order_id] = [];
      }
      orders[orderItem.order_id].push(orderItem);
    });


    Object.keys(orders).forEach(orderId => {
      const orderData = orders[orderId][0];
      const $orderItem = cb(orderData, orders[orderId]);
      $('#menuContainer').append($orderItem);
    });

    console.log(data);
  })
    .fail(function() {
      console.error('Error fetching order');
    });
};

const editMenuItemButton = function(event) {
  event.preventDefault();

  const formData = $(this).serialize();
  $.post('/users/editMenuItem', formData)
    .done(function(response) {
      alert('Item Edited Successfully');
      console.log(response);
      if (response.message) {
        alert(response.message);
      }
    })
    .fail(function() {
      console.error('Error editing menu item');
    });
};

const addMenuItemButton = function(event) {
  event.preventDefault();

  const formData = $(this).serialize();
  $.post('/users/addNewMenuItem', formData)
    .done(function(response) {
      alert('Item Added Successfully');
      console.log(response);
      if (response.message) {
        alert(response.message);
      }
      $('#menuContainer').empty();
      getMenuItems(createEditMenuItemForm);
      createAddNewMenuItemForm();
    })
    .fail(function() {
      console.error('Error adding menu item');
    });
};

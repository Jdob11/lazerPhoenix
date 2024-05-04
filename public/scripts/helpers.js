const createEditMenuItemForm = (menuItemData) => {
  const $form = $('<form>').addClass('menuItem', 'menuItemForm');
  const $itemIdInput = $('<input>').attr('type', 'hidden').attr('name', 'itemId').val(menuItemData.id);
  const $itemImageInput = $('<input>').attr('type', 'text').attr('id', 'itemImage').attr('name', 'itemImage').attr('placeholder', 'Image URL').val(menuItemData.image_url || '');
  const $inputRow = $('<div>').addClass('inputRow');
  const $itemNameInput = $('<input>').attr('type', 'text').attr('id', 'itemName').attr('name', 'itemName').attr('placeholder', 'Name').val(menuItemData.name || '');
  const $itemPriceInput = $('<input>').attr('type', 'text').attr('id', 'itemPrice').attr('name', 'itemPrice').attr('placeholder', 'Price').val(menuItemData.price || '');
  const $itemDescriptionTextarea = $('<textarea>').attr('id', 'itemDescription').attr('name', 'itemDescription').attr('placeholder', 'Description').val(menuItemData.description || '');
  const $editMenuItemButton = $('<button>').attr('type', 'submit').addClass('editMenuItemButton').text('Edit Menu Item');

  $inputRow.append($itemNameInput, $itemPriceInput);
  $form.append($itemIdInput, $itemImageInput, $inputRow, $itemDescriptionTextarea, $editMenuItemButton);
  $form.on('submit', editMenuItemButton)
  return $form;
};

const createMenuItemElement = (menuItemData) => {
  const $menuItem = $('<div>').addClass('menuItem');
  const $img = $('<img>').attr('src', menuItemData.image_url).attr('alt', 'image of food');
  const $itemInfo = $('<div>').addClass('itemInfo');
  const $menuItemName = $('<h3>').addClass('menuItemName').text(menuItemData.name);
  const priceInDollars = (menuItemData.price / 100).toFixed(2);
  const $menuItemPrice = $('<h3>').addClass('menuItemPrice').text('$' + priceInDollars);
  const $menuItemDescription = $('<p>').addClass('menuItemDescription').text(menuItemData.description);

  const $buttonContainer = $('<div>').addClass('itemInfo');
  const $orderButton = $('<button>').attr('type', 'button').addClass('orderButton').text('Order').attr('product_name', menuItemData.name).attr('product_id', menuItemData.id).attr('product_price', menuItemData.price);
  // const $removeButton = $('<button>').attr('type', 'button').addClass('removeButton').text('Remove').attr('product_name', menuItemData.name);


  $itemInfo.append($menuItemName, $menuItemPrice);
  $buttonContainer.append($orderButton, /*$removeButton*/);
  $menuItem.append($img, $itemInfo, $menuItemDescription, $buttonContainer);
  $orderButton.on('click', addToCartButton);
  // $removeButton.on('click', removeFromCartButton);
  return $menuItem;
};

const createAddNewMenuItemForm = () => {
  const $form = $('<form>').addClass('menuItem', 'addMenuNewItemForm');

  const $itemImageInput = $('<input>').attr('type', 'text').attr('id', 'itemImage').attr('name', 'itemImage').attr('placeholder', 'Image URL');
  const $inputRow = $('<div>').addClass('inputRow');
  const $itemNameInput = $('<input>').attr('type', 'text').attr('id', 'itemName').attr('name', 'itemName').attr('placeholder', 'Name');
  const $itemPriceInput = $('<input>').attr('type', 'text').attr('id', 'itemPrice').attr('name', 'itemPrice').attr('placeholder', 'Price');
  const $itemDescriptionTextarea = $('<textarea>').attr('id', 'itemDescription').attr('name', 'itemDescription').attr('placeholder', 'Description');

  const $addToMenuButton = $('<button>').attr('type', 'submit').addClass('addToMenuButton').text('Add to Menu');

  $inputRow.append($itemNameInput, $itemPriceInput);

  $form.append($itemImageInput, $inputRow, $itemDescriptionTextarea, $addToMenuButton);
  $form.on('submit', addMenuItemButton);

  $('#menuContainer').append($form);
};

function createOrderElement(orderData, orderItems) {
  const $orderContainer = $('<div>').addClass('menuItem orderCard');

  const $orderNumberDiv = $('<div>').addClass('orderNumberDiv');
  const $orderNumber = $('<h4>').addClass('orderNumber').text('#' + orderData.order_id);
  $orderNumberDiv.append($orderNumber);

  const $userInfo = $('<div>').addClass('userInfo');
  const $userName = $('<h3>').addClass('info').text(orderData.customer);
  const $phoneNumber = $('<h3>').addClass('info').text(orderData.phone);
  $userInfo.append($userName, $phoneNumber);

  const $foodAndPriceContainer = $('<div>').addClass('foodAndPriceContainer');

  orderItems.forEach(item => {
    const $foodAndPrice = $('<div>').addClass('foodAndPrice');
    const $foodItem = $('<p>').text(item.food_name);
    const $priceAndQuantity = $('<p>').text('$ ' + (item.price / 100).toFixed(2) + ' x ' + item.quantity);
    $foodAndPrice.append($foodItem, $priceAndQuantity);
    $foodAndPriceContainer.append($foodAndPrice);
  });

  const $total = $('<div>').addClass('total');
  const totalPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) / 100;
  const $totalCost = $('<h4>').text('$' + totalPrice.toFixed(2));
  $total.append($totalCost);

  const $timeEstimate = $('<div>').addClass('timeEstimate');
  const $estimateInput = $('<div>').addClass('estimateInput');
  const $estimateLabel = $('<label>').attr('for', 'estimate').text('Ready in:');
  const $estimateInputField = $('<input>').attr({type: 'number', id: 'estimate'});
  const $estimateButton = $('<button>').addClass('estimateButton').text('Send Estimate');

  $estimateInput.append($estimateLabel, $estimateInputField);
  $timeEstimate.append($estimateInput, $estimateButton);

  const $completeOrderButton = $('<button>').addClass('completeOrderButton').text('Complete Order');

  $orderContainer.append($orderNumberDiv, $userInfo, $foodAndPriceContainer, $total, $timeEstimate, $completeOrderButton);

  return $orderContainer;
}

document.addEventListener("DOMContentLoaded", function(){
  $('.menuContainer').on('click', '.estimateButton', function() {
    const phoneNumber = '+17807295721';
    sendEstimateSMS(phoneNumber);
    console.log("estimate SMS sent to:", phoneNumber);
  });

  $('.menuContainer').on('click', '.completeOrderButton', function() {
    const phoneNumber = '+17807295721';
    sendOrderCompletedSMS(phoneNumber);
    console.log("order completed SMS sent to:", phoneNumber);
  });
});



const getMenuItems = (cb) => {
  $.get('/users/menuItems', function(data) {
    data.sort((a, b) => b.id - a.id);
    data.forEach(function(menuItem) {
      const $menuItem = cb(menuItem);
      $('#menuContainer').prepend($menuItem);
    });

  }).fail(function() {
    console.error('Error fetching menu items');
  });
};

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

const addToCartButton = function() {
  const menuItemName = $(this).attr('product_name');
  const menuItemId = $(this).attr('product_id');
  const menuItemPrice = $(this).attr('product_price')
  // console.log(menuItemName);
  addToCart(menuItemName, menuItemId, menuItemPrice);
  renderCartItems();
}


const removeFromCartButton = function() {
  const menuItemName = $(this).attr('product_name');
  // console.log(menuItemName);
  const item = { name: menuItemName };
  removeFromCart(item);
  renderCartItems();
}

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
      getMenuItems(createEditMenuItemForm); // Generate Owner menu page
      createAddNewMenuItemForm();
    })
    .fail(function() {
      console.error('Error adding menu item');
    });
};

function initializeCartCounter() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cartCounter').textContent = totalQuantity;
}

// Function to add item to cart, template from Larry
function addToCart(itemName, menuItemId, menuItemPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItemIndex = cart.findIndex(item => item.name === itemName);

  if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
  } else {
      const newItem = { name: itemName, quantity: 1, menuItemId, menuItemPrice };
      cart.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter(cart);
  // console.log("Item added to cart:", itemName);
}

function removeFromCart(itemToRemove) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === itemToRemove.name);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    updateCartCounter(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    // console.log("Item removed from cart:", itemToRemove);
  } else {
    console.log("Item not found in cart:", itemToRemove);

  }
}



function updateCartCounter() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  $('#cartCounter').text(totalQuantity);
}

const getUserAndGenerateMenu = function(userId) {
  $.ajax({
  method: 'GET',
  url: `/users/${userId}`
})
.done((user) => {
  if (!user.is_owner) {
  getMenuItems(createMenuItemElement); // Generate user menu page
  initializeCartCounter();
  } else {
  getMenuItems(createEditMenuItemForm); // Generate Owner menu page
  createAddNewMenuItemForm();
  };
})
.fail((error) => {
  console.error('Error fetching user:', error);
});
};


function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCost = cart.reduce((total, item) => {
    const itemCost = parseInt(item.menuItemPrice) / 100 * parseInt(item.quantity);
    return total + itemCost;
  }, 0);

  // Update total cost in the cart tab
  $('.cartTab .totalCost').text('Total Cost: $' + totalCost.toFixed(2));

  const $listCart = $('.listCart');
  $listCart.empty();

  cart.forEach(item => {
    const priceInDollars = (item.menuItemPrice / 100).toFixed(2);
    const $item = $('<div class="item"></div>');

    const $name = $('<div class="name"></div>').text(item.name);
    $item.append($name);

    const $totalPrice = $('<div class="totalPrice"></div>').text('$' + priceInDollars);
    $item.append($totalPrice);

    const $quantity = $('<div class="quantity"></div>');
    $quantity.append('<span class="minus"><</span>');
    $quantity.append(`<span class="quant">${item.quantity}</span>`);
    $quantity.append('<span class="plus">></span>');
    $item.append($quantity);

    $listCart.append($item);
  });
}



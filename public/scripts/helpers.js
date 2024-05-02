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
  const $orderButton = $('<button>').attr('type', 'button').addClass('orderButton').text('Order').attr('product_name', menuItemData.name);
  const $removeButton = $('<button>').attr('type', 'button').addClass('removeButton').text('Remove').attr('product_name', menuItemData.name);


  $itemInfo.append($menuItemName, $menuItemPrice);
  $buttonContainer.append($orderButton, $removeButton);
  $menuItem.append($img, $itemInfo, $menuItemDescription, $buttonContainer);
  $orderButton.on('click', addToCartButton);
  $removeButton.on('click', removeFromCartButton);
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

const addToCartButton = function() {
  const menuItemName = $(this).attr('product_name');
  console.log(menuItemName);
  addToCart(menuItemName);
  renderCartItems();
}


const removeFromCartButton = function() {
  const menuItemName = $(this).attr('product_name');
  console.log(menuItemName);
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
function addToCart(itemName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItemIndex = cart.findIndex(item => item.name === itemName);

  if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
  } else {
      const newItem = { name: itemName, quantity: 1 };
      cart.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter(cart);
  console.log("Item added to cart:", itemName);
}


function removeFromCart(itemToRemove) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === itemToRemove.name);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartCounter(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Item removed from cart:", itemToRemove);
  } else {
    console.log("Item not found in cart:", itemToRemove);
  }
}

function updateCartCounter() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  $('#cartCounter').text(totalQuantity);
}

const getUserAndGenerateMenu = function(userId) {$.ajax({
  method: 'GET',
  url: `/users/${userId}`
})
.done((user) => {
  console.log(user);
  if (!user.is_owner) {
  getMenuItems(createMenuItemElement); // Generate user menu page
  } else {
  getMenuItems(createEditMenuItemForm); // Generate Owner menu page
  createAddNewMenuItemForm();
  };
  initializeCartCounter();
})
.fail((error) => {
  console.error('Error fetching user:', error);
});
};


function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const $listCart = $('.listCart');
  $listCart.empty();

  cart.forEach(item => {
    const $item = $('<div class="item"></div>');

    const $name = $('<div class="name"></div>').text(item.name);
    $item.append($name);

    const $totalPrice = $('<div class="totalPrice"></div>').text('$' + item.price);
    $item.append($totalPrice);

    const $quantity = $('<div class="quantity"></div>');
    $quantity.append('<span class="minus"><</span>');
    $quantity.append(`<span class="quant">${item.quantity}</span>`);
    $quantity.append('<span class="plus">></span>');
    $item.append($quantity);

    $listCart.append($item);
  });
}

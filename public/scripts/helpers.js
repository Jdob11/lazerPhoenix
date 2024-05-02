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
        // Grab the product name from the menu item associated with the clicked order button
        const menuItemName = $(this).attr('product_name');
        console.log(menuItemName);
        // Create an item object with the menu item's name
        const item = { name: menuItemName };

        // Add the item to the cart
        addToCart(item);
}

const removeFromCartButton = function() {
  // Grab the product name from the menu item associated with the clicked order button
  const menuItemName = $(this).attr('product_name');
  console.log(menuItemName);

  // Create an item object with the menu item's name
  const item = { name: menuItemName };
    // Add the item to the cart
  removeFromCart(item);
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
        getMenuItems(createEditMenuItemForm);
        createAddMenuNewItemForm();
      }
    })
    .fail(function() {
      console.error('Error adding menu item');
    });
};

// Function to add item to cart, template from Larry
function addToCart(item) {
  // Assuming you have a 'cart' array stored in the session or local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  console.log('cart: ', cart);
  let cartLength = cart.length;
  document.getElementById('cartCounter').textContent = cartLength;
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Item added to cart:", cart);
}

function removeFromCart(itemToRemove) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log("Current cart contents:", cart);
  console.log("Item name to remove:", itemToRemove.name);
  const index = cart.findIndex(item => item.name === itemToRemove.name);
  if (index !== -1) {
    cart.splice(index, 1);
    const cartLength = cart.length;
    document.getElementById('cartCounter').textContent = cartLength;
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Item removed from cart:", itemToRemove);
  } else {
    console.log("Item not found in cart:", itemToRemove);
  }
}


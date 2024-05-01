const createMenuItemForm = (menuItemData) => {
  const $form = $('<form>').addClass('menuItem').attr('action', '/users/editMenuItem').attr('method', 'POST');
  const $itemIdInput = $('<input>').attr('type', 'hidden').attr('name', 'itemId').val(menuItemData.id);
  const $itemImageInput = $('<input>').attr('type', 'text').attr('id', 'itemImage').attr('name', 'itemImage').attr('placeholder', 'Image URL').val(menuItemData.image_url || '');
  const $inputRow = $('<div>').addClass('inputRow');
  const $itemNameInput = $('<input>').attr('type', 'text').attr('id', 'itemName').attr('name', 'itemName').attr('placeholder', 'Name').val(menuItemData.name || '');
  const $itemPriceInput = $('<input>').attr('type', 'text').attr('id', 'itemPrice').attr('name', 'itemPrice').attr('placeholder', 'Price').val(menuItemData.price || '');
  const $itemDescriptionTextarea = $('<textarea>').attr('id', 'itemDescription').attr('name', 'itemDescription').attr('placeholder', 'Description').val(menuItemData.description || '');
  const $editMenuItemButton = $('<button>').attr('type', 'submit').addClass('editMenuItemButton').text('Edit Menu Item');

  $inputRow.append($itemNameInput, $itemPriceInput);
  $form.append($itemIdInput, $itemImageInput, $inputRow, $itemDescriptionTextarea, $editMenuItemButton);
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
  const $orderButton = $('<button>').attr('type', 'button').addClass('orderButton').text('Order').attr('product_name', menuItemData.name);

  $itemInfo.append($menuItemName, $menuItemPrice);
  $menuItem.append($img, $itemInfo, $menuItemDescription, $orderButton);

  return $menuItem;
};

const fetchMenuItems = (cb) => {
  $.get('/users/menuItems', function(data) {
    data.sort((a, b) => a.id - b.id);
    data.forEach(function(menuItem) {
      const $menuItem = cb(menuItem);
      $('#menuContainer').prepend($menuItem);
    });

     // Click event handler for order button
     $(document).on('click', '.orderButton', function() {
      // Grab the product name from the menu item associated with the clicked order button
      const menuItemName = $(this).attr('product_name');
      console.log(menuItemName);

      // Create an item object with the menu item's name
      const item = { name: menuItemName };

      // Add the item to the cart
      addToCart(item);
    });

  }).fail(function() {
    console.error('Error fetching menu items');
  });
};



const editMenuButton = function(event) {
  event.preventDefault();

  const formData = $(this).serialize();
  $.post('/users/editMenuItem', formData, function(response) {
    console.log(response);
  }).fail(function() {
    console.error('Error editing menu item');
  });
}

// Function to add item to cart
function addToCart(item) {
  // Assuming you have a 'cart' array stored in the session or local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Item added to cart:", item);
  // Update UI here to reflect the item being added to the cart
}




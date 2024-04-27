const createMenuItemForm = (menuItemData) => {
  // creating form element with necessary classes and attributes
  const $form = $('<form>').addClass('menuItem').attr('action', '/users/addMenuItem').attr('method', 'POST');

  // creating input elements
  const $itemImageInput = $('<input>').attr('type', 'text').attr('id', 'itemImage').attr('name', 'itemImage').attr('placeholder', 'Image URL').val(menuItemData.imageUrl || '');
  const $inputRow = $('<div>').addClass('inputRow');
  const $itemNameInput = $('<input>').attr('type', 'text').attr('id', 'itemName').attr('name', 'itemName').attr('placeholder', 'Name').val(menuItemData.name || '');
  const $itemPriceInput = $('<input>').attr('type', 'text').attr('id', 'itemPrice').attr('name', 'itemPrice').attr('placeholder', 'Price').val(menuItemData.price || '');
  const $itemDescriptionTextarea = $('<textarea>').attr('id', 'itemDescription').attr('name', 'itemDescription').attr('placeholder', 'Description').val(menuItemData.description || '');

  // creating button element
  const $addToMenuButton = $('<button>').attr('type', 'submit').addClass('addToMenuButton').text('Add to Menu');

  // appending input elements into appropriate containers
  $inputRow.append($itemNameInput, $itemPriceInput);

  // appending elements to the form
  $form.append($itemImageInput, $inputRow, $itemDescriptionTextarea, $addToMenuButton);

  return $form;
};

const createMenuItemElement = (menuItemData) => {
  // creating main container element
  const $menuItem = $('<div>').addClass('menuItem');

  // creating image element
  const $img = $('<img>').attr('src', menuItemData.image_url).attr('alt', 'image of food');

  // creating item info container
  const $itemInfo = $('<div>').addClass('itemInfo');

  // creating name and price elements
  const $menuItemName = $('<h3>').addClass('menuItemName').text(menuItemData.name);
  const priceInDollars = (menuItemData.price / 100).toFixed(2); // Convert cents to dollars and format to two decimal places
  const $menuItemPrice = $('<h3>').addClass('menuItemPrice').text('$' + priceInDollars);

  // creating description element
  const $menuItemDescription = $('<p>').addClass('menuItemDescription').text(menuItemData.description);

  // creating order button
  const $orderButton = $('<button>').attr('type', 'button').addClass('orderButton').text('Order');

  // appending elements to the main container
  $itemInfo.append($menuItemName, $menuItemPrice);
  $menuItem.append($img, $itemInfo, $menuItemDescription, $orderButton);

  return $menuItem;
};


// module.exports = {
//   createMenuItemForm,
//   createMenuItemElement
// }

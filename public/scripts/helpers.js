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
  $form.on('submit', editMenuItemButton);
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

  $itemInfo.append($menuItemName, $menuItemPrice);
  $buttonContainer.append($orderButton);
  $menuItem.append($img, $itemInfo, $menuItemDescription, $buttonContainer);
  $orderButton.on('click', addToCartButton);
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

const createOrderElement = (orderData, orderItems) => {
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

  $orderContainer.on('click', '.estimateButton', function() {
    alert('Time Estimate Sent To Customer')
    console.log(' estimate button clicked');
    const phoneNumber = '+17807295721';
    const estimateMinutes = $('#estimate').val();
    // sendEstimateSMS(phoneNumber, estimatedMinutes);
    console.log("estimate SMS sent to:", phoneNumber);
  });

  $orderContainer.on('click', '.completeOrderButton', function() {
    alert('Order Complete Message Sent To Customer')
    console.log('Complete Order button clicked');
    const phoneNumber = '+17807295721';
    // sendOrderCompletedSMS(phoneNumber);
    console.log("order completed SMS sent to:", phoneNumber);
  });

  return $orderContainer;
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

const getUserAndGenerateMenu = (userId) => {
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
      }
    })
    .fail((error) => {
      console.error('Error fetching user:', error);
    });
};

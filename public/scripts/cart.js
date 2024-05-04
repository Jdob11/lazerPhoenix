
document.addEventListener("DOMContentLoaded", function() {
  const shoppingCartButton = document.querySelector('.shopping-cart-button');
  const closeButton = document.querySelector('.close');
  const cartOverlay = document.querySelector('.cartTab');


  const toggleCartOverlay = () => {
    // console.log('BUTTON CLICKED');
    cartOverlay.classList.toggle('open');

    // If the cart overlay is open, log the cart data to the console
    // if (cartOverlay.classList.contains('open')) {
    // Retrieve cart data from local storage
    // const cartData = getCartData();
    // console.log('Cart Data:');
    // Log each item in the cart data
    // cartData.forEach(item => {
    //   console.log(item);
    // });
    // }
  };

  // Add event listener to the shopping cart button to trigger toggleCartOverlay
  if (shoppingCartButton !== null) {
    shoppingCartButton.addEventListener('click', toggleCartOverlay);
    closeButton.addEventListener('click', toggleCartOverlay);
  }
  // Function to retrieve cart data from local storage
  // function getCartData() {
  //   return JSON.parse(localStorage.getItem('cart')) || [];
  // }
});

$('.listCart').on('click', '.minus', function() {
  const itemName = $(this).closest('.item').find('.name').text();
  const item = { name: itemName };
  const cart = JSON.parse(localStorage.getItem('cart'));
  removeFromCart(item);
  renderCartItems();
  updateCartCounter(cart);
});

$('.listCart').on('click', '.plus', function() {
  const itemName = $(this).closest('.item').find('.name').text();
  addToCart(itemName);
  renderCartItems();
});

$('.cartTab').on('click', ' .submitOrder', function() {
  // console.log("order button clicked");
  const cart = JSON.parse(localStorage.getItem('cart'));
  // console.log(cart,"cart grab");
  localStorage.removeItem('cart');
  renderCartItems();
  updateCartCounter(cart);


  $.post("/users/order", {cart})
    .done(() => {
      console.log("order placed");

      const phoneNumber = '+17807295721';
      sendOrderReceivedSMS(phoneNumber);
      // console.log("Order confirmation to:", phoneNumber); //test

    })
    .fail(() => {
      console.log("order failed");
    });

});

const addToCart = (itemName, menuItemId, menuItemPrice) => {
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
};

const addToCartButton = function() {
  const menuItemName = $(this).attr('product_name');
  const menuItemId = $(this).attr('product_id');
  const menuItemPrice = $(this).attr('product_price');
  // console.log(menuItemName);
  addToCart(menuItemName, menuItemId, menuItemPrice);
  renderCartItems();
};

const removeFromCart = (itemToRemove) => {
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
};

const removeFromCartButton = function() {
  const menuItemName = $(this).attr('product_name');
  // console.log(menuItemName);
  const item = { name: menuItemName };
  removeFromCart(item);
  renderCartItems();
};

const initializeCartCounter = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cartCounter').textContent = totalQuantity;
};

const updateCartCounter = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  $('#cartCounter').text(totalQuantity);
};

const renderCartItems = () => {
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
};


document.addEventListener("DOMContentLoaded", function(){
  const shoppingCartButton = document.querySelector('.shopping-cart-button');
  const closeButton = document.querySelector('.close');
  const cartOverlay = document.querySelector('.cartTab');


  function toggleCartOverlay(){
    // console.log('BUTTON CLICKED');
    cartOverlay.classList.toggle('open');

    // If the cart overlay is open, log the cart data to the console
    if (cartOverlay.classList.contains('open')) {
      // Retrieve cart data from local storage
      const cartData = getCartData();
      // console.log('Cart Data:');
      // Log each item in the cart data
      // cartData.forEach(item => {
      //   console.log(item);
      // });
    }
  }

  // Add event listener to the shopping cart button to trigger toggleCartOverlay
  if (shoppingCartButton !== null) {
  shoppingCartButton.addEventListener('click', toggleCartOverlay);
  closeButton.addEventListener('click', toggleCartOverlay);
  }
  // Function to retrieve cart data from local storage
  function getCartData() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
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
      .done(() => { //Why doesn't this promise ever finish?
        console.log("order placed");

        const phoneNumber = '+17807295721';
        sendOrderReceivedSMS(phoneNumber);
        // console.log("Order confirmation to:", phoneNumber); //test

      })
      .fail(() => {
        console.log("order failed");
      })


});



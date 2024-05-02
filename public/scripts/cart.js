document.addEventListener("DOMContentLoaded", function(){
  const shoppingCartButton = document.querySelector('.shopping-cart-button');
  const closeButton = document.querySelector('.close');
  const cartOverlay = document.querySelector('.cartTab');

  function toggleCartOverlay(){
    console.log('BUTTON CLICKED');
    cartOverlay.classList.toggle('open');

    // If the cart overlay is open, log the cart data to the console
    if (cartOverlay.classList.contains('open')) {
      // Retrieve cart data from local storage
      const cartData = getCartData();
      console.log('Cart Data:');
      // Log each item in the cart data
      cartData.forEach(item => {
        console.log(item);
      });
    }
  }

  // Add event listener to the shopping cart button to trigger toggleCartOverlay
  shoppingCartButton.addEventListener('click', toggleCartOverlay);
  closeButton.addEventListener('click', toggleCartOverlay);

  // Function to retrieve cart data from local storage
  function getCartData() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
});

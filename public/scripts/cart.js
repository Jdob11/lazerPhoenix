document.addEventListener("DOMContentLoaded", function(){
  const shoppingCartButton = document.querySelector('.shopping-cart-button');
  const cartOverlay = document.querySelector('.cart-overlay');

function toggleCartOverlay(){
  console.log('BUTTON CLICKED');
  cartOverlay.classList.toggle('open');

}
shoppingCartButton.addEventListener('click', toggleCartOverlay);
});

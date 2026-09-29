const checkoutButton = document.querySelector('.do-checkout');
const modal = document.querySelector('#order-modal');
const closeButton = document.querySelector('.modal-close')

checkoutButton.addEventListener('click', function () {
    modal.style.display = 'flex';
});

closeButton.addEventListener('click', function(){
    modal.style.display = 'none';
});
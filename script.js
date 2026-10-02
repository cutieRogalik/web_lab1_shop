const savedCart = localStorage.getItem('cart');
const cart = saveCart ? JSON.parse(savedCart) : [];
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

addToCartButtons.forEach(function(button){
    button.addEventListener('click', function(){
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;

        const product = {
            name: productName,
            price: parseInt(productPrice.replace(/\D/g,'')),
            quantity: 1
        };

        const existingProduct = cart.find(function(item) {
            return item.name === product.name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        saveCart();
        renderCart();
    });
});

function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Ваша корзина пуста</p>';
        cartTotal.textContent = 'Итого: 0 р.';
        return;
    }
    let total=0;

    cart.forEach(function (product) {
        total += product.price * product.quantity
        const item = document.createElement('div');
        
        item.classList.add('cart-item');

        const productInfo = document.createElement('span');
        productInfo.textContent = product.name + ' - ' + product.price + ' р.';

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '−';

        const quantity = document.createElement('span');
        quantity.textContent = product.quantity;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Убрать'

        item.appendChild(productInfo);
        item.appendChild(decreaseButton);
        item.appendChild(quantity);
        item.appendChild(increaseButton);
        item.appendChild(deleteButton);

        increaseButton.addEventListener('click', function () {
            product.quantity++;
            saveCart();
            renderCart();
        });
        decreaseButton.addEventListener('click', function () {
            product.quantity--;

            if (product.quantity === 0) {
                const productIndex = cart.indexOf(product);
                cart.splice(productIndex, 1);
            }
            saveCart();
            renderCart();
        });
        deleteButton.addEventListener('click', function () {
            const productIndex = cart.indexOf(product);
            cart.splice(productIndex, 1);

            saveCart();
            renderCart();
        });

        cartItems.appendChild(item);
        
    });
    cartTotal.textContent = 'Итого: ' + total + ' p.';
}


const checkoutButton = document.querySelector('.do-checkout');
const modal = document.querySelector('#order-modal');
const closeButton = document.querySelector('.modal-close')

checkoutButton.addEventListener('click', function () {
    modal.style.display = 'flex';
});

closeButton.addEventListener('click', function(){
    modal.style.display = 'none';
});

renderCart();
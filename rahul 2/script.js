// script.js

// Cart array to store added products
let cart = [];

// Function to add item to cart
function addToCart(event) {
    const button = event.target;
    const productElement = button.closest('.product');
    const productName = productElement.querySelector('h2').innerText;
    const productPrice = productElement.querySelector('.price').innerText.replace('₹', '');
    const productQuantity = productElement.querySelector('.quantity input').value;
    const productImage = productElement.querySelector('img').src;

    const product = {
        name: productName,
        price: parseFloat(productPrice),
        quantity: parseInt(productQuantity),
        image: productImage
    };

    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} added to cart!`);
}

// Function to render cart items in the cart page
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');
    let cartSubtotal = 0;

    // Get cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Render each cart item
    cartItemsContainer.innerHTML = '';
    storedCart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartSubtotal += itemTotal;

        const cartItemRow = `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" class="cart-item-image"></td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                <td>₹${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemRow);
    });

    // Update cart summary
    cartSubtotalElement.innerText = cartSubtotal.toFixed(2);
    cartTotalElement.innerText = cartSubtotal.toFixed(2);
}

// Function to update quantity
function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

// Function to initialize cart page
function initializeCartPage() {
    renderCartItems();
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('#add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Initialize cart page if on the cart page
if (window.location.pathname.includes('cart.html')) {
    initializeCartPage();
}


// Function to add a review
function addReview(productName, reviewText, rating) {
    const review = {
        productName: productName,
        reviewText: reviewText,
        rating: rating
    };

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    renderReviews(productName);
}

// Function to render reviews
function renderReviews(productName) {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const productReviews = reviews.filter(review => review.productName === productName);

    reviewsContainer.innerHTML = '';

    productReviews.forEach(review => {
        const reviewElement = `
            <div class="review">
                <p>Rating: ${'★'.repeat(review.rating)}</p>
                <p>${review.reviewText}</p>
            </div>
        `;
        reviewsContainer.insertAdjacentHTML('beforeend', reviewElement);
    });
}

// Example usage: adding a review
document.getElementById('add-review').addEventListener('click', function() {
    const reviewText = document.getElementById('review-text').value;
    const rating = parseInt(document.getElementById('review-rating').value);
    addReview('Product Name', reviewText, rating); // Replace 'Product Name' with actual product name
});



// Function to zoom image on hover
document.querySelectorAll('.product-image img').forEach(image => {
    image.addEventListener('mouseover', function() {
        image.style.transform = 'scale(1.5)';
    });
    image.addEventListener('mouseout', function() {
        image.style.transform = 'scale(1)';
    });
});

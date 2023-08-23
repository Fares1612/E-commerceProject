document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Keyboard REDdragon RGB", price: 30,img:"images/img-1.jpg "},
        { id: 2, name: "Smartphone xiaomi Redmi 128GO", price: 299,img:"images/img-2.jpg"},
        { id: 3, name: "samsung galaxy tab A8", price: 250,img:"images/img-3.jpg"},
        { id: 4, name: "Connected watch mibro lite", price: 55,img:"images/img-4.jpg"},
        { id: 5, name: "Laptop lenovo ideadpad 5", price: 499,img:"images/img-5.png"},
        { id: 6, name: "Mouse gamer RedDragon M808", price: 28,img:"images/img-6.jpg"},
        { id: 7, name: "EPSON L3210", price: 127,img:"images/img-7.jpg"},
        { id: 8, name: "headphones BOROFONE BO12", price: 30,img:"images/img-8.jpg"},
        { id: 9, name: "Bluetoothdevice INKAX BS-01 black", price: 12,img:"images/img-9.png"},
        // ... More products
    ];

        
    
    const productContainer = document.querySelector(".product-list");
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-btn");
    const cartIcon = document.getElementById("cart-icon");
    const cartNotification = document.querySelector(".cart-notification");
    

    
// display the products





    // Create product cards
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src=${product.img} alt="product" class="cart-product-image"/>
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    // Shopping cart functionality
    const cart = [];

    // Event listener for the plus button
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const productId = parseInt(event.target.dataset.id);
            const selectedProduct = products.find(product => product.id === productId);
            if (selectedProduct) {
                const existingCartItem = cart.find(item => item.id === productId);
                if (existingCartItem) {
                    existingCartItem.quantity++;
                } else {
                    cart.push({ ...selectedProduct, quantity: 1 });
                }
                updateCartUI();
                updateCartNotification();
            }
        });
    });




function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
        <img src=${item.img} alt="product" class="cart-product-image"/>
        <div class="cart-product-details">
            <span>${item.name} - $${item.price}</span>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <button class="delete-product-btn" data-id="${item.id}">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        `;

        // Event listener for the delete button
        cartItem.querySelector(".delete-product-btn").addEventListener("click", function (event) {
            const productId = parseInt(event.currentTarget.dataset.id);
            const productIndex = cart.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                cart.splice(productIndex, 1);
                updateCartUI();
                updateCartNotification(); // Call the function to update the cart notification count
            }
        });
         // Event listener for the plus button
         cartItem.querySelector(".plus").addEventListener("click", function (event) {
            const productId = parseInt(event.currentTarget.dataset.id);
            const selectedProduct = cart.find(product => product.id === productId);
            if (selectedProduct) {
                selectedProduct.quantity++;
                updateCartUI();
                updateTotalPrice();
            }
        });
        // Event listener for the minus button
        cartItem.querySelector(".minus").addEventListener("click", function (event) {
            const productId = parseInt(event.currentTarget.dataset.id);
            const selectedProduct = cart.find(product => product.id === productId);
            if (selectedProduct && selectedProduct.quantity > 1) {
                selectedProduct.quantity--;
                updateCartUI();
                updateTotalPrice();
            }
        });

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    checkoutButton.innerText = `Checkout ($${totalPrice})`;
}
function updateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    checkoutButton.innerText = `Checkout ($${totalPrice})`;
}


    function updateCartNotification() {
        const cartItemCount = cart.length;
        cartNotification.innerText = cartItemCount;
        cartNotification.style.display = cartItemCount > 0 ? "inline" : "none";
    }

     // Update cart notification count and visibility
     const cartItemCount = cart.length;
     cartNotification.innerText = cartItemCount;
     cartNotification.style.display = cartItemCount > 0 ? "inline" : "none";

     totalPriceDisplay.innerText = `Total: $${totalPrice}`;
     checkoutButton.innerText = `Checkout ($${totalPrice})`;
     

     

    checkoutButton.addEventListener("click", function () {
        console.log("Checkout button clicked");
        alert("You need to make an account to proceed with your purchases.");
        window.location.href = "./signup.html"; // Redirect to the sign-up page
    });
    
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add products to cart
const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {
button.addEventListener("click", function () {

    const name = this.dataset.name;
    const price = Number(this.dataset.price);
    const image = this.dataset.image;

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.image = image;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to cart!");
});

});

// Save cart
function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
}

// Display cart
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function displayCart() {

if (!cartItems || !cartTotal) return;

cartItems.innerHTML = "";

let total = 0;

if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
}

cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
        <div class="cart-item">

            <img src="${item.image || ''}"
                 alt="${item.name}"
                 class="cart-product-image">

            <h4>${item.name}</h4>

            <p>
                $${item.price.toFixed(2)} × ${item.quantity}
                = $${itemTotal.toFixed(2)}
            </p>

            <button onclick="changeQuantity(${index}, -1)">−</button>

            <button onclick="changeQuantity(${index}, 1)">+</button>

            <button onclick="removeItem(${index})">Remove</button>

        </div>
    `;
});

cartTotal.textContent = total.toFixed(2);

}

// Change quantity
function changeQuantity(index, amount) {

cart[index].quantity += amount;

if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
}

saveCart();
displayCart();

}

// Remove product
function removeItem(index) {

cart.splice(index, 1);

saveCart();
displayCart();

}

// Display cart when page opens
displayCart();
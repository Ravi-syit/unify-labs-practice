let allProducts = [];
let cart = JSON.parse(localStorage.getItem('titan_cart')) || [];

const productsEl = document.getElementById('products');
const cartEl = document.getElementById('cart-items');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');

function renderProducts(products) {
    productsEl.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.image}" width="150">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart('${p._id}')">Add to Cart</button>
        `;
        productsEl.appendChild(div);
    });
}

function renderCart() {
    cartEl.innerHTML = '';
    if (cart.length === 0) {
        cartEl.innerHTML = '<p>Cart is empty</p>';
        return;
    }
    cart.forEach(item => {
        cartEl.innerHTML += `<p>${item.name} x ${item.quantity}</p>`;
    });
}

function addToCart(id) {
    const product = allProducts.find(p => p._id === id);
    const exist = cart.find(c => c._id === id);
    if (exist) exist.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem('titan_cart', JSON.stringify(cart));
    renderCart();
}

async function fetchProducts() {
    const category = categoryEl.value;
    const search = searchEl.value;
    const res = await fetch(`/api/products?category=${category}&search=${search}`);
    allProducts = await res.json();
    renderProducts(allProducts);
}

categoryEl.addEventListener('change', fetchProducts);
searchEl.addEventListener('input', fetchProducts);

document.getElementById('checkout').addEventListener('click', () => {
    document.getElementById('checkout-form').classList.remove('hidden');
});

document.getElementById('submit-order').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !email || !address) {
        alert("Please fill all customer details!");
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const customer = { name, email, address };

    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer, items: cart })
        });

        if (!res.ok) {
            const err = await res.json();
            alert("Order failed: " + (err.error || res.statusText));
            return;
        }

        const data = await res.json();
        alert('Order Placed! ID: ' + data.orderId);

        cart = [];
        localStorage.setItem('titan_cart', JSON.stringify(cart));
        renderCart();
        document.getElementById('checkout-form').classList.add('hidden');

        // Clear form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Check console.");
    }
});

renderCart();
fetchProducts();
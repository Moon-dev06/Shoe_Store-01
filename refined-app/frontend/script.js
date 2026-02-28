// 1. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('text-white');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('text-white');
    }
});

// 2. Parallax Hero
window.addEventListener('scroll', () => {
    const heroImg = document.getElementById('hero-img');
    heroImg.style.transform = `translateY(${window.pageYOffset * 0.4}px) scale(1.1)`;
});

// 3. Swiper Initialization (สไลด์สินค้า พร้อมลูกศร)
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

// 4. Cart Logic
let cart = [];

function toggleCart() {
    document.getElementById('side-cart').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
}

function addToCart(name, price, img) {
    const existingItem = cart.find(i => i.name === name);
    if(existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1, id: Date.now() });
    }
    updateCartUI();
    if(!document.getElementById('side-cart').classList.contains('open')) toggleCart();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) {
            removeItem(id);
        } else {
            updateCartUI();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countNav = document.getElementById('cart-count-nav');
    
    container.innerHTML = cart.length === 0 ? '<p class="text-gray-400 text-sm font-light italic text-center">Your bag is empty.</p>' : '';
    
    let total = 0;
    cart.forEach(item => {
        total += (item.price * item.qty);
        container.innerHTML += `
            <div class="flex items-start space-x-4 border-b border-gray-50 pb-6 group">
                <img src="${item.img}" class="w-20 h-24 object-cover bg-gray-50">
                <div class="flex-grow">
                    <h4 class="text-sm font-serif italic mb-1">${item.name}</h4>
                    <p class="text-[10px] text-gray-400 mb-4">฿${item.price.toLocaleString()}</p>
                    
                    <div class="flex items-center justify-between">
                        <div class="qty-box">
                            <button onclick="changeQty(${item.id}, -1)" class="qty-btn text-gray-400">—</button>
                            <div class="qty-input">${item.qty}</div>
                            <button onclick="changeQty(${item.id}, 1)" class="qty-btn">+</button>
                        </div>
                        
                        <button onclick="removeItem(${item.id})" class="text-gray-300 hover:text-red-500 transition-colors">
                            <i class="bi bi-trash3 text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    totalEl.innerText = `฿${total.toLocaleString()}`;
    countNav.innerText = `(${cart.length})`;
}

// 5. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// if user loged in
window.addEventListener('load', () => {
    if (localStorage.getItem('login') === 'true') {
        document.getElementById('loginForm').classList.add('hidden')
        document.getElementById('registration').classList.add('hidden')
        document.getElementById('home').classList.remove('hidden');
        window.location.href = '#home';
        document.getElementById('welcomeMessage').innerHTML = `${localStorage.getItem('firstname').charAt(0).toUpperCase() +
            localStorage.getItem('firstname').slice(1)}`;
            updateCartDisplay();
    }

    // Load cart from local storage when the page loads
    loadCartFromLocalStorage();
});


// Handling registration form submission
document.getElementById('registration').addEventListener('submit', (e) => {
    e.preventDefault();

    let userEmail = document.getElementById('email').value;
    let firstname = document.getElementById('fname').value;
    const userPassword = document.getElementById('password').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
        alert('Please enter a valid email address');
        return;
    }

    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem('userPassword', userPassword);
    localStorage.setItem("firstname", firstname);
    document.getElementById('registration').classList.add('hidden');
    window.location.href = '#loginForm';
document.getElementById('loginForm').classList.remove('hidden')
});

//  Handling login form submission

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('login seccess');
    

   const loginEmail = document.getElementById('login-email').value ;
   const loginPassword = document.getElementById('login-password').value ;

   if (loginEmail === localStorage.getItem('userEmail') & loginPassword === localStorage.getItem('userPassword') ){
    
 localStorage.setItem('login', true);
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    alert('Login successful!');
    window.location.href = '#home';
    
}

   else{
    alert('email address or password wrong')
   }
   

});

// logout
// logout
const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', () => {
    ['login', 'userEmail', 'userPassword', 'cart'].forEach(item => localStorage.removeItem(item));

    document.getElementById('home').classList.add('hidden');
    document.getElementById('registration').classList.remove('hidden');
    
    localStorage.setItem('login', false);
    
    window.location.hash = 'registration';
    
    cart = [];
    updateCartDisplay(); 

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
        button.disabled = false; 
    });
});

// Products data
const products = [
    { id: 0, name: 'Bose QC-1000', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 100, img: './imgs/img2.jpg' ,discount:'50' , discountEnd : '11/18/2024'},
    { id: 1, name: 'Bose QC-700', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 250, img: './imgs/img3.jpg' ,discount:'20' , discountEnd : '11/17/2024'},
    { id: 2, name: 'Bose QC-500', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 550, img: './imgs/img3.jpg'  ,discount:'30' , discountEnd : '11/18/2024' },
    { id: 3, name: 'Bose QC-400', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 300, img:'./imgs/img2.jpg'  ,discount:'10' , discountEnd : '12/1/2024'},
    { id: 4, name: 'Bose QC-300', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 360, img: './imgs/img3.jpg'  ,discount:'' , discountEnd : '12/2/2024'},
    { id: 5, name: 'Bose QC-200', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 100, img:'./imgs/img2.jpg'  ,discount:'20'},
    { id: 6, name: 'Bose QC-100', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 50, img:'./imgs/img2.jpg'  ,discount:'10' ,discountEnd : '12/3/2024'},
    { id: 7, name: 'Bose QC-1000', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 100, img: './imgs/img3.jpg'  ,discount:'50' ,discountEnd : '12/4/2024'},
    { id: 8, name: 'Bose QC-150', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 10, img: './imgs/img3.jpg'  ,discount:''},
    { id: 9, name: 'Bose QC-180', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 40, img: './imgs/img2.jpg' ,discount:'' },
    { id: 10, name: 'Bose QC-1', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 30, img: './imgs/img2.jpg' ,discount:'5'  ,discountEnd : '12/5/2024'},
    { id: 11, name: 'Bose QC-9', desc: 'Over Ear, Wireless Bluetooth Headphones with Built-In Microphone', price: 70, img: './imgs/img3.jpg' ,discount:'' },

];

let cart = []; // Array to hold the products added to the cart



//------------------
// check part to islam

// Function to format the current date and time in UTC
function getFormattedDateUTC() {
    const now = new Date();
    return now.toISOString().slice(0, 19); 
}

// Function to calculate and format the remaining time
function getRemainingTime(endTime) {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now; // Difference in milliseconds

    if (diff <= 0) {
        return null; 
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m`;
}

// Function to check and update discounts dynamically
function updateDiscounts() {
    const currentUTC = getFormattedDateUTC();

    products.forEach(product => {
        if (product.discount && product.discountEnd) {
            const productDiscountEnd = new Date(product.discountEnd).toISOString().slice(0, 19);

            if (currentUTC >= productDiscountEnd) {
                // Remove discount if expired
                product.discount = '';
                product.discountEnd = '';
            }
        }
    });

    displayproducts(); 
}

// Function to display the products
function displayproducts() {
    const myproductsrow = document.getElementById('row');
    myproductsrow.innerHTML = '';

    products.forEach(product => {
        let discountInfo = '';
        if (product.discount && product.discountEnd) {
            const remainingTime = getRemainingTime(product.discountEnd);
            if (remainingTime) {
                discountInfo = `${product.discount}% OFF : ${remainingTime}`;
            } else {
                // If discount expired, clear it
                product.discount = '';
                product.discountEnd = '';
            }
        }

        const producthtml = `
        <div class="product p-4 mb-5 rounded-4 col-md-5 col-sm-12">
            <div class="img"><img class="w-50" src="${product.img}" alt="">
            <p class="text-danger">${discountInfo}</p>
            </div>
            <div class="info">
                <h3>${product.name}</h3>
                <p class="">${product.desc}</p>
                <div class="d-flex gap-4 align-items-center justify-content-center">
                    <h3 class="text-danger">$${product.price}</h3>
                    <button class="btn btn-danger buy" data-id="${product.id}" onclick="handleBuy(${product.id})">Buy</button>
                    <button class="btn btn-danger add-to-cart" data-id="${product.id}"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
        </div>`;
        myproductsrow.innerHTML += producthtml;
    });

    // Reassign 'Add to Cart' event listeners after displaying the products
    attachAddToCartListeners();
    handleBuy()
}

// Function to refresh the time every second
function startCountdown() {
    setInterval(() => {
        updateDiscounts();
    }, 10000); 
}

displayproducts();
startCountdown();


// ----------------------
// Function to handle the Buy button action
function handleBuy(productId) {
    const product = products.find(item => item.id == productId);

    if (product) {
        // Ask the user for payment method
        const paymentMethod = confirm("PayPal اضغط موافق للدفع باستخدام ");

        if (paymentMethod) {
             // Redirect to PayPal
             window.location.href = `https://www.paypal.com/pay?amount=${product.price}&item=${encodeURIComponent(product.name)}`;
        } 
    } else {
        console.error('Product not found!');
    }
}


// Function to attach 'Add to Cart' button event listeners
function attachAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-id');
            if (productId) {
                addToCart(productId);
                button.innerHTML = `<i class="fa-solid fa-check"></i>`;
                button.disabled = true;
            } else {
                console.error('Product ID is missing!');
            }
        });
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(item => item.id == productId);

    if (product) {
        const alreadyInCart = cart.find(item => item.id == productId);
        if (!alreadyInCart) {
            cart.push(product);
            saveCartToLocalStorage();
            updateCartDisplay();
        }
    } else {
        console.error(`Product with ID ${productId} not found!`);
    }
}

// Function to remove a product from the cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedProduct = cart[index];
        cart.splice(index, 1);
        saveCartToLocalStorage();
        updateCartDisplay();

        const addToCartBtn = document.querySelector(`.add-to-cart[data-id='${removedProduct.id}']`);
        if (addToCartBtn) {
            addToCartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
            addToCartBtn.disabled = false; 
        }
    } else {
        console.error('Product index is out of bounds or not found!');
    }
}

// Function to display the cart products
function updateCartDisplay() {
    const myCardProducts = document.getElementById('myCardProducts');
    const totalPriceElement =document.getElementById('totalPrice') ;
    myCardProducts.innerHTML = '';
let totalPrice =0 ;
    if (cart.length === 0) {
        myCardProducts.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        totalPriceElement.innerHTML ='';
    } else {
        cart.forEach((item, index) => {
            const cartItem = `
            <div class="cart-item d-flex justify-content-between align-items-center p-2">
                <img src="${item.img}" alt="${item.name}" style="width: 70px;">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <h4 class="text-danger">$${item.price}</h4>
                </div>
                <button class="btn btn-danger remove-from-cart" data-index="${index}">Remove</button>
                
            </div>`;
            myCardProducts.innerHTML += cartItem;
            totalPrice += item.price ;
        });
        totalPriceElement.innerHTML = `<h3>Total Price:<span class="text-danger">$${totalPrice}</span></h3>`;

        // Attach event listeners for 'Remove' buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                removeFromCart(e.target.dataset.index);
            });
        });
    }
}

// Show or hide the cart
const mycard = document.getElementById('mycard');
mycard.addEventListener('click', () => {
    const myCardProducts = document.getElementById('myCardProducts');
    myCardProducts.style.display = myCardProducts.style.display === 'block' ? 'none' : 'block';
});

// Function to save the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCartDisplay();
    }
}

// Display products when the page loads
window.addEventListener('load', displayproducts);

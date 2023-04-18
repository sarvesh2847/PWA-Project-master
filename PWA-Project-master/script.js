const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
const cartItem = document.querySelector('.cart-items-container')
const cartBtn = document.querySelector('#cart-btn')
const navbar = document.querySelector('.navbar')
const menuBtn = document.querySelector('#menu-btn')



searchBtn.addEventListener('click', () => {
    searchForm.classList.toggle('active');
    document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(searchBtn) && !e.composedPath().includes(searchForm)) {
            searchForm.classList.remove('active');
        }
    })
})

cartBtn.addEventListener('click', () => {
    cartItem.classList.toggle('active');
    document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(cartBtn) && !e.composedPath().includes(cartItem)) {
            cartItem.classList.remove('active');
        }
    })
})

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(navbar) && !e.composedPath().includes(menuBtn)) {
            navbar.classList.remove('active');
        }
    })
})

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
// }


// Ensure that the browser supports the service worker API
if (navigator.serviceWorker) {
    // Start registration process on every page load
    window.addEventListener('load', () => {
        navigator.serviceWorker
            // The register function takes as argument
            // the file path to the worker's file
            .register('/service-worker.js')
            // Gives us registration object
            .then(reg => console.log('Service Worker Registered'))
            .catch(swErr => console.log(
                `Service Worker Installation Error: ${swErr}}`));
    });
}
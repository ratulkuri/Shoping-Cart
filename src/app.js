import Products, { productModalInit, rederProductList } from './product.js';
import InitCart from './cart.js';
import Toast from './toaster.js';

const toggleMenu = () => {
    let trigger = document.querySelector("#toggle-mobile-menu")
    let elm = document.querySelector("#mobile-menu")

    trigger.addEventListener("click", () => {
        if(elm.classList.contains("active")) {
            elm.classList.remove("active");
        } else {
            elm.classList.add("active");
        }
    })

    elm.addEventListener("click", (e) => {
        if(!e.target.classList.contains("dropdown") && elm.classList.contains("active")) {
            elm.classList.remove("active");
        }
    })
}

const init = () => {
    toggleMenu();
    rederProductList(".product-list");
    InitCart("#cart-menu");
    productModalInit();
}

init();

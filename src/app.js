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

    trigger.addEventListener("blur", () => {
        if(elm.classList.contains("active")) {
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

import { getProductById } from "./product.js";
import Toast from "./toaster.js";

export const toggleCart = () => {
    let triggerOpen = document.querySelector("#open-cart-drawer")
    let triggerClose = document.querySelectorAll(".close-cart")
    let elm = document.querySelector("#cart-menu")
    let cartPanelOuterElem = elm.querySelector(".close-cart-outer")

    const closeCart = () => {
        if(elm.classList.contains("open")) {
            elm.classList.remove("open");
        }
    }

    triggerOpen.addEventListener("click", () => {
        if(elm.classList.contains("open")) {
            elm.classList.remove("open");
        } else {
            elm.classList.add("open");
        }
    })

    cartPanelOuterElem.addEventListener("click", (e) => {
        if (cartPanelOuterElem !== e.target) return;
        closeCart();
    })

    for (let closeElm of triggerClose) {
        closeElm.addEventListener("click", () => {
            closeCart();
        })
    }

}

export const cartProducts = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    return cart;
}

export const cartTotalQuantity = () => {
    let cartItems = cartProducts();
    let totalQty = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + parseFloat(currentItem.quantity)
    }, 0);
    return totalQty;
}

export const getSubTotalPrice = () => {
    let cartItems = cartProducts();
    let totalPrice = 0;
    if (!!cartItems && cartItems?.length > 0) {
        for(let item of cartItems) {
            let product = getProductById(item.id);
            if (!!product) {
                totalPrice = totalPrice + (item?.quantity * product?.price);
            }
        }
    }

    return totalPrice;
}

export const getTotalPrice = () => {
    let subTotal = getSubTotalPrice();
    let prevDiscountObject = getDiscount();
    let totalPrice = subTotal;

    if(!!prevDiscountObject?.code) {
        let prevDiscountCode = prevDiscountObject.code;
        let discountValue = applyDiscount(prevDiscountCode);
        totalPrice = subTotal - discountValue;
    }

    return totalPrice;
}

export const renderCartItems = (selector) => {
    let cartItems = cartProducts();
    let cartMenuElm = document.querySelector(selector);
    let cartCountElm = document.querySelector(".cart-count");
    let cartListElem = cartMenuElm.querySelector("#cart-items");
    let subTotalPriceElem = cartMenuElm.querySelector("#subtotal-price");
    // let subTotal = getSubTotalPrice();
    let totalPrice = getTotalPrice(); // Gets the initial total price
    // Gets the initial discount string of object. Ex: "{code: 'string'}" || "{}"
    let prevAppliedDiscount = localStorage.getItem("discount");
    let prevDiscountCode ="";


    if(!!prevAppliedDiscount) {
        prevDiscountCode = JSON.parse(prevAppliedDiscount)?.code;

        if(!!prevDiscountCode) {
            let discountValue = applyDiscount(prevDiscountCode);
            // let totalPrice = subTotal - discountValue;
            totalPrice = getTotalPrice(); // re-asign the total price after discount applied
            cartMenuElm.querySelector("#discount-value").innerHTML = `- $${discountValue}`;
            cartMenuElm.querySelector("#discount-badge").innerHTML = prevDiscountCode;
            cartMenuElm.querySelector("#total-price").innerHTML = `$${totalPrice}`;
            document.querySelector("#discount-form").style.display = "none";
            document.querySelector("#discounted-wrap").style.display = "block";
        } else {
            resetDiscount();
        }
        // let newDiscountValue = applyDiscount(prevDiscountCode);
    }

    cartListElem.innerHTML = '';
    if (!!cartItems && cartItems?.length > 0) {
        for(let item of cartItems) {
            let product = getProductById(item.id);
            if (!!product) {
                cartListElem.innerHTML += `
                    <li id="cart-item" class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src="${product?.thumbnail}" alt="${product?.description}" class="h-full w-full object-cover object-center">
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                        <a href="#" data-product-id="${product?.id}" data-modal-target="#product-modal" class="quick-view">${product?.title}</a>
                                    </h3>
                                    <div class="flex items-end flex-col">
                                        <p class="ml-4">$${(item?.quantity * product?.price)}</p>
                                        <p class="text-xs text-gray-400 font-normal whitespace-nowrap ml-4">${item?.quantity} &#x2715; $${product?.price}</p>
                                    </div>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">${product?.brand}</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                                <span class="inline-flex items-center text-gray-500 gap-2">
                                    <span>Qty </span>
                                    <div class="inline-flex justify-center gap-2">
                                        <button data-product-id="${product?.id}" class="decrease-qty bg-slate-100 border hover:bg-slate-200 px-2 py-1 rounded"><i class="ti ti-minus"></i></button>
                                        <input class="bg-white border rounded px-2 py-1 w-10 text-center" type="text" value="${item?.quantity}" disabled />
                                        <button data-product-id="${product?.id}" class="increase-qty bg-slate-100 border hover:bg-slate-200 px-2 py-1 rounded"><i class="ti ti-plus"></i></button>
                                    </div>
                                </span>

                                <div class="flex">
                                    <button type="button" class="remove-item font-medium text-indigo-600 hover:text-indigo-500" data-product-id="${product?.id}">Remove</button>
                                </div>
                            </div>
                        </div>
                    </li>
                `
            }
        }

        cartCountElm.innerHTML = cartTotalQuantity();
        cartCountElm.style.display = "inline-flex";
        document.querySelector(".remove-all-wrap").style.display = "block";

        let removeBtnList = cartMenuElm.querySelectorAll(".remove-item");

        for (let btn of removeBtnList) {
            btn.addEventListener("click", () => {
                let id = btn.getAttribute("data-product-id");
                if(!!id) {
                    removeFromCart(id);
                }
            })
        }

        increaseCartQty(cartMenuElm);
        decreaseCartQty(cartMenuElm);

    } else {
        resetDiscount();
        cartCountElm.innerHTML = "0";
        cartCountElm.style.display = "none";
        cartListElem.innerHTML = `
        <div class="flex">
            <span class="inline-block w-full py-10 text-center text-lg font-bold">Emtpy Cart</span>
        </div>
        `;
        cartMenuElm.querySelector(".remove-all-wrap").style.display = "none";
    }

    subTotalPriceElem.innerHTML = `$${getSubTotalPrice()}`; // Display sub-total price in panel
    cartMenuElm.querySelector("#total-price").innerHTML = `$${totalPrice}`; // Display total price in panel

}

export const addToCart = ({...props}) => {
    const {id, qty} = props;
    let itemToBeAdded = getProductById(id);
    let cartItems = cartProducts();

    if(!!itemToBeAdded) {
        let newItem = {
            id: itemToBeAdded.id,
            quantity: qty,
            // price: itemToBeAdded.price,
        }

        let foundItem = cartItems.find((item) => item.id === newItem.id )

        if (!!foundItem) {
            foundItem.quantity += newItem.quantity;
            localStorage.cart = JSON.stringify([...cartItems]);
            Toast.success({message: "Product quantity in the cart updated!"});
        } else {
            localStorage.cart = JSON.stringify([...cartItems, newItem]);
            Toast.success({message: "Successfully added new product in the cart!"});
        }

    }

    renderCartItems("#cart-menu");

    // console.log("product", itemToBeAdded);
    // console.log("cartItems", cartProducts());

}

export const increaseCartQty = (cartMenu) => {
    let increaseBtns = cartMenu.querySelectorAll(".increase-qty");
    // console.log('updatedCart =>', increaseBtns);

    for (let btn of increaseBtns) {
        btn.addEventListener("click", () => {
            let productId = parseFloat(btn.getAttribute("data-product-id"));
            let cartItems = cartProducts();
            let updatedCart = cartItems;

            // console.log("item.id", productId);

            if(!!cartItems && cartItems?.length > 0) {
                updatedCart = cartItems.map((item) => {
                    if(item.id === productId) {
                        item.quantity = item.quantity + 1
                        // console.log(item.quantity);
                    }
                    return item;
                } )
            }

            localStorage.cart = JSON.stringify(updatedCart);
            renderCartItems("#cart-menu");
        })
    }

}

export const decreaseCartQty = (cartMenu) => {
    let increaseBtns = cartMenu.querySelectorAll(".decrease-qty");
    // console.log('updatedCart =>', increaseBtns);

    for (let btn of increaseBtns) {
        btn.addEventListener("click", () => {
            let productId = parseFloat(btn.getAttribute("data-product-id"));
            let cartItems = cartProducts();
            let updatedCart = cartItems;

            // console.log("item.id", productId);

            if(!!cartItems && cartItems?.length > 0) {
                updatedCart = cartItems.map((item) => {
                    if(item.id === productId && item.quantity > 1) {
                        item.quantity = item.quantity - 1
                        // console.log(item.quantity);
                    }
                    return item;
                } )
            }

            localStorage.cart = JSON.stringify(updatedCart);
            renderCartItems("#cart-menu");
        })
    }

}

export const removeFromCart = (productId) => {
    // console.log(productId);
    productId = parseFloat(productId);
    let cartItems = cartProducts();
    let updatedCart = cartItems.filter((item) => item.id !== productId )

    localStorage.cart = JSON.stringify([...updatedCart]);

    Toast.warning({message: "Product has been removed!"});

    renderCartItems("#cart-menu");
}

export const clearCart = () => {
    localStorage.cart = JSON.stringify([]);
    document.querySelector(".remove-all-wrap").style.display = "none";
    Toast.error({message: "Cart cleared successfully!" });
    renderCartItems("#cart-menu");
}

export const calculateDiscount = (price, percentage, maxVlaue = 99) => {
    let percCalculated = (price * percentage) / 100;
    let discountValue = percCalculated > maxVlaue ? maxVlaue : percCalculated;
    return discountValue
}

export const getDiscount = () => {
    let discount = {};
    let localStorageDiscount = localStorage.getItem("discount");
    if (!!localStorageDiscount) {
        discount = JSON.parse(localStorageDiscount);
    }
    return discount;
}

export const applyDiscount = (coupon) => {
    // if (coupon.toLowerCase() === "ostad2023" && cartProducts().length > 0) {
    if (coupon.toLowerCase() === "ostad2023") {
        localStorage.discount = JSON.stringify({code: coupon});
        let subTotalPrice = getSubTotalPrice();
        let discountValue = calculateDiscount(subTotalPrice, 10);
        document.querySelector("#discount-form").style.display = "none";
        // console.log(discountValue);
        return discountValue;
    }
    return false
}

export const resetDiscount = () => {
    localStorage.discount = JSON.stringify({});
    document.querySelector("#discount-code").value = "";
    document.querySelector("#discounted-wrap").style.display = "none";
    document.querySelector("#discount-form").style.display = "block";
}

export const discountProcess = (selector) => {
    let cartElm = document.querySelector(selector);
    let discountForm = cartElm.querySelector("#discount-form");
    let discountInput = discountForm.querySelector("#discount-code");

    discountInput.addEventListener("input", (e) => {
        if(!!e.target.value) {
            discountForm.querySelector("#discount-feedback").style.visibility = "hidden";
        }
    })

    discountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let newCode = discountInput.value;
        let newDiscountValue = applyDiscount(newCode);
        let subTotal = getSubTotalPrice();
        if(!!newDiscountValue) {
            let newTotalPrice = subTotal - newDiscountValue;
            discountForm.querySelector("#discount-feedback").style.visibility = "hidden";
            cartElm.querySelector("#discounted-wrap").style.display = "block";
            cartElm.querySelector("#discount-badge").innerHTML = newCode;
            cartElm.querySelector("#discount-value").innerHTML = `- $${newDiscountValue}`;
            cartElm.querySelector("#total-price").innerHTML = `$${newTotalPrice}`;
        } else {
            discountForm.querySelector("#discount-feedback").style.visibility = "visible";
        }
    });
}

const InitCart = (selector) => {
    toggleCart();
    renderCartItems(selector);
    discountProcess(selector);

    document.querySelector("#reset-discount").addEventListener("click", () => {
        resetDiscount();
    })

    document.querySelector("#remove-all").addEventListener("click", () => {
        if(confirm("Waring! Are you sure to remove all items in the cart.") == true) {
            clearCart();
        }
    })
}

export default InitCart;
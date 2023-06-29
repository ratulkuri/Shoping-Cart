import { addModalTriggerListener, getProductById } from "./product.js";
import Toast from "./toaster.js";

// Defines cart panel toggle function
export const toggleCart = () => {
    let triggerOpen = document.querySelector("#open-cart-drawer")
    let triggerClose = document.querySelectorAll(".close-cart")
    let elm = document.querySelector("#cart-menu")
    let cartPanelOuterElem = elm.querySelector(".close-cart-outer")

    // closes the cart panel
    const closeCart = () => {
        if(elm.classList.contains("open")) {
            elm.classList.remove("open");
        }
    }

    // Listens to trigger element to toggles cart panel on click
    triggerOpen.addEventListener("click", () => {
        if(elm.classList.contains("open")) {
            elm.classList.remove("open");
        } else {
            elm.classList.add("open");
        }
    })

    // Listens to backdrop element to close cart panel on outiside click
    cartPanelOuterElem.addEventListener("click", (e) => {
        // Prevents close on clicking cart panel
        if (cartPanelOuterElem !== e.target) return;
        closeCart();
    })

    // listens to all close element to close cart panel on click
    for (let closeElm of triggerClose) {
        closeElm.addEventListener("click", () => {
            closeCart();
        })
    }

}

// Defines function to get current cart items
export const cartProducts = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    return cart;
}

// Defines function to get current cart items total quantity
export const cartTotalQuantity = () => {
    let cartItems = cartProducts();
    let totalQty = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + parseFloat(currentItem.quantity)
    }, 0);
    return totalQty;
}

// Defines function to get subtotal price of the cart items
export const getSubTotalPrice = () => {
    let cartItems = cartProducts();
    let totalPrice = 0;
    // console.log("cartItems in getSubTotalPrice", cartItems);
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

// Defines function to get total price of the cart items
export const getTotalPrice = () => {
    let subTotal = getSubTotalPrice();
    let prevDiscountObject = getDiscount();
    let totalPrice = subTotal; // sets subtotal price without discount as initial total price

    // if there is any discount code applied then subtracts discount from subtotal then set the value as total price
    if(!!prevDiscountObject && Object.keys(prevDiscountObject).length > 0 && prevDiscountObject.hasOwnProperty("code")) {
        let prevDiscountCode = prevDiscountObject.code;
        let discountValue = applyDiscount(prevDiscountCode);
        totalPrice = subTotal - discountValue;
    }

    return totalPrice;
}

// Display total price in panel
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
    let prevDiscountCode =""; // Sets empty string as the initial discount code

    // check if found any string of object as previously applied discount
    if(!!prevAppliedDiscount) {
        // JSON parse discount string of object if found and gets the code
        prevDiscountCode = JSON.parse(prevAppliedDiscount)?.code;

        // Apply code to get discount value if the code exist
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
            // Resets discount if the code doesn't exist
            resetDiscount();
        }
    }

    cartListElem.innerHTML = ''; // Initially resets cart item list during render
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

        cartCountElm.innerHTML = cartTotalQuantity(); // Gets and sets cart total quantity in cart badge
        cartCountElm.style.display = "inline-flex"; // Show cart total quantity badge
        document.querySelector(".remove-all-wrap").style.display = "block"; // show "Clear Cart" button

        let removeBtnList = cartMenuElm.querySelectorAll(".remove-item");

        for (let btn of removeBtnList) {
            btn.addEventListener("click", () => {
                let id = btn.getAttribute("data-product-id");
                if(!!id) {
                    removeFromCart(id);
                }
            })
        }

        let qvTogglers = cartMenuElm.querySelectorAll(".quick-view")
        addModalTriggerListener(qvTogglers);
        increaseCartQty(cartMenuElm); // Initalize cart item quantity increase function
        decreaseCartQty(cartMenuElm); // Initalize cart item quantity decrease function

    } else {

        // Resets if empty cart during render
        resetDiscount(); // Initially resets discount
        cartCountElm.innerHTML = "0"; // Resets total quantity
        cartCountElm.style.display = "none"; // Hides total quantity count badge
        cartListElem.innerHTML = `
        <div class="flex">
            <span class="inline-block w-full py-10 text-center text-lg font-bold">Emtpy Cart</span>
        </div>
        `;
        cartMenuElm.querySelector(".remove-all-wrap").style.display = "none"; // Hides "Clear Cart" element
    }

    subTotalPriceElem.innerHTML = `$${getSubTotalPrice()}`; // Display sub-total price in panel
    cartMenuElm.querySelector("#total-price").innerHTML = `$${totalPrice}`; // Display total price in panel

}

// Define function to add product in cart
export const addToCart = ({...props}) => {
    const {id, qty} = props; // Destructures id & qty variable
    let itemToBeAdded = getProductById(id); // Gets item to be added from id
    let cartItems = cartProducts(); // Gets current cart item's id and quantity

    // Check if product exist in "Proudcts"
    if(!!itemToBeAdded) {
        let newItem = {
            id: itemToBeAdded.id,
            quantity: qty,
            // price: itemToBeAdded.price,
        }

        // Check if item already exists in cart
        let foundItem = cartItems.find((item) => item.id === newItem.id )

        if (!!foundItem) {
            foundItem.quantity += newItem.quantity; // Increases quantity if found
            localStorage.cart = JSON.stringify([...cartItems]); // Stores new cart data in local storage
            Toast.success({message: "Product quantity in the cart updated!"});
        } else {
            localStorage.cart = JSON.stringify([...cartItems, newItem]); // Add new product data in local storage
            Toast.success({message: "Successfully added new product in the cart!"});
        }

    }

    // Render cart items after cart data updates
    renderCartItems("#cart-menu");

    // console.log("product", itemToBeAdded);
    // console.log("cartItems", cartProducts());

}

// Defines function to increase item in cart
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

            localStorage.cart = JSON.stringify(updatedCart); // Updates cart data in local storage
            renderCartItems("#cart-menu"); // Render cart items after cart data updates
        })
    }

}

// Defines function to decrease item in cart
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

            localStorage.cart = JSON.stringify(updatedCart); // Updates cart data in local storage
            renderCartItems("#cart-menu"); // Render cart items after cart data updates
        })
    }

}

// Defines function to remove item in cart
export const removeFromCart = (productId) => {
    // console.log(productId);
    productId = parseFloat(productId); // String to Number parse
    let cartItems = cartProducts(); // Current cart items

    let updatedCart = cartItems.filter((item) => item.id !== productId ) // Remove cart items

    localStorage.cart = JSON.stringify([...updatedCart]); // Store updated cart data after remove

    Toast.warning({message: "Product has been removed!"});

    renderCartItems("#cart-menu");
}

// Defines function to remove all items in cart
export const clearCart = () => {
    localStorage.cart = JSON.stringify([]);
    document.querySelector(".remove-all-wrap").style.display = "none";
    Toast.error({message: "Cart cleared successfully!" });
    renderCartItems("#cart-menu");
}

// Defines function to calculate discount.
export const calculateDiscount = (price, percentage, maxVlaue = 99) => {
    let percCalculated = (price * percentage) / 100;
    let discountValue = percCalculated > maxVlaue ? maxVlaue : percCalculated;
    return discountValue
}

// Defines function to get discount as object from local storage.
export const getDiscount = () => {
    let discount = {};
    let localStorageDiscount = localStorage.getItem("discount");
    if (!!localStorageDiscount) {
        discount = JSON.parse(localStorageDiscount);
    }
    return discount;
}

// Defines function to apply discount code and return discount value .
export const applyDiscount = (coupon) => {
    if (coupon.toLowerCase() === "ostad2023") {
        localStorage.discount = JSON.stringify({code: coupon});
        let subTotalPrice = getSubTotalPrice();
        let discountValue = calculateDiscount(subTotalPrice, 10);
        document.querySelector("#discount-form").style.display = "none";
        // console.log(subTotalPrice, discountValue);
        return discountValue;
    }
    return false
}

// Defines function to reset applied discount
export const resetDiscount = () => {
    localStorage.discount = JSON.stringify({});
    document.querySelector("#discount-code").value = "";
    document.querySelector("#discounted-wrap").style.display = "none";
    document.querySelector("#discount-form").style.display = "block";
}

// Defines function to initialize discount process
export const discountProcess = (selector) => {
    let cartElm = document.querySelector(selector);
    let discountForm = cartElm.querySelector("#discount-form");
    let discountInput = discountForm.querySelector("#discount-code");

    // hides feedback when starts typing coupon code
    discountInput.addEventListener("input", (e) => {
        if(!!e.target.value) {
            discountForm.querySelector("#discount-feedback").style.visibility = "hidden";
        }
    })

    // captures coupon code for submision and proceeds calcaluation on submit
    discountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let newCode = discountInput.value;
        let newDiscountValue = applyDiscount(newCode);
        let subTotal = getSubTotalPrice();

        // console.log("newDiscountValue in discountProcess =>", newDiscountValue);

        if(!!newDiscountValue) {

            // console.log("subTotal in discountProcess =>", subTotal);

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
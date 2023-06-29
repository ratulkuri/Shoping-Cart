# Ecommerce Website (Course Assignment)

This repository contains the source code for an Ecommerce website's frontend designed using JavaScript ES6. The website allows users to browse products, view their shopping cart, and perform various shopping-related actions.

## [SEE DEMO](https://kkmegashop.netlify.app/)

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)

## Installation

To run the Ecommerce website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ratulkuri/assignment-module-4.git`
2. Navigate to the project directory: `cd assignment-module-4`
3. Open the `index.html` file in your preferred web browser.

## Features

- **[Product Listing](#product):** Displays a list of products with their names, prices, and "Add to Cart" buttons.
- **[Adding Products to Cart](#add-to-cart):** Allows users to add selected products to the shopping cart with desired quantities.
- **[Displaying Cart Items](#render-cart-items):** Shows the added items in the shopping cart, including product name, quantity, individual price, and total amount.
- **[Clearing the Cart](#clear-cart):** Provides a "Remove" button to remove individual cart item and "Clear Cart" button to remove all items from the cart.
- **[Additional Features](#additional-features):** Offers options to increase or decrease the quantity of items in the cart.
- **[Apply Discount](#apply-discount):** Use coupon `OSTAD2023` to get **10%** discount on purchase up to **USD 99**.

## Usage

1. Browse the product list and click on the "Add to Cart" button for the desired products.
2. You can also click on the "Add to Cart" from product details for the desired products along with desired quantity.
3. The added items will be displayed in the shopping cart section along with their details.
4. To clear the cart, click the "Clear Cart" button.
5. Explore additional features such as modifying quantities or applying discounts if available.
6. **Swipe left** to remove Toaster Alert on touch supported device (Experimental)


## Product
***
### **Product Listing :**
```JavaScript
import { rederProductList } from './product.js'

rederProductList(".product-list")  // "id" or "class" of the HTML product list wrapper element to render products | (Default: .product-list)
```
## Shopping Cart
***
### **Add to cart :**

| Options       |    Default     |    Type    |              | Description      |
| ------------- |:--------------:|:----------:|:------------:|----------------  |
| id            |                |  `integer` |  *Required*  | Product ID       |
| qty           |      `1`       |  `integer` |  *Optional*  | Product Quantity |
| cartSelector  | `"#cart-menu"` |  `string`  |  *Optional*  | Selector of the HTML cart menu element to render cart items |

```JavaScript
import { addToCart } from './cart.js'

addToCart({
    id: 1, // Product ID | Required
    qty: 1, // Product Quantity | Optional
    cartSelector: "#cart-menu", // Selector of the HTML cart menu element to render cart items | (Default: #cart-menu)
})
```

### **Render cart items :**

```JavaScript
import { renderCartItems } from './cart.js'

renderCartItems("#cart-menu") // Selector of the HTML cart menu element to render cart items | (Default: #cart-menu)
```

### **Remove individual item from cart :**

    `removeFromCart(productId, cartSlector) // (Default Selector: #cart-menu)`

```JavaScript
import { removeFromCart } from './cart.js'

removeFromCart(1, "#cart-menu")
```

### **Clear Cart :**

    `clearCart(cartSlector) // (Default Selector: #cart-menu)`

```JavaScript
import { clearCart } from './cart.js'

clearCart("#cart-menu")
```

## Additional Features
### **Increase quantity :**

| Options    |     Default     |    Type    |              |        Description       |
| -----------|:---------------:|:----------:|:------------:|--------------------------|
| cart       |  "#cart-menu"   |  `string`  |  *Optional*  | Selector of the HTML cart menu element |
| trigger    | ".increase-qty" |  `string`  |  *Optional*  | Selector of the HTML increase button elements |


```JavaScript
import { increaseCartQty } from './cart.js'

increaseCartQty({
    cart: "#cart-menu",
    trigger: ".increase-qty",
})
```
### **Decrease quantity :**

| Options    |     Default     |    Type    |              |        Description       |
| -----------|:---------------:|:----------:|:------------:|--------------------------|
| cart       |  "#cart-menu"   |  `string`  |  *Optional*  | Selector of the HTML cart menu element |
| trigger    | ".decrease-qty" |  `string`  |  *Optional*  | Selector of the HTML decrease button elements |


```JavaScript
import { decreaseCartQty } from './cart.js'

decreaseCartQty({
    cart: "#cart-menu",
    trigger: ".decrease-qty",
})
```


## Apply Discount

| Options       |    Default   |    Type    |              |        Description       |
| ------------- |:------------:|:----------:|:------------:|--------------------------|
| coupon        |              | `string`   |   *Required* | Coupon code                |
| percentage    |     10       | `number`   |   *Optional* | Discount percentage value. Maximum value is 100  |
| max           |     99       | `number`   |   *Optional* | Maximum price value to discount. |


```JavaScript
import { applyDiscount } from './cart.js'

applyDiscount({
    coupon: "OSTAD2023", // Not case sensetive
    percentage: 10, // percentage value in number
    max: 99 // Maximum price value to discount
})
```


## Toast Alert (Experimental)

| Options       |    Default   |    Type    |              |        Description       |
| ------------- |:------------:|:----------:|:------------:|--------------------------|
| message       |              | `string`   |   *Required* | Alert Message            |
| autoHide      |     true     | `boolean`  |   *Optional* | Hide alert automatically |
| duration      |     5000     | `number`   |   *Optional* | Duration to show message. _Works only if **autoHide** is set to **true**_. |
| swipe         |    false     | `boolean`  |   *Optional* | ***Swipe left*** to hide alert in touch supported devices |
| distance      |     120      | `number`   |   *Optional* | Swiping Distance to hide alert in touch supported devices. _Works only if **swipe** is set to **true**_. |


```JavaScript
import Toast form './toaster.js'

// Success Toast
Toast.success({
    message: "Product added successfylly!",
    autoHide: true,
    duration: 3000,
    swipe: true,
    distance: 120
})

// Warning Toast
Toast.warning({
    message: "Product removed from cart!",
    autoHide: true,
    duration: 3000,
    swipe: true,
    distance: 120
})

// Error Toast
Toast.error({
    message: "Failed to added product!",
    autoHide: true,
    duration: 3000,
    swipe: true,
    distance: 120
})
```
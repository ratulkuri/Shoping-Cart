import { addToCart } from "./cart.js";
import { toggleModal } from "./utilities.js";


const Products = [{
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "/src/assets/img/products/1/thumbnail.jpg",
    "images": ["/src/assets/img/products/1/1.jpg", "/src/assets/img/products/1/2.jpg", "/src/assets/img/products/1/3.jpg", "/src/assets/img/products/1/4.jpg", "/src/assets/img/products/1/thumbnail.jpg"]
}, {
    "id": 2,
    "title": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "rating": 4.44,
    "stock": 34,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "/src/assets/img/products/2/thumbnail.jpg",
    "images": ["/src/assets/img/products/2/1.jpg", "/src/assets/img/products/2/2.jpg", "/src/assets/img/products/2/3.jpg", "/src/assets/img/products/2/thumbnail.jpg"]
}, {
    "id": 3,
    "title": "Samsung Universe 9",
    "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
    "price": 1249,
    "rating": 4.09,
    "stock": 36,
    "brand": "Samsung",
    "category": "smartphones",
    "thumbnail": "/src/assets/img/products/3/thumbnail.jpg",
    "images": ["/src/assets/img/products/3/1.jpg"]
}, {
    "id": 4,
    "title": "OPPOF19",
    "description": "OPPO F19 is officially announced on April 2021.",
    "price": 280,
    "rating": 4.3,
    "stock": 123,
    "brand": "OPPO",
    "category": "smartphones",
    "thumbnail": "/src/assets/img/products/4/thumbnail.jpg",
    "images": ["/src/assets/img/products/4/1.jpg", "/src/assets/img/products/4/2.jpg", "/src/assets/img/products/4/3.jpg", "/src/assets/img/products/4/4.jpg", "/src/assets/img/products/4/thumbnail.jpg"]
}, {
    "id": 5,
    "title": "Huawei P30",
    "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    "price": 499,
    "rating": 4.09,
    "stock": 32,
    "brand": "Huawei",
    "category": "smartphones",
    "thumbnail": "/src/assets/img/products/5/thumbnail.jpg",
    "images": ["/src/assets/img/products/5/1.jpg", "/src/assets/img/products/5/2.jpg", "/src/assets/img/products/5/3.jpg"]
}, {
    "id": 6,
    "title": "MacBook Pro",
    "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
    "price": 1749,
    "rating": 4.57,
    "stock": 83,
    "brand": "Apple",
    "category": "laptops",
    "thumbnail": "/src/assets/img/products/6/thumbnail.png",
    "images": ["/src/assets/img/products/6/1.png", "/src/assets/img/products/6/2.jpg", "/src/assets/img/products/6/3.png", "/src/assets/img/products/6/4.jpg"]
}, {
    "id": 7,
    "title": "Samsung Galaxy Book",
    "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    "price": 1499,
    "rating": 4.25,
    "stock": 50,
    "brand": "Samsung",
    "category": "laptops",
    "thumbnail": "/src/assets/img/products/7/thumbnail.jpg",
    "images": ["/src/assets/img/products/7/1.jpg", "/src/assets/img/products/7/2.jpg", "/src/assets/img/products/7/3.jpg", "/src/assets/img/products/7/thumbnail.jpg"]
}, {
    "id": 8,
    "title": "Microsoft Surface Laptop 4",
    "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    "price": 1499,
    "rating": 4.43,
    "stock": 68,
    "brand": "Microsoft Surface",
    "category": "laptops",
    "thumbnail": "/src/assets/img/products/8/thumbnail.jpg",
    "images": ["/src/assets/img/products/8/1.jpg", "/src/assets/img/products/8/2.jpg", "/src/assets/img/products/8/3.jpg", "/src/assets/img/products/8/4.jpg", "/src/assets/img/products/8/thumbnail.jpg"]
}, {
    "id": 9,
    "title": "Infinix INBOOK",
    "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    "price": 1099,
    "rating": 4.54,
    "stock": 96,
    "brand": "Infinix",
    "category": "laptops",
    "thumbnail": "/src/assets/img/products/9/thumbnail.jpg",
    "images": ["/src/assets/img/products/9/1.jpg", "/src/assets/img/products/9/2.png", "/src/assets/img/products/9/3.png", "/src/assets/img/products/9/4.jpg", "/src/assets/img/products/9/thumbnail.jpg"]
}, {
    "id": 10,
    "title": "HP Pavilion 15-DK1056WM",
    "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    "price": 1099,
    "rating": 4.43,
    "stock": 89,
    "brand": "HP Pavilion",
    "category": "laptops",
    "thumbnail": "/src/assets/img/products/10/thumbnail.jpeg",
    "images": ["/src/assets/img/products/10/1.jpg", "/src/assets/img/products/10/3.jpg", "/src/assets/img/products/10/thumbnail.jpeg"]
}, {
    "id": 11,
    "title": "perfume Oil",
    "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
    "price": 13,
    "rating": 4.26,
    "stock": 65,
    "brand": "Impression of Acqua Di Gio",
    "category": "fragrances",
    "thumbnail": "/src/assets/img/products/11/thumbnail.jpg",
    "images": ["/src/assets/img/products/11/1.jpg", "/src/assets/img/products/11/2.jpg", "/src/assets/img/products/11/3.jpg", "/src/assets/img/products/11/thumbnail.jpg"]
}, {
    "id": 12,
    "title": "Brown Perfume",
    "description": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    "price": 40,
    "rating": 4,
    "stock": 52,
    "brand": "Royal_Mirage",
    "category": "fragrances",
    "thumbnail": "/src/assets/img/products/12/thumbnail.jpg",
    "images": ["/src/assets/img/products/12/1.jpg", "/src/assets/img/products/12/2.jpg", "/src/assets/img/products/12/3.png", "/src/assets/img/products/12/4.jpg", "/src/assets/img/products/12/thumbnail.jpg"]
}, {
    "id": 13,
    "title": "Fog Scent Xpressio Perfume",
    "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
    "price": 13,
    "rating": 4.59,
    "stock": 61,
    "brand": "Fog Scent Xpressio",
    "category": "fragrances",
    "thumbnail": "/src/assets/img/products/13/thumbnail.webp",
    "images": ["/src/assets/img/products/13/1.jpg", "/src/assets/img/products/13/2.png", "/src/assets/img/products/13/3.jpg", "/src/assets/img/products/13/4.jpg", "/src/assets/img/products/13/thumbnail.webp"]
}, {
    "id": 14,
    "title": "Non-Alcoholic Concentrated Perfume Oil",
    "description": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
    "price": 120,
    "rating": 4.21,
    "stock": 114,
    "brand": "Al Munakh",
    "category": "fragrances",
    "thumbnail": "/src/assets/img/products/14/thumbnail.jpg",
    "images": ["/src/assets/img/products/14/1.jpg", "/src/assets/img/products/14/2.jpg", "/src/assets/img/products/14/3.jpg", "/src/assets/img/products/14/thumbnail.jpg"]
}, {
    "id": 15,
    "title": "Eau De Perfume Spray",
    "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
    "price": 30,
    "rating": 4.7,
    "stock": 105,
    "brand": "Lord - Al-Rehab",
    "category": "fragrances",
    "thumbnail": "/src/assets/img/products/15/thumbnail.jpg",
    "images": ["/src/assets/img/products/15/1.jpg", "/src/assets/img/products/15/2.jpg", "/src/assets/img/products/15/3.jpg", "/src/assets/img/products/15/4.jpg", "/src/assets/img/products/15/thumbnail.jpg"]
}, {
    "id": 16,
    "title": "Hyaluronic Acid Serum",
    "description": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
    "price": 19,
    "rating": 4.83,
    "stock": 110,
    "brand": "L'Oreal Paris",
    "category": "skincare",
    "thumbnail": "/src/assets/img/products/16/thumbnail.jpg",
    "images": ["/src/assets/img/products/16/1.png", "/src/assets/img/products/16/2.webp", "/src/assets/img/products/16/3.jpg", "/src/assets/img/products/16/4.jpg", "/src/assets/img/products/16/thumbnail.jpg"]
}, {
    "id": 17,
    "title": "Tree Oil 30ml",
    "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
    "price": 12,
    "rating": 4.52,
    "stock": 78,
    "brand": "Hemani Tea",
    "category": "skincare",
    "thumbnail": "/src/assets/img/products/17/thumbnail.jpg",
    "images": ["/src/assets/img/products/17/1.jpg", "/src/assets/img/products/17/2.jpg", "/src/assets/img/products/17/3.jpg", "/src/assets/img/products/17/thumbnail.jpg"]
}, {
    "id": 18,
    "title": "Oil Free Moisturizer 100ml",
    "description": "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
    "price": 40,
    "rating": 4.56,
    "stock": 88,
    "brand": "Dermive",
    "category": "skincare",
    "thumbnail": "/src/assets/img/products/18/thumbnail.jpg",
    "images": ["/src/assets/img/products/18/1.jpg", "/src/assets/img/products/18/2.jpg", "/src/assets/img/products/18/3.jpg", "/src/assets/img/products/18/4.jpg", "/src/assets/img/products/18/thumbnail.jpg"]
}, {
    "id": 19,
    "title": "Skin Beauty Serum.",
    "description": "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
    "price": 46,
    "rating": 4.42,
    "stock": 54,
    "brand": "ROREC White Rice",
    "category": "skincare",
    "thumbnail": "/src/assets/img/products/19/thumbnail.jpg",
    "images": ["/src/assets/img/products/19/1.jpg", "/src/assets/img/products/19/2.jpg", "/src/assets/img/products/19/3.png", "/src/assets/img/products/19/thumbnail.jpg"]
}, {
    "id": 20,
    "title": "Freckle Treatment Cream- 15gm",
    "description": "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
    "price": 70,
    "rating": 4.06,
    "stock": 140,
    "brand": "Fair & Clear",
    "category": "skincare",
    "thumbnail": "/src/assets/img/products/20/thumbnail.jpg",
    "images": ["/src/assets/img/products/20/1.jpg", "/src/assets/img/products/20/2.jpg", "/src/assets/img/products/20/3.jpg", "/src/assets/img/products/20/4.jpg", "/src/assets/img/products/20/thumbnail.jpg"]
}, {
    "id": 21,
    "title": "- Daal Masoor 500 grams",
    "description": "Fine quality Branded Product Keep in a cool and dry place",
    "price": 20,
    "rating": 4.44,
    "stock": 133,
    "brand": "Saaf & Khaas",
    "category": "groceries",
    "thumbnail": "/src/assets/img/products/21/thumbnail.png",
    "images": ["/src/assets/img/products/21/1.png", "/src/assets/img/products/21/2.jpg", "/src/assets/img/products/21/3.jpg"]
}, {
    "id": 22,
    "title": "Elbow Macaroni - 400 gm",
    "description": "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
    "price": 14,
    "rating": 4.57,
    "stock": 146,
    "brand": "Bake Parlor Big",
    "category": "groceries",
    "thumbnail": "/src/assets/img/products/22/thumbnail.jpg",
    "images": ["/src/assets/img/products/22/1.jpg", "/src/assets/img/products/22/2.jpg", "/src/assets/img/products/22/3.jpg"]
}, {
    "id": 23,
    "title": "Orange Essence Food Flavou",
    "description": "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
    "price": 14,
    "rating": 4.85,
    "stock": 26,
    "brand": "Baking Food Items",
    "category": "groceries",
    "thumbnail": "/src/assets/img/products/23/thumbnail.jpg",
    "images": ["/src/assets/img/products/23/1.jpg", "/src/assets/img/products/23/2.jpg", "/src/assets/img/products/23/3.jpg", "/src/assets/img/products/23/4.jpg", "/src/assets/img/products/23/thumbnail.jpg"]
}, {
    "id": 24,
    "title": "cereals muesli fruit nuts",
    "description": "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
    "price": 46,
    "rating": 4.94,
    "stock": 113,
    "brand": "fauji",
    "category": "groceries",
    "thumbnail": "/src/assets/img/products/24/thumbnail.jpg",
    "images": ["/src/assets/img/products/24/1.jpg", "/src/assets/img/products/24/2.jpg", "/src/assets/img/products/24/3.jpg", "/src/assets/img/products/24/4.jpg", "/src/assets/img/products/24/thumbnail.jpg"]
}, {
    "id": 25,
    "title": "Gulab Powder 50 Gram",
    "description": "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
    "price": 70,
    "rating": 4.87,
    "stock": 47,
    "brand": "Dry Rose",
    "category": "groceries",
    "thumbnail": "/src/assets/img/products/25/thumbnail.jpg",
    "images": ["/src/assets/img/products/25/1.png", "/src/assets/img/products/25/2.jpg", "/src/assets/img/products/25/3.png", "/src/assets/img/products/25/4.jpg", "/src/assets/img/products/25/thumbnail.jpg"]
}, {
    "id": 26,
    "title": "Plant Hanger For Home",
    "description": "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
    "price": 41,
    "rating": 4.08,
    "stock": 131,
    "brand": "Boho Decor",
    "category": "home-decoration",
    "thumbnail": "/src/assets/img/products/26/thumbnail.jpg",
    "images": ["/src/assets/img/products/26/1.jpg", "/src/assets/img/products/26/2.jpg", "/src/assets/img/products/26/3.jpg", "/src/assets/img/products/26/4.jpg", "/src/assets/img/products/26/5.jpg", "/src/assets/img/products/26/thumbnail.jpg"]
}, {
    "id": 27,
    "title": "Flying Wooden Bird",
    "description": "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
    "price": 51,
    "rating": 4.41,
    "stock": 17,
    "brand": "Flying Wooden",
    "category": "home-decoration",
    "thumbnail": "/src/assets/img/products/27/thumbnail.jpg",
    "images": ["/src/assets/img/products/27/1.jpg", "/src/assets/img/products/27/2.jpg", "/src/assets/img/products/27/3.jpg", "/src/assets/img/products/27/4.jpg", "/src/assets/img/products/27/thumbnail.webp"]
}, {
    "id": 28,
    "title": "3D Embellishment Art Lamp",
    "description": "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
    "price": 20,
    "rating": 4.82,
    "stock": 54,
    "brand": "LED Lights",
    "category": "home-decoration",
    "thumbnail": "/src/assets/img/products/28/thumbnail.jpg",
    "images": ["/src/assets/img/products/28/1.jpg", "/src/assets/img/products/28/2.jpg", "/src/assets/img/products/28/3.png", "/src/assets/img/products/28/4.jpg", "/src/assets/img/products/28/thumbnail.jpg"]
}, {
    "id": 29,
    "title": "Handcraft Chinese style",
    "description": "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
    "price": 60,
    "rating": 4.44,
    "stock": 7,
    "brand": "luxury palace",
    "category": "home-decoration",
    "thumbnail": "/src/assets/img/products/29/thumbnail.jpg",
    "images": ["/src/assets/img/products/29/1.jpg", "/src/assets/img/products/29/2.jpg", "/src/assets/img/products/29/3.webp", "/src/assets/img/products/29/4.webp", "/src/assets/img/products/29/thumbnail.webp"]
}, {
    "id": 30,
    "title": "Key Holder",
    "description": "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    "price": 30,
    "rating": 4.92,
    "stock": 54,
    "brand": "Golden",
    "category": "home-decoration",
    "thumbnail": "/src/assets/img/products/30/thumbnail.jpg",
    "images": ["/src/assets/img/products/30/1.jpg", "/src/assets/img/products/30/2.jpg", "/src/assets/img/products/30/3.jpg", "/src/assets/img/products/30/thumbnail.jpg"]
}];


export const rederProductList = (selector) => {
    let productListElm = document.querySelector(selector);

    for(let product of Products) {
        productListElm.innerHTML += `
        <div class="product-item group/item relative">
            <div class="relative">
                <div class="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 border">
                    <img src="${product?.thumbnail}" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                </div>
                <button data-product-id="${product?.id}" data-modal-target="#product-modal" class="quick-view absolute top-0 right-0 bottom-0 left-0 m-auto w-40 h-10 shadow z-1 bg-white hover:bg-indigo-500 hover:text-white hover:ring hover:ring-indigo-200 opacity-0 hover:!opacity-100 rounded px-4 py-2 group-hover/item:opacity-80 backdrop-blur-3xl transition-opacity duration-300"><i class="ti ti-eye"></i> View Details </button>
            </div>
            <div class="mt-4 flex justify-between gap-6">
                <div>
                    <h3 class="text-md line-clamp-1 text-gray-700 font-bold">
                        <a href="#" class="quick-view" data-product-id="${product?.id}" data-modal-target="#product-modal">
                            ${product?.title}
                        </a>
                    </h3>
                    <p class="mt-1 text-sm line-clamp-1 text-gray-500">
                        ${product?.category} > ${product?.brand}
                    </p>
                </div>
                <p class="text-md font-medium text-orange-500">$${product?.price}</p>
            </div>
            <button
                class="add-to-cart block w-full px-3 py-2 bg-slate-200 border border-gray-300 rounded mt-4 hover:!bg-orange-500 hover:!border-orange-500 group-hover/item:bg-orange-400 group-hover/item:border-orange-400 group-hover/item:text-white ease-in-out duration-300"
                data-product-id="${product?.id}"
            >Add To Cart</button>
        </div>
        `
    }

    let addBtnList = productListElm.querySelectorAll(".add-to-cart");



    for (let btn of addBtnList) {
        btn.addEventListener("click", () => {
            let id = parseFloat(btn.getAttribute("data-product-id"));
            if (!!id) {
                addToCart({id, qty: 1});
            }
        })
    }
}

export const getProductById = (productId) => {
    let product =  Products.find(product => product.id === productId);
    if (!!product) {
        return product;
    }
    return null;
}

export const productThmbnailSlider = ({product, duration = 2000}) => {
    // console.log(product?.images);
    if(!!product && !!product.images && product?.images?.length > 0 ) {
        let slider = document.getElementById("product-thumb-slider");
        let slidesWrapper = slider.querySelector(".slides");
        let bulletWrapper = slider.querySelector(".bullets");
        slidesWrapper.innerHTML = `<img alt="${product?.title}" class="slide-item w-full object-cover object-center rounded" src="${product?.images[0]}">`;
        bulletWrapper.innerHTML = "";
        product?.images.map((item, index) => {
            if(item !== product?.thumbnail) {
                bulletWrapper.innerHTML += `
                    <li class="${index === 0 ? "active" : ""} bullet block cursor-pointer w-14 h-14 rounded-lg overflow-hidden border-4" data-thumb-src="${item}">
                        <img class="block w-full h-full object-cover object-center" src="${item}" alt="Thumb ${index + 1}" />
                    </li>`
                // let slides = slider.querySelectorAll(".slide-item");
                // let bullets = slider.querySelectorAll(".bullet");
            }
        })
        bulletWrapper.querySelectorAll(".bullet").forEach((item) => {
            item.addEventListener("click", (e) => {
                bulletWrapper.querySelector(".bullet.active")?.classList.remove("active");
                item.classList.add("active");
                slidesWrapper.querySelector(".slide-item").setAttribute("src", item.dataset?.thumbSrc);
                console.log(e.currentTarget);
            })
        });
        // let counter = 0;
        // let sliderInterval = setInterval(() => {
        //     if (counter + 1 > product?.images?.length) {
        //         counter = 0;
        //     }
        //     slidesWrapper.querySelector(".active")?.classList?.remove("active");
        //     bulletWrapper.querySelector(".active")?.classList?.remove("active");
        //     slides[counter].classList.add("active")
        //     bullets[counter].classList.add("active")
        //     counter++;
        // }, duration);
    } else {
        let slidesWrapper = slider.querySelector(".slides");
        slidesWrapper.innerHTML = `<img alt="Placeholder" class="slide-item w-full object-cover object-center rounded" src="">`;
    }
}

export const productModalInit = () => {
    const togglers = document.querySelectorAll(".quick-view");
    for (let toggler of togglers) {
        // console.log(productID);
        let productID = toggler.getAttribute("data-product-id");
        if(!!productID) {
            toggler.addEventListener("click", (e) => {
                e.preventDefault();
                let product = getProductById(parseFloat(productID));
                document.getElementById("qv-product-brand").innerHTML = product.brand;
                document.getElementById("qv-product-title").innerHTML = product.title;
                document.getElementById("qv-product-description").innerHTML = product.description;
                document.getElementById("qv-product-price").innerHTML = `$${product.price}`;
                document.getElementById("qv-add-to-cart").setAttribute("data-product-id", product.id);
                productThmbnailSlider({product});
                toggleModal({triggerElm: toggler});
            })
            document.querySelector("#product-modal").addEventListener("modal.hide", (e) => {
                // document.getElementById("qv-product-brand").innerHTML = product.brand;
                // document.getElementById("qv-product-title").innerHTML = product.title;
                // document.getElementById("qv-product-description").innerHTML = product.description;
                // document.getElementById("qv-product-price").innerHTML = `$${product.price}`;
                // document.getElementById("qv-add-to-cart").setAttribute("data-product-id", product.id);
                console.log("modal hidden")
            })
        }

    }

    let qvAddToCartBtn = document.getElementById("qv-add-to-cart");
    let qvQtyIncreaseBtn = document.getElementById("qv-increase-qty");
    let qvQtyInput = document.getElementById("qv-qty-input");
    let qvQtyDecreaseBtn = document.getElementById("qv-decrease-qty");

    qvQtyIncreaseBtn.addEventListener("click", () => {
        let qvQtyInputValue = parseFloat(qvQtyInput.value);
        if(!!qvQtyInputValue) {
            qvQtyInput.value = qvQtyInputValue + 1;
        } else {
            qvQtyInput.value = 1;
        }
    })

    qvQtyDecreaseBtn.addEventListener("click", () => {
        let qvQtyInputValue = parseFloat(qvQtyInput.value);
        if(!!qvQtyInputValue && qvQtyInputValue > 1) {
            qvQtyInput.value = qvQtyInputValue - 1;
        }
    })
    qvAddToCartBtn.addEventListener("click", () => {
        let id = parseFloat(qvAddToCartBtn.getAttribute("data-product-id"));
        let qty = parseFloat(document.getElementById("qv-qty-input").value);
        if (!!id) {
            addToCart({id, qty});
        }
    });

    const modalCloseButtons = document.querySelectorAll(".close-modal");
    for (let closeButton of modalCloseButtons) {
        closeButton.addEventListener("click", () =>{
            toggleModal({triggerElm: closeButton});
            document.getElementById("qv-product-brand").innerHTML = "";
            document.getElementById("qv-product-title").innerHTML = "";
            document.getElementById("qv-product-description").innerHTML = "";
            document.getElementById("qv-product-price").innerHTML = `$0`;
            document.getElementById("qv-add-to-cart").setAttribute("data-product-id", "");
            qvQtyInput.value = "1";
            productThmbnailSlider({product: {}});
        })
    }

}


export default Products;
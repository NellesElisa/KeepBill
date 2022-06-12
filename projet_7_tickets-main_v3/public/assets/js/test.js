let products = {
    data: [
        {
            productName: "Regular White T-Shirt",
            category: "Topwear",
            price: 30,
        },
        {
            productName: "Beige Short Skirt",
            category: "Bottomwear",
            price: 49,
        },
        {
            productName: "Sporty SmartWatch",
            category: "Watch",
            price: 99,
        },
        {
            productName: "Basic Knitted Top",
            category: "Topwear",
            price: 29,
        },
        {
            productName: "Black Leather Jacket",
            category: "Jacket",
            price: 129,
        },
        {
            productName: "Stylish Pink Trousers",
            category: "Bottomwear",
            price: 89,
        },
        {
            productName: "Brown Men's Jacket",
            category: "Jacket",
            price: 189,
        },
        {
            productName: "Comfy Gray Pants",
            category: "Bottomwear",
            price: 49,
        },
    ],
};

for (let i of products.data) {
    let card = document.createElement("div");
    card.classList.add("card", i.category, "hide");

    let container = document.createElement("div");
    container.classList.add("container");

    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);

    let price = document.createElement("h6");
    price.classList.add("product-price");
    price.innerText = i.price + " euros";
    container.appendChild(price);

    card.appendChild(container);
    document.getElementById("products").appendChild(card);
}

function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if (value == "all") {
            element.classList.remove("hide");
        } else {
            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    });
}

document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let product = document.querySelectorAll(".product-name");
    let price = document.querySelectorAll(".product-price");
    let cards = document.querySelectorAll(".card");

    // product.forEach((element, index) => {
    //     if (element.innerText.includes(searchInput.toUpperCase())) {
    //         cards[index].classList.remove("hide");
    //     } else {
    //         cards[index].classList.add("hide");
    //     }
    // });

    price.forEach((element, index) => {
        if (element.innerText.includes(searchInput.toUpperCase())) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }
    });
});

window.onload = () => {
    filterProduct("all");
};
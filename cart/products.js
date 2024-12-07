const logged = localStorage.getItem('logged');
if (logged !== 'true') {
    window.location.href = "../login/login.html";
}

// פונקציה לטעינת XML עם async/await
async function fetchXMLData(xmlSource, sourceName) {
    try {
        const response = await fetch(xmlSource);
        const xmlString = await response.text();
        const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");
        const items = xmlDocument.querySelectorAll("Item");

        return Array.from(items).map(item => ({
            source: sourceName,
            ItemCode: item.querySelector("ItemCode")?.textContent || null,
            ItemName: item.querySelector("ItemName")?.textContent || null,
            ManufactureCountry: item.querySelector("ManufactureCountry")?.textContent || null,
            ManufacturerName: item.querySelector("ManufacturerName")?.textContent || "מוצר כללי",
            Quantity: parseFloat(item.querySelector("Quantity")?.textContent) || 0,
            UnitOfMeasure: item.querySelector("UnitOfMeasure")?.textContent || null,
            ItemPrice: parseFloat(item.querySelector("ItemPrice")?.textContent) || 0,
            UnitQty: item.querySelector("UnitQty")?.textContent || 0,
            itemType: item.querySelector("itemType")?.textContent || 0,
        }));
    } catch (error) {
        console.error("Error fetching XML data:", error);
        return [];
    }
}

// פונקציה להוספת מוצר לסל
function addProductToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductInCart = cart.find(item => item.ItemCode === product.ItemCode);

    if (existingProductInCart) {
        existingProductInCart.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alertify.success('! המוצר התווסף לסל');
}

// פונקציה ליצירת אלמנט HTML עבור מוצר
function createProductElement(product) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.dataset.source = product.source;

    productDiv.innerHTML = `
        <h3>${product.ItemName}</h3>
        <p>ארץ ייצור: ${product.ManufactureCountry}</p>
        <p>חברה: ${product.ManufacturerName}</p>
        <p>יחידה: ${product.Quantity} ${product.UnitQty}</p>
        <p>רשת: ${product.itemType}</p>
        <p>מחיר: ${product.ItemPrice} ש"ח</p>
    `;

    // יצירת כפתור בעיצוב מותאם
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn-53";
    addToCartButton.innerHTML = `
        <div class="original" id="add-to-cart">הוסף לסל</div>
        <div class="letters">
            <span>!</span>
            <span>ף</span>
            <span>י</span>
            <span>ס</span>
            <span>ו</span>
            <span>ת</span>
        </div>
    `;

    // הוספת אירוע לחיצה
    addToCartButton.addEventListener("click", () => addProductToCart(product));

    productDiv.appendChild(addToCartButton);
    return productDiv;
}

// פונקציה להצגת מוצרים
function displayProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    products.forEach(product => {
        const productDiv = createProductElement(product);
        container.appendChild(productDiv);
    });
}

// פונקציה לסינון מוצרים
function setupFiltersAndSearch(allProducts) {
    // סינון לפי מקור
    document.getElementById("source-select").addEventListener("change", function () {
        const selectedSource = this.value;
        const filteredProducts = selectedSource === "all"
            ? allProducts
            : allProducts.filter(product => product.source === selectedSource);

        displayProducts(filteredProducts);
    });

    // חיפוש מוצרים
    document.querySelector(".input-text").addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll(".product");

        products.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = productName.includes(searchTerm) ? "block" : "none";
        });
    });
}

// פונקציה להצגת הסל
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const totalPriceContainer = document.getElementById("total-price-container");
    let totalPrice = 0;
    cartContainer.innerHTML = "";

    if (cart.length > 0) {
        cart.forEach((product, index) => {
            const productDivCart = document.createElement("div");
            productDivCart.className = "productInCart";

            const totalPriceProduct = (product.ItemPrice * product.quantity).toFixed(2);
            totalPrice += parseFloat(totalPriceProduct);

            productDivCart.innerHTML = `
                <h3>${product.ItemName || "No Name"}</h3>
                <p><strong>מק"ט:</strong> ${product.ItemCode || "N/A"}</p>
                <p><strong>ארץ ייצור:</strong> ${product.ManufactureCountry || "N/A"}</p>
                <p><strong>מחיר ליחידה:</strong> ${product.ItemPrice.toFixed(2)} ₪</p>
                <p><strong>מחיר כולל:</strong> ${totalPriceProduct} ₪</p>
                <p><strong>כמות:</strong> ${product.quantity}</p>
                <div class="buttonsCart">
                    <button class="remove" data-index="${index}">הסר</button>
                    <button class="decrease">-</button>
                    <button class="increase">+</button>
                </div>
            `;

            cartContainer.appendChild(productDivCart);

            productDivCart.querySelector(".remove").addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                alertify.error('! הוסר');
            });

            productDivCart.querySelector(".decrease").addEventListener("click", () => {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                }
            });

            productDivCart.querySelector(".increase").addEventListener("click", () => {
                product.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });

        totalPriceContainer.innerHTML = `<p class="totalPriceContainer">סה"כ לתשלום: ${totalPrice.toFixed(2)} ₪</p>`;

    } else {
        cartContainer.innerHTML = "<p>הסל ריק.</p>";
        totalPriceContainer.innerHTML = "";
    }
}

// טעינת הנתונים והפעלת המערכת
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [shufersalData, carrefourData] = await Promise.all([
            fetchXMLData("XML-shufersal", "shufersal"),
            fetchXMLData("XML-carrefour", "carrefour"),
        ]);

        const allProducts = [...shufersalData, ...carrefourData];
        displayProducts(allProducts);
        setupFiltersAndSearch(allProducts);
    } catch (error) {
        console.error("שגיאה בטעינת נתוני מוצרים:", error);
    }

    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (cart.length > 0) {
        cart.forEach((product, index) => {
            const productDivCart = document.createElement("div");
            productDivCart.className = "productInCart";

            productDivCart.innerHTML = `
                <h3>${product.ItemName || "No Name"}</h3>
                <p><strong>מק"ט:</strong> ${product.ItemCode || "N/A"}</p>
                <p><strong>ארץ ייצור:</strong> ${product.ManufactureCountry || "N/A"}</p>
                <p><strong>משקל:</strong> ${product.Quantity || "N/A"} ${product.UnitOfMeasure || ""}</p>
                <p><strong>מחיר:</strong> ${product.ItemPrice ? product.ItemPrice.toFixed(2) : "N/A"} ₪</p>
                <p><strong>כמות:</strong> ${product.quantity}</p>
                <button class="remove" data-index="${index}">הסר</button>
                <button class="decrease">-</button>
                <button class="increase">+</button>
            `;

            cartContainer.appendChild(productDivCart);

            productDivCart.querySelector(".remove").addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
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
    } else {
        cartContainer.innerHTML = "<p>הסל ריק.</p>";
    }
}

renderCart();

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

        totalPriceContainer.innerHTML = `<p>סה"כ לתשלום: ${totalPrice.toFixed(2)} ₪</p>`;

    } else {
        cartContainer.innerHTML = "<p>הסל ריק.</p>";
        totalPriceContainer.innerHTML = "";
    }
}

renderCart();

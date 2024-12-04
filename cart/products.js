fetch("XML-products")
    .then(response => response.text())
    .then(xmlString => {
        const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");

        const items = xmlDocument.querySelectorAll("Item");

        const jsonItems = Array.from(items).map(item => {
            return {
                ItemCode: item.querySelector("ItemCode")?.textContent || null,
                ItemName: item.querySelector("ItemName")?.textContent || null,
                ManufactureCountry: item.querySelector("ManufactureCountry")?.textContent || null,
                ManufacturerName: item.querySelector("ManufacturerName")?.textContent || null,
                Quantity: parseFloat(item.querySelector("Quantity")?.textContent) || 0,
                UnitOfMeasure: item.querySelector("UnitOfMeasure")?.textContent || null,
                ItemPrice: parseFloat(item.querySelector("ItemPrice")?.textContent) || 0,
                UnitQty:(item.querySelector("UnitQty")?.textContent) || 0,
            };
        });

        console.log("Converted JSON:", jsonItems);

        const container = document.getElementById("product-container");

        jsonItems.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";

            productDiv.innerHTML = `
                <h3>${product.ItemName}</h3>
                <p>ארץ ייצור: ${product.ManufactureCountry}</p>
                <p>חברה: ${product.ManufacturerName}</p>
                <p>יחידה: ${product.Quantity} ${product.UnitQty}</p>
                <p>מחיר: ${product.ItemPrice} ש"ח</p>
                  `;

            const addToCartButton = document.createElement("button");
            addToCartButton.className = "add-to-cart";
            addToCartButton.textContent = "הוסף לסל";
            productDiv.appendChild(addToCartButton);

            addToCartButton.addEventListener("click", () => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingProduct = cart.find(item => item.ItemCode === product.ItemCode);

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    product.quantity = 1;
                    cart.push(product);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alertify.success('! התווסף לסל');
            });

            container.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error("Error fetching or parsing XML:", error);
        alertify.error('! שגיאה');
    });

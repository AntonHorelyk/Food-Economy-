fetch("XML-products")
    .then(response => response.text())
    .then(xmlString => {
        const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");

        const items = xmlDocument.querySelectorAll("Item");

        const jsonItems = Array.from(items).map(item => ({
            ItemCode: item.querySelector("ItemCode")?.textContent || null,
            ItemName: item.querySelector("ItemName")?.textContent || null,
            ManufactureCountry: item.querySelector("ManufactureCountry")?.textContent || null,
            ManufacturerName: item.querySelector("ManufacturerName")?.textContent || "מוצר כללי",
            Quantity: parseFloat(item.querySelector("Quantity")?.textContent) || 0,
            UnitOfMeasure: item.querySelector("UnitOfMeasure")?.textContent || null,
            ItemPrice: parseFloat(item.querySelector("ItemPrice")?.textContent) || 0,
            UnitQty: item.querySelector("UnitQty")?.textContent || 0,
        }));

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
                const myUploadedList = JSON.parse(localStorage.getItem("myUploadedList")) || [];

                const existingProductInCart = cart.find(item => item.ItemCode === product.ItemCode);
                if (existingProductInCart) {
                    existingProductInCart.quantity += 1;
                } else {
                    product.quantity = 1;
                    cart.push(product);
                }

                const existingProductInUploadedList = myUploadedList.find(item => item.ItemCode === product.ItemCode);
                if (!existingProductInUploadedList) {
                    myUploadedList.push(product);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("myUploadedList", JSON.stringify(myUploadedList));

                alertify.success('! המוצר התווסף לסל');
            });

            container.appendChild(productDiv);
        });

        document.getElementById("search-input").addEventListener("input", function () {
            const searchTerm = this.value;
            const products = document.querySelectorAll(".product");

            products.forEach(product => {
                const productName = product.querySelector("h3").textContent.toLowerCase();

                if (productName.includes(searchTerm)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    })
    .catch(error => {
        console.error("Error fetching or parsing XML:", error);
        alertify.error('שגיאה בהוספה לסל');
    });

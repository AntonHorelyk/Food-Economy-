fetch("XML-products")
    .then(response => response.text()) // Fetch the XML file and read it as text
    .then(xmlString => {
        // Parse the XML string into an XML Document
        const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");

        // Select all <Item> nodes
        const items = xmlDocument.querySelectorAll("Item");

        // Convert the <Item> nodes to a JSON array
        const jsonItems = Array.from(items).map(item => {
            return {
                ItemCode: item.querySelector("ItemCode")?.textContent || null,
                ItemName: item.querySelector("ItemName")?.textContent || null,
                ManufacturerName: item.querySelector("ManufacturerName")?.textContent || null,
                ManufactureCountry: item.querySelector("ManufactureCountry")?.textContent || null,
                Quantity: parseFloat(item.querySelector("Quantity")?.textContent) || null,
                UnitOfMeasure: item.querySelector("UnitOfMeasure")?.textContent || null,
                ItemPrice: parseFloat(item.querySelector("ItemPrice")?.textContent) || null,
            };
        });

        // Log the resulting JSON array
        console.log("Converted JSON:", jsonItems);

        // Get the container where the product divs will be appended
        const container = document.getElementById("product-container");

        // Loop through each product and create a div
        jsonItems.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";

            // Add product details to the div
            productDiv.innerHTML = `
                <h3>${product.ItemName || "No Name"}</h3>
                <p><strong>Item Code:</strong> ${product.ItemCode || "N/A"}</p>
                <p><strong>Manufacturer:</strong> ${product.ManufacturerName || "N/A"}</p>
                <p><strong>Country:</strong> ${product.ManufactureCountry || "N/A"}</p>
                <p><strong>Quantity:</strong> ${product.Quantity || "N/A"} ${product.UnitOfMeasure || ""}</p>
                <p><strong>Price:</strong> ${product.ItemPrice ? product.ItemPrice.toFixed(2) : "N/A"} ₪</p>
            `;

            // Append the product div to the container
            container.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error("Error fetching or parsing XML:", error);
    });

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


const shufersalProducts = [
    {
      PriceUpdateDate: "2015-12-27 00:06",
      ItemCode: "11210000094",
      ItemType: 1,
      ItemName: "רוטב טבסקו 60 מ'ל",
      ManufacturerName: "ניצן",
      ManufactureCountry: "US",
      ManufacturerItemDescription: "רוטב טבסקו",
      UnitQty: "מיליליטרים",
      Quantity: 60.00,
      bIsWeighted: 0,
      UnitOfMeasure: "100 מ'ל" ,
      QtyInPackage: 0,
      ItemPrice: 12.70,
      UnitOfMeasurePrice: 21.17,
      AllowDiscount: 1,
      ItemStatus: 0
    },
    {
      PriceUpdateDate: "2015-12-27 00:06",
      ItemCode: "13495113551",
      ItemType: 1,
      ItemName: "קליק עוגי 75 גרם",
      ManufacturerName: "יוניליוור",
      ManufactureCountry: "IL",
      ManufacturerItemDescription: "קליק עוגי",
      UnitQty: "גרמים",
      Quantity: 75.00,
      bIsWeighted: 0,
      UnitOfMeasure: "100 גרם",
      QtyInPackage: 0,
      ItemPrice: 6.40,
      UnitOfMeasurePrice: 8.53,
      AllowDiscount: 1,
      ItemStatus: 0
    },
   
  ];
// דוגמה למוצרים משופרסל (כמו שהיו מתקבלים מ-API)


// דוגמה לסל קניות אחרון (משתמש שהזין ידנית או ממקור אחר)
const lastCart = [{
PriceUpdateDate: "2015-12-27 00:06",
ItemCode: "11210000094",
ItemType: 1,
ItemName: "רוטב טבסקו 60 מ'ל",
ManufacturerName: "ניצן",
ManufactureCountry: "US",
ManufacturerItemDescription: "רוטב טבסקו",
UnitQty: "מיליליטרים",
Quantity: 60.00,
bIsWeighted: 0,
UnitOfMeasure: "100 מ'ל" ,
QtyInPackage: 0,
ItemPrice: 12.70,
UnitOfMeasurePrice: 21.17,
AllowDiscount: 1,
ItemStatus: 0
},
{
PriceUpdateDate: "2015-12-27 00:06",
ItemCode: "13495113551",
ItemType: 1,
ItemName: "קליק עוגי 75 גרם",
ManufacturerName: "יוניליוור",
ManufactureCountry: "IL",
ManufacturerItemDescription: "קליק עוגי",
UnitQty: "גרמים",
Quantity: 75.00,
bIsWeighted: 0,
UnitOfMeasure: "100 גרם",
QtyInPackage: 0,
ItemPrice: 6.40,
UnitOfMeasurePrice: 8.53,
AllowDiscount: 1,
ItemStatus: 0
},
{
PriceUpdateDate: "2015-12-27 00:06",
ItemCode: "18000701223",
ItemType: 1,
ItemName: "תערובת לעוגת שוקולד500גר",
ManufacturerName: "ג'נרל מילס",
ManufactureCountry: "IL",
ManufacturerItemDescription: "תערובת לעוגת שוקולד500גר",
UnitQty: "גרמים",
Quantity: 500.00,
bIsWeighted: 0,
UnitOfMeasure: "100 גרם",
QtyInPackage: 0,
ItemPrice: 19.70,
UnitOfMeasurePrice: 3.94,
AllowDiscount: 1,
ItemStatus: 0
}]

function populateList(elementId, products) {
    const list = document.getElementById(elementId);
    list.innerHTML = ''; // Clear the existing list

    if (products.length === 0) {
        list.innerHTML = "<li>No products available</li>";
    } else {
        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.ItemName} - מחיר: ₪${product.ItemPrice.toFixed(2)}`;
            list.appendChild(listItem);
        });
    }
}

function getMissingProducts(shufersal, cart) {
    // Comparison based on ItemCode
    return shufersal.filter(
        shufersalProduct => !cart.some(cartProduct => cartProduct.ItemCode === shufersalProduct.ItemCode)
    );
}

// Display the lists
populateList('shufersal-list', shufersalProducts);
populateList('last-cart-list', lastCart);

// Compare and display missing products
const missingProducts = getMissingProducts(shufersalProducts, lastCart);
populateList('missing-products-list', missingProducts);

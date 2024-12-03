
function populateList(elementId, products) {
    const list = document.getElementById(elementId);
    list.innerHTML = ''; 
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = product;
        list.appendChild(listItem);
    });
}

function getMissingProducts(shufersal, cart) {
    return shufersal.filter(product => !cart.includes(product));
}


populateList('shufersal-list', shufersalProducts);
populateList('last-cart-list', lastCart);


const missingProducts = getMissingProducts(shufersalProducts, lastCart);
populateList('missing-products-list', missingProducts);

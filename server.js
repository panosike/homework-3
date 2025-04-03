document.addEventListener('DOMContentLoaded', function () {
    const loadButton = document.getElementById('loadButton');
    const productsContainer = document.getElementById('productsContainer');
    const productsList = document.getElementById('productsList');
    const loadingIndicator = document.getElementById('loadingIndicator');

    loadButton.addEventListener('click', function () {
        loadingIndicator.style.display = 'block';
        fetch('https://dummyjson.com/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display the products on the page
                loadingIndicator.style.display = 'none';
                productsList.innerHTML = '';
                data.products.forEach(product => {
                    const finalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';

                    // Create the product card HTML
                    productCard.innerHTML = `
        <div class="product-title">${product.title}</div>
        <div class="product-details">
            <img src="${product.thumbnail}" alt="${product.title}" class="product-thumbnail">
                <div class="price-info">
                    <div class="price-row">
                        <span>Original Price:</span>
                        <span>$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="price-row">
                        <span>Discount:</span>
                        <span>${product.discountPercentage.toFixed(2)}%</span>
                    </div>
                    <div class="price-row final-price">
                        <span>Final Price:</span>
                        <span>$${finalPrice}</span>
                    </div>
                </div>
        </div>
        `;

                    // Append the product card to the products list
                    productsList.appendChild(productCard);
                });

                productsContainer.style.display = 'block';
            })
            .catch(error => {
                // Display an error message if the fetch fails
                loadingIndicator.style.display = 'none';
                productsList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
                productsContainer.style.display = 'block';
            });
    });
});
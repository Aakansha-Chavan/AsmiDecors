// /public/js/product-show-script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements using the new IDs from product.html
    const sizeSelect = document.getElementById('size-select');
    const productPriceDisplay = document.getElementById('product-price'); // Changed ID
    const whatsappBtn = document.getElementById('whatsapp-btn'); // Changed ID
    const productName = document.getElementById('product-name'); // Get the product name from the H1

    // Only run this code if the necessary elements exist on the page
    if (sizeSelect && productPriceDisplay && whatsappBtn && productName && typeof DECORATION_SIZES !== 'undefined') {

        // Function to populate the size dropdown
        function populateSizeDropdown() {
            sizeSelect.innerHTML = ''; // Clear existing options
            DECORATION_SIZES.forEach(sizeOption => {
                const option = document.createElement('option');
                option.value = sizeOption.price;
                option.dataset.sizeName = sizeOption.size;
                option.textContent = `${sizeOption.size}`; // Only size, no price in dropdown
                sizeSelect.appendChild(option);
            });
        }

        // Function to update price and WhatsApp message
        function updateDisplayAndWhatsAppLink() {
            const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
            const selectedPrice = selectedOption.value;
            const selectedSizeName = selectedOption.dataset.sizeName;

            // Update the price displayed on the page
            productPriceDisplay.textContent = `${selectedPrice}`; // No "Rs." or "₹" prefix here, as it's in the HTML

            // Construct the WhatsApp message text
            // Use the DECORATION_TITLE and WHATSAPP_NUMBER variables passed from EJS
            const messageText = `Hello! I'd like to book:
Decoration: ${DECORATION_TITLE}
Size: ${selectedSizeName}
Price: Rs. ${selectedPrice}
    
---
PLEASE FILL IN YOUR DETAILS BELOW:
My Name: 
My Location: 
My Phone: 
---`;

            // URL encode the message text
            const encodedMessage = encodeURIComponent(messageText);

            // Construct the final WhatsApp URL
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            // Set the WhatsApp button link
            whatsappBtn.href = whatsappUrl;
        }

        // Initial population and update when the page loads
        populateSizeDropdown();
        updateDisplayAndWhatsAppLink();

        // Add event listener for dropdown change (to update displayed price)
        sizeSelect.addEventListener('change', updateDisplayAndWhatsAppLink);

        // Add event listener for WhatsApp booking link click (prevent default is handled by the link itself)
        whatsappBtn.addEventListener('click', (event) => {
            // No need for event.preventDefault() here as the href is already set
            // and window.open is used.
        });
    } else {
        console.error("Show page elements or DECORATION_SIZES not found.");
    }
});
// /public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the elements
    const sizeSelect = document.getElementById('size-select');
    const currentPriceDisplay = document.getElementById('current-price-display');
    const whatsappBookLink = document.getElementById('whatsapp-book-link');

    // Only run this code if the necessary elements exist on the page
    if (sizeSelect && currentPriceDisplay && whatsappBookLink) {
        // 2. Add event listener for dropdown change (to update displayed price)
        sizeSelect.addEventListener('change', () => {
            const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
            const selectedPrice = selectedOption.value; // This is the price
            
            // Update the price displayed on the page
            currentPriceDisplay.textContent = `Rs. ${selectedPrice}`;
        });
    
        // 3. Add event listener for WhatsApp booking link click
        whatsappBookLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
    
            // Get selected size and price for the WhatsApp message
            const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
            const selectedSizeName = selectedOption.dataset.sizeName; // Get the size name (e.g., "3ft")
            const selectedPrice = selectedOption.value; // Get the price (e.g., 4000)
    
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
    
            // Redirect the user to the WhatsApp URL
            window.open(whatsappUrl, '_blank');
        });
    }
});
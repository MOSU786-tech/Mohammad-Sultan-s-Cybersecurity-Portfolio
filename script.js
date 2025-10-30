// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- Image Gallery Logic (Existing Code) ---
    const galleryImages = [
        { src: 'step1.jpg', caption: 'Step 1: Navigating to the platform-tools folder.' },
        { src: 'step7.jpg', caption: 'Step 7: The phone is soft-bricked and in recovery mode.' },
        { src: 'step10-7.jpg', caption: 'Step 10 Part 1: Running Kali NetHunter.' },
        { src: 'step10-9.jpg', caption: 'Step 10 Part 2: Running Kali NetHunter with root access.' },
        { src: 'pc-kex.jpg', caption: 'Final Step: Accessing the full Kali Desktop Experience on a PC via VNC.' }
    ];
    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryCaption = document.getElementById('galleryCaption');
    let currentIndex = 0;
    if (galleryImage && prevBtn && nextBtn && galleryCaption) {
        function showImage(index) {
            if (galleryImages[index] && galleryImages[index].src) {
                galleryImage.src = galleryImages[index].src;
                galleryCaption.textContent = galleryImages[index].caption;
            } else {
                console.error("Image not found at index:", index);
                galleryImage.src = "https://placehold.co/800x600/222/FFF?text=Image+Not+Found"; // Shows a placeholder on error
                galleryCaption.textContent = "Image not found.";
            }
        }
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        });
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        });
        showImage(currentIndex);
    }

    // --- NEW: Light Mode Toggle Logic ---

    // Step 1: Select the theme button
    const themeButton = document.getElementById("theme-button");

    // Step 2: Write the callback function
    const toggleLightMode = () => {
        // This line adds the 'light-mode' class if it's not there,
        // or removes it if it is already there.
        document.body.classList.toggle("light-mode");

        // Bonus: Update button text based on mode
        if (document.body.classList.contains("light-mode")) {
            themeButton.textContent = "Toggle Dark Mode";
        } else {
            themeButton.textContent = "Toggle Light Mode";
        }
    };

    // Step 3: Register a 'click' event listener for the theme button,
    // and tell it to use toggleLightMode as its callback function
    // Ensure the button exists before adding the listener
    if (themeButton) {
        themeButton.addEventListener("click", toggleLightMode);
    }

});


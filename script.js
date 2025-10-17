// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- Image Gallery Logic ---

    // Array has been updated to include the pc-kex.jpg image.
    const galleryImages = [
        { src: 'step1.jpg', caption: 'Step 1: brought the phone in fastboot-mode' },
        { src: 'step7.jpg', caption: 'Step 7: flushed KaliNetHunter-Rooted Version.' },
        { src: 'step10-7.jpg', caption: 'Step 10.7 Part 1: TWRP Backup Confirmation' },
        { src: 'step10-9.jpg', caption: 'Step 10 Part 2: Running Kali NetHunter with root access.' },
        { src: 'pc-kex.jpg', caption: 'Final Step: Accessing the full Kali Desktop Experience on a PC via VNC.' }
    ];

    // Get the HTML elements we need to interact with
    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryCaption = document.getElementById('galleryCaption');

    let currentIndex = 0; // Keeps track of the currently displayed image

    // This function will only run if the gallery elements actually exist on the page
    if (galleryImage && prevBtn && nextBtn && galleryCaption) {

        // Function to display an image and its caption based on an index
        function showImage(index) {
            if (galleryImages[index] && galleryImages[index].src) {
                galleryImage.src = galleryImages[index].src;
                galleryCaption.textContent = galleryImages[index].caption;
            } else {
                console.error("Image not found at index:", index);
                galleryImage.src = ""; // Clear the image source
                galleryCaption.textContent = "Image not found.";
            }
        }

        // Event listener for the "Next" button
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        });

        // Event listener for the "Previous" button
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        });

        // Show the first image when the page loads
        showImage(currentIndex);
    }

});


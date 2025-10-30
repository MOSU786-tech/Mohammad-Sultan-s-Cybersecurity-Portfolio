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
                galleryImage.src = "https://placehold.co/800x600/222/FFF?text=Image+Not+Found";
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

    // --- Light Mode Toggle Logic (Existing Code) ---
    const themeButton = document.getElementById("theme-button");
    const toggleLightMode = () => {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            themeButton.textContent = "Toggle Dark Mode";
        } else {
            themeButton.textContent = "Toggle Light Mode";
        }
    };
    if (themeButton) {
        themeButton.addEventListener("click", toggleLightMode);
    }

    // --- Form Handling Logic ---

    // Step 1: Query for the submit button (Already done in previous version)
    const submitButton = document.getElementById("submit-button");
    const contactForm = document.getElementById("contact-form"); // Get the form itself

    const addMessage = (event) => {
        event.preventDefault(); // Prevents the default form submission which reloads the page

        // Step 2: Get values from the form inputs
        const nameInput = document.getElementById('userName');
        const messageInput = document.getElementById('userMessage');
        // We don't display the email, but you could get it here if needed:
        // const emailInput = document.getElementById('userEmail');

        // Get the actual text values, providing defaults if inputs are somehow missing
        const name = nameInput ? nameInput.value.trim() : 'Anonymous'; // .trim() removes extra whitespace
        const message = messageInput ? messageInput.value.trim() : 'No message.';

        // Basic check: Make sure name and message aren't empty
        if (!name || !message) {
            alert('Please fill out both Name and Message fields.'); // Use a more user-friendly notification in a real app
            return; // Stop the function if fields are empty
        }

        // Find the message log container
        const messageLog = document.querySelector(".message-log");

        // Create a new paragraph element for the message
        const newMessage = document.createElement("p");

        // Set its text content using the captured name and message
        newMessage.textContent = `💬 From ${name}: ${message}`; // Template literal for easy formatting

        // Remove the "Still Waiting!!!" placeholder if it exists
        const placeholder = messageLog.querySelector("p em");
        if (placeholder) {
            placeholder.remove();
        }

        // Add the new message to the log
        messageLog.appendChild(newMessage);

        // Clear the form fields after successful submission
        if(contactForm) {
            contactForm.reset();
        }
    };

    // Step 3: Add event listener to the submit button (Already done in previous version)
    // Note: We listen on the FORM's 'submit' event, which is better practice than listening on the button's 'click'
    if (contactForm) {
         // Instead of listening to the button click, listen to the form's submit event
        contactForm.addEventListener("submit", addMessage);
    }
     // Clean up: Remove the old button click listener if it exists
     // (If you updated from the previous script version, this ensures no double submissions)
     if (submitButton) {
        // Find if the listener was previously attached and remove it
        // Note: For simplicity here, we assume the previous script might have added it.
        // A more robust solution involves managing listeners more carefully.
        // submitButton.removeEventListener("click", addMessage); // You might not need this line depending on previous code
     }


});

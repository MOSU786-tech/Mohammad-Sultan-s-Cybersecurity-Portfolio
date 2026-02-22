const setupGallery = () => {
    // --- Image Gallery Logic ---
 const galleryImages = [
        { src: 'step1.jpg', caption: 'Step 1: Navigating to the platform-tools folder.' },
        { src: 'step7.jpg', caption: 'Step 7: The phone is soft-bricked and in recovery mode.' },
        { src: 'step10-7.jpg', caption: 'Step 10 Part 1: Running Kali NetHunter.' },
        { src: 'step10-9.jpg', caption: 'Step 10 Part 2: Running Kali NetHunter with root access.' },
        { src: 'pc-kex.jpg', caption: 'Final Step: Accessing the full Kali Desktop Experience on a PC via VNC.' }
    ]

    // --- Image Gallery Logic (Existing Code) ---
   
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
    
    // 1. This closes the "if" statement
}; // 📦 2. This completely closes the setupGallery box!

    const setupLightMode = () => {
// --- Light Mode Toggle Logic (Existing Code) ---

    const themeButton = document.getElementById("theme-button");
    const modal = document.getElementById("success-modal");
const reduceMotionBtn = document.getElementById("reduce-motion-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

let motionEnabled = true;
let intervalId = null;

    // --- NEW: Step 5-A Animation Variables ---
    const modalImage = document.getElementById("modal-image");
    let rotateFactor = 0;

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
    }
const setupContactForm = () => {
    // All the form and modal code will go here!
        // --- NEW: Stretch Goal (Step 4) - Initialize Counter ---
    // Start count at 3 to match the default messages in the HTML
    let messageCount = 3;
    let defaultMessagesRemoved = false; // Flag to track if we've removed the defaults

    // --- Form Handling Logic (Existing Code) ---
    const contactForm = document.getElementById("contact-form"); // Get the form itself

    const addMessage = (person) => { // UPDATED: Now accepts the 'person' object

    // UPDATED: Get values directly from the person object
    const name = person.name ? person.name : 'Anonymous';
    const message = person.message ? person.message : 'No message.';

    const messageLog = document.querySelector(".message-log");
    const newMessage = document.createElement("p");
    newMessage.textContent = `💬 From ${name}: ${message}`;

    // --- Logic to remove default messages ---
    if (!defaultMessagesRemoved) {
        const defaultMessages = messageLog.querySelectorAll(".default-message");
        defaultMessages.forEach(msg => msg.remove());
        defaultMessagesRemoved = true; 
    }

    messageLog.appendChild(newMessage);
    
    // --- Update Counter ---
    messageCount = messageCount + 1; 
    const countElement = document.getElementById("message-count");
    if (countElement) {
        countElement.textContent = "Total Messages: " + messageCount; 
    }
};
// --- NEW: Step 5-A Animation Function ---
    const animateImage = () => {
// Use the ternary operator to flip the rotation
// If rotateFactor is 0, set it to -10. Otherwise, set it to 0.
   rotateFactor = rotateFactor === 0 ? -10 : 0;

    // Apply the rotation style to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};
// --- End of new function ---

// --- NEW: Step 7 reduceMotion Function ---
const reduceMotion = () => {
    // Toggle the motion setting
    motionEnabled = !motionEnabled;
    
    if (motionEnabled) {
        reduceMotionBtn.textContent = "Reduce Motion";
        // Re-enable smooth scrolling
        document.documentElement.style.scrollBehavior = "smooth";
    } else {
        reduceMotionBtn.textContent = "Enable Motion";
        // Disable smooth scrolling
        document.documentElement.style.scrollBehavior = "auto";
    }
};
// --- End of new function ---

// --- Function to show the modal (UPDATED) ---
const toggleModal = (person) => {
    const modalText = document.getElementById("modal-text");
    modalText.textContent = `Thanks, ${person.name}! Your message has been received.`;

    modal.style.display = "flex";

    // FIX: Stop any previous animation before starting a new one
    clearInterval(intervalId);

    // Only start the animation if motion is enabled
    if (motionEnabled) {
        intervalId = setInterval(animateImage, 500);
    }

    setTimeout(() => {
        clearInterval(intervalId);
        modal.style.display = "none";
    }, 5000);
};
    // --- Form Validation ---
    
  const validateForm = (event) => {
    event.preventDefault(); // Stop the form from submitting

    let containsErrors = false;
    var contactInputs = document.getElementById("contact-form").elements;

    // --- STEP 1-A: Create the person object using the elements array ---
    // [0] is Name, [1] is Email, [2] is Message
    let person = {
        name: contactInputs[0].value,
        email: contactInputs[1].value,
        message: contactInputs[2].value
    };

    // Get error span elements so we can show messages
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    // --- Refactored Validation using the 'person' object ---
    
    // 1. Validate Name
    if (person.name.length < 2) {
        containsErrors = true;
        contactInputs[0].classList.add("error");
        nameError.textContent = "Name must be at least 2 characters.";
    } else {
        contactInputs[0].classList.remove("error");
        nameError.textContent = "";
    }

    // 2. Validate Email (using person.email)
    if (!person.email.includes("@")) {
        containsErrors = true;
        contactInputs[1].classList.add("error");
        emailError.textContent = "Please enter a valid email address.";
    } else if (person.email.length < 2) {
        containsErrors = true;
        contactInputs[1].classList.add("error");
        emailError.textContent = "Email is too short.";
    } else {
        contactInputs[1].classList.remove("error");
        emailError.textContent = "";
    }

    // 3. Validate Message
    if (person.message.length < 2) {
        containsErrors = true;
        contactInputs[2].classList.add("error");
        messageError.textContent = "Message must be at least 2 characters.";
    } else {
        contactInputs[2].classList.remove("error");
        messageError.textContent = "";
    }

    // If no errors, pass the person object to addMessage
    if (containsErrors === false) {
        addMessage(person); // UPDATED: Passing the object

// --- NEW: Call toggleModal ---
            toggleModal(person);
            // --- End of new call ---

            // Clear inputs using the array
            contactInputs[0].value = "";
            contactInputs[1].value = "";
            contactInputs[2].value = "";
        }
    }
    // We are listening for the "click" event on the button itself.

    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
        submitButton.addEventListener("click", validateForm);
    }

    // --- NEW: Step 7 Event Listener ---
    if (reduceMotionBtn) {
        reduceMotionBtn.addEventListener("click", reduceMotion);
    }

    // --- NEW: Step 6 Event Listener ---
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            // Stop the animation
            clearInterval(intervalId);
            // Hide the modal immediately
            modal.style.display = "none";
        });
    }
 };
 
 // Wait for the HTML document to be fully loaded before running the script
 
document.addEventListener('DOMContentLoaded', function() {

setupGallery(); // 🟢 This is the "start button" that runs the Image Gallery
setupLightMode (); // 🟢 This is the "start button" that runs ToggleModeLight!
setupContactForm();// 🟢 This is the "start button" that runs the ContactFrom Modal and the rest!

    }); 
// <-- This is the end of your file 

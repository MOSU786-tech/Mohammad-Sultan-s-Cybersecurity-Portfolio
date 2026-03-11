/* ============================================================
   JAVASCRIPT BASICS GUIDE FOR PORTFOLIO
   ============================================================ */

/* ============================================================
   IMAGE GALLERY SETUP: Initialize image carousel functionality
   ============================================================ */

/* CONST: Declares a constant variable (cannot be changed later) */
/* ARROW FUNCTION: () => { } is modern JavaScript syntax */
const setupGallery = () => {
    /* --- Array of gallery images and captions --- */
    /* Array: [ ] holds multiple items in order */
    /* Object: { } holds key-value pairs */
    const galleryImages = [
        { src: 'step1.jpg', caption: 'Step 1: Navigating to the platform-tools folder.' },
        { src: 'step7.jpg', caption: 'Step 7: The phone is soft-bricked and in recovery mode.' },
        { src: 'step10-7.jpg', caption: 'Step 10 Part 1: Running Kali NetHunter.' },
        { src: 'step10-9.jpg', caption: 'Step 10 Part 2: Running Kali NetHunter with root access.' },
        { src: 'pc-kex.jpg', caption: 'Final Step: Accessing the full Kali Desktop Experience on a PC via VNC.' }
    ]

    /* --- Select DOM elements by ID --- */
    /* document: Global object that represents the HTML page */
    /* getElementById(): Finds element with specific ID attribute */
    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryCaption = document.getElementById('galleryCaption');
    const galleryAnnounce = document.getElementById('galleryAnnounce');  /* For screen readers */
    
    /* LET: Variable that can change, has block scope */
    let currentIndex = 0;  /* Tracks which image is displayed */

    /* IF statement: Only runs code if condition is true */
    if (galleryImage && prevBtn && nextBtn && galleryCaption) {
        
        /* FUNCTION: Reusable block of code */
        function showImage(index) {
            /* Check if image exists at this index */
            if (galleryImages[index] && galleryImages[index].src) {
                /* Update image source and caption text */
                galleryImage.src = galleryImages[index].src;
                galleryCaption.textContent = galleryImages[index].caption;
                
                /* IMPROVEMENT: Announce to screen readers */
                if (galleryAnnounce) {
                    galleryAnnounce.textContent = `Image ${index + 1} of ${galleryImages.length}: ${galleryImages[index].caption}`;
                }
                
                /* Add subtle animation on image change */
                galleryImage.style.opacity = '0.8';
                setTimeout(() => {
                    galleryImage.style.opacity = '1';
                }, 50);
            } else {
                /* Fallback if image not found */
                console.error("Image not found at index:", index);
                galleryImage.src = "https://placehold.co/800x600/222/FFF?text=Image+Not+Found";
                galleryCaption.textContent = "Image not found.";
            }
        }
        
        /* addEventListener: Listens for user interactions */
        /* 'click': Triggers when user clicks element */
        /* FUNCTION: Anonymous function runs when event occurs */
        nextBtn.addEventListener('click', function() {
            /* Modulo operator (%): Gets remainder after division */
            /* This loops index back to 0 when reaching end of array */
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);  /* Display new image */
        });
        
        /* Previous button: Goes backwards through images */
        prevBtn.addEventListener('click', function() {
            /* +galleryImages.length: Prevents negative index numbers */
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        });
        
        /* Display first image on page load */
        showImage(currentIndex);
    }
    
    /* End of setupGallery function */
};


/* ============================================================
   LIGHT MODE SETUP: Initialize theme toggle functionality
   ============================================================ */

const setupLightMode = () => {
    /* --- Select elements needed for light mode toggle --- */
    const themeButton = document.getElementById("theme-button");
    const modal = document.getElementById("success-modal");
    const reduceMotionBtn = document.getElementById("reduce-motion-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");

    /* Variables to track state (whether motion is on/off) */
    let motionEnabled = true;  /* Boolean: true or false */
    let intervalId = null;  /* Holds ID for clearing interval later */

    /* --- Animation Variables for modal image --- */
    const modalImage = document.getElementById("modal-image");
    let rotateFactor = 0;  /* Current rotation angle in degrees */

    /* --- IMPROVEMENT: Load saved theme preference from localStorage --- */
    /* localStorage: Browser storage that persists across page refresh */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        /* If user previously selected light mode, apply it immediately */
        document.body.classList.add('light-mode');
        if (themeButton) {
            themeButton.textContent = "Toggle Dark Mode";
        }
    }

    /* --- Function to toggle light/dark mode --- */
    const toggleLightMode = () => {
        /* classList: Manages CSS classes on element */
        /* toggle(): Adds class if not present, removes if present */
        document.body.classList.toggle("light-mode");
        
        /* Check if light mode is now enabled */
        if (document.body.classList.contains("light-mode")) {
            /* Conditional: if true, update button text */
            themeButton.textContent = "Toggle Dark Mode";
            /* IMPROVEMENT: Save preference to localStorage */
            /* This remembers the setting when they reload the page */
            localStorage.setItem('theme', 'light');
        } else {
            /* Otherwise, light mode is off */
            themeButton.textContent = "Toggle Light Mode";
            /* Save dark mode preference */
            localStorage.setItem('theme', 'dark');
        }
    };

    /* --- Add click event to theme toggle button --- */
    if (themeButton) {
        themeButton.addEventListener("click", toggleLightMode);
    }
};
/* ============================================================
   CONTACT FORM SETUP: Initialize form validation & messaging
   ============================================================ */

const setupContactForm = () => {
    /* --- Counter for total messages received --- */
    let messageCount = 3;  /* Start at 3 (default messages already shown) */
    let defaultMessagesRemoved = false;  /* Track if defaults have been cleared */

    /* --- Get form element --- */
    const contactForm = document.getElementById("contact-form");

    /* --- Function to add new message to log --- */
    /* PARAMETER: person object with name, email, and message */
    const addMessage = (person) => {
        /* TERNARY OPERATOR: (condition ? true : false) */
        /* If person.name exists, use it; otherwise use 'Anonymous' */
        const name = person.name ? person.name : 'Anonymous';
        const message = person.message ? person.message : 'No message.';

        /* Select the message log container */
        const messageLog = document.querySelector(".message-log");
        
        /* Create new paragraph element */
        const newMessage = document.createElement("p");
        
        /* Set text content (template literal uses backticks and ${}) */
        newMessage.textContent = `💬 From ${name}: ${message}`;

        /* --- Remove default placeholder messages on first real submission --- */
        if (!defaultMessagesRemoved) {
            /* querySelectorAll: Finds ALL elements matching selector */
            const defaultMessages = messageLog.querySelectorAll(".default-message");
            
            /* forEach: Loop through each element */
            defaultMessages.forEach(msg => msg.remove());  /* Remove each one */
            defaultMessagesRemoved = true;  /* Mark as done */
        }

        /* Append new message to log */
        messageLog.appendChild(newMessage);
        
        /* --- Update message counter --- */
        messageCount = messageCount + 1;  /* Increment count */
        const countElement = document.getElementById("message-count");
        if (countElement) {
            /* String concatenation: Add message count display */
            countElement.textContent = "Total Messages: " + messageCount;
        }
    };

    /* --- Image animation function --- */
    const animateImage = () => {
        /* TERNARY: If rotateFactor is 0, set to -10; else set to 0 */
        /* This creates a rocking animation effect */
        rotateFactor = rotateFactor === 0 ? -10 : 0;

        /* Apply CSS transform to rotate image */
        /* Template literal with ${}: Insert variable into string */
        modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    };

    /* --- Function to toggle motion preference --- */
    const reduceMotion = () => {
        /* Toggle boolean: flip between true and false */
        motionEnabled = !motionEnabled;
        
        if (motionEnabled) {
            reduceMotionBtn.textContent = "Reduce Motion";
            /* CSS property: smooth scrolling enabled */
            document.documentElement.style.scrollBehavior = "smooth";
        } else {
            reduceMotionBtn.textContent = "Enable Motion";
            /* Instant scrolling (no animation) */
            document.documentElement.style.scrollBehavior = "auto";
        }
    };

    /* --- Function to show success modal popup --- */
    const toggleModal = (person) => {
        /* Get the modal text element */
        const modalText = document.getElementById("modal-text");
        
        /* Update text with user's name */
        modalText.textContent = `Thanks, ${person.name}! Your message has been received.`;

        /* Display modal: flex = center it using flexbox */
        modal.style.display = "flex";

        /* Clear any previous animation interval */
        clearInterval(intervalId);

        /* Only animate if motion is enabled */
        if (motionEnabled) {
            /* setInterval: Runs function repeatedly every 500ms */
            intervalId = setInterval(animateImage, 500);
        }

        /* Auto-close modal after 5 seconds */
        /* setTimeout: Runs function once after delay (in milliseconds) */
        setTimeout(() => {
            clearInterval(intervalId);  /* Stop animation */
            modal.style.display = "none";  /* Hide modal */
        }, 5000);  /* 5000ms = 5 seconds */
    };

    /* --- Form Validation Function --- */
    const validateForm = (event) => {
        /* preventDefault: Stops default form submission behavior */
        event.preventDefault();

        /* Flag to track if any errors found */
        let containsErrors = false;
        
        /* Get all form input elements (array-like) */
        var contactInputs = document.getElementById("contact-form").elements;
        /* [0] = name input, [1] = email input, [2] = message textarea */

        /* --- Create object from form inputs --- */
        let person = {
            name: contactInputs[0].value,    /* Get name value */
            email: contactInputs[1].value,   /* Get email value */
            message: contactInputs[2].value  /* Get message value */
        };

        /* Get error message containers */
        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const messageError = document.getElementById("message-error");

        /* --- VALIDATION 1: Check name length --- */
        if (person.name.length < 2) {
            containsErrors = true;
            
            /* Add error class to change input styling (red border) */
            contactInputs[0].classList.add("error");
            /* Display error message */
            nameError.textContent = "Name must be at least 2 characters.";
        } else {
            /* No error: remove error class and clear message */
            contactInputs[0].classList.remove("error");
            nameError.textContent = "";
        }

        /* --- VALIDATION 2: Check email format --- */
        if (!person.email.includes("@")) {
            /* includes(): Check if string contains @symbol */
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

        /* --- VALIDATION 3: Check message length --- */
        if (person.message.length < 2) {
            containsErrors = true;
            contactInputs[2].classList.add("error");
            messageError.textContent = "Message must be at least 2 characters.";
        } else {
            contactInputs[2].classList.remove("error");
            messageError.textContent = "";
        }

        /* --- If form is valid, process submission --- */
        if (containsErrors === false) {
            /* IMPROVEMENT: Show loading state on button */
            submitButton.classList.add("loading");
            submitButton.disabled = true;  /* Prevent duplicate submissions */
            submitButton.textContent = "Sending...";
            
            /* Simulate sending delay (remove if you add real backend) */
            setTimeout(() => {
                addMessage(person);  /* Add message to log */
                toggleModal(person);  /* Show success modal */

                /* Clear form inputs for next submission */
                contactInputs[0].value = "";
                contactInputs[1].value = "";
                contactInputs[2].value = "";
                
                /* IMPROVEMENT: Reset button state after successful submission */
                submitButton.classList.remove("loading");
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }, 800);  /* 800ms delay simulates network request */
        }
    };

    /* --- Add click listener to submit button --- */
    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
        /* When user clicks submit, run validateForm */
        submitButton.addEventListener("click", validateForm);
        
        /* IMPROVEMENT: Also allow Enter key to submit form */
        contactForm.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && !submitButton.disabled) {
                validateForm(event);
            }
        });
    }

    /* --- Add listener to reduce motion button --- */
    if (reduceMotionBtn) {
        reduceMotionBtn.addEventListener("click", reduceMotion);
    }

    /* --- Add listener to close modal button --- */
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            /* Arrow function: Shorthand for anonymous function */
            clearInterval(intervalId);  /* Stop image animation */
            modal.style.display = "none";  /* Close modal */
        });
    }
};

/* ============================================================
   MAIN EXECUTION: Run functions when page loads
   ============================================================ */

/* DOMContentLoaded: Event fires when all HTML has been parsed */
/* This ensures all DOM elements exist before we try to use them */
document.addEventListener('DOMContentLoaded', function() {

    /* --- Initialize all features --- */
    
    /* 🟢 START: Initialize image gallery functionality */
    setupGallery();
    
    /* 🟢 START: Initialize light/dark mode toggle */
    setupLightMode();
    
    /* 🟢 START: Initialize contact form and modal */
    setupContactForm();

    /* Event listener complete - all functions now waiting for user interaction */
}); 

/* ============================================================
   FILE STRUCTURE SUMMARY
   ============================================================
   
   1. GALLERY: Displays images with prev/next navigation
   2. LIGHT MODE: Toggles between dark and light themes
   3. CONTACT FORM: Validates input and shows success modal
   4. MOTION CONTROL: Allows users to disable animations
   
   All functions start when user interacts:
   - Gallery: Click prev/next buttons
   - Light Mode: Click toggle button
   - Form: Fill fields and click submit
   
   ============================================================ */ 

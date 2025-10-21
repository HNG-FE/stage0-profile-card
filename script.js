// Display current time in milliseconds and update every second
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage"); // Your success <p>
  const allInputs = form.querySelectorAll("input, textarea");

  // Utility function to manage error states (using the CSS classes you provided)
  const toggleError = (inputElement, isValid, errorMessageElement) => {
    if (isValid) {
      // Remove error class and hide error message
      inputElement.classList.remove("invalid");
      errorMessageElement.setAttribute("hidden", "true");
      inputElement.removeAttribute("aria-invalid");
    } else {
      // Add error class and show error message
      inputElement.classList.add("invalid");
      errorMessageElement.removeAttribute("hidden");
      inputElement.setAttribute("aria-invalid", "true");
    }
  };

  // Validation functions
  const validateName = (name) => name.trim().length > 0;
  const validateSubject = (subject) => subject.trim().length > 0;
  const validateMessage = (message) => message.trim().length >= 10;
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to run validation on a single field
  const validateField = (input) => {
    const id = input.id;
    const value = input.value;
    const errorElement = document.getElementById(`error-${id}`);
    let isValid = true;

    // Check which field it is and apply the appropriate validation logic
    if (id === "name") {
      isValid = validateName(value);
    } else if (id === "email") {
      isValid = validateEmail(value);
    } else if (id === "subject") {
      isValid = validateSubject(value);
    } else if (id === "message") {
      isValid = validateMessage(value);
    }

    // Apply visual and accessibility feedback
    toggleError(input, isValid, errorElement);
    return isValid;
  };

  // Main form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop the default page reload
    successMessage.setAttribute("hidden", "true"); // Hide success message

    let isFormValid = true;

    // Run validation on all fields
    allInputs.forEach((input) => {
      // If any single validation fails, the whole form is invalid
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Success Logic
      console.log("Form Data Submitted Successfully!");

      // Show the success message (which has id="successMessage")
      successMessage.removeAttribute("hidden");

      // Clear the form
      form.reset();

      // Optional: Hide success message after a few seconds
      setTimeout(() => {
        successMessage.setAttribute("hidden", "true");
      }, 5000);
    } else {
      // Error Logic
      // Scroll to the first invalid field for better user experience
      const firstInvalid = document.querySelector(".invalid");
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  // Optional: Live validation on blur (when user clicks out of a field)
  allInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      // Only validate if the field has content (to avoid showing errors immediately on load)
      //   if (input.value.trim() !== "") {
      //     validateField(input);
      //   }
      validateField(input);
    });
  });
});

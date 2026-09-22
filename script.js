const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
// =========================================
// LIGHT MODE / DARK MODE TOGGLE
// =========================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

// Apply the selected theme
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (themeToggle && themeIcon) {
    const isLightMode = theme === "light";

    themeIcon.textContent = isLightMode ? "☾" : "☀";

    themeToggle.setAttribute(
      "aria-label",
      isLightMode
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(isLightMode)
    );
  }
}

// Get the saved theme
const savedTheme = localStorage.getItem("theme");

// Use the saved theme, or default to light mode.
const currentTheme = savedTheme || "light";

applyTheme(currentTheme);

// Toggle the theme when the button is clicked
themeToggle?.addEventListener("click", () => {
  const activeTheme =
    document.documentElement.getAttribute("data-theme");

  const newTheme = activeTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);

  // Remember the user's choice
  localStorage.setItem("theme", newTheme);
});

/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const formStatus = document.getElementById("formStatus");

  const fields = [
    {
      field: fullName,
      errorId: "fullNameError",
      validate: (value) => {
        if (value.trim() === "") {
          return "Please enter your full name.";
        }

        if (value.trim().length < 2) {
          return "Your name must contain at least 2 characters.";
        }

        return "";
      }
    },
    {
      field: email,
      errorId: "emailError",
      validate: (value) => {
        if (value.trim() === "") {
          return "Please enter your email address.";
        }

        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value.trim())) {
          return "Please enter a valid email address.";
        }

        return "";
      }
    },
    {
      field: subject,
      errorId: "subjectError",
      validate: (value) => {
        if (value.trim() === "") {
          return "Please select a subject.";
        }

        return "";
      }
    },
    {
      field: message,
      errorId: "messageError",
      validate: (value) => {
        if (value.trim() === "") {
          return "Please enter your message.";
        }

        if (value.trim().length < 10) {
          return "Your message must contain at least 10 characters.";
        }

        return "";
      }
    }
  ];

  function showError(field, errorId, message) {
    const errorElement = document.getElementById(errorId);

    errorElement.textContent = message;
    field.classList.toggle("invalid", Boolean(message));

    field.setAttribute(
      "aria-invalid",
      message ? "true" : "false"
    );

    field.setAttribute("aria-describedby", errorId);
  }

  function validateField(item) {
    const errorMessage = item.validate(item.field.value);

    showError(
      item.field,
      item.errorId,
      errorMessage
    );

    return errorMessage === "";
  }

  // Validate fields when the user leaves them
  fields.forEach((item) => {
    item.field.addEventListener("blur", () => {
      validateField(item);
    });

    // Remove the error when the user corrects the field
    item.field.addEventListener("input", () => {
      validateField(item);
    });
  });

  // Validate the complete form
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.textContent = "";
    formStatus.className = "form-status";

    const formIsValid = fields.every((item) => {
      return validateField(item);
    });

    if (!formIsValid) {
      formStatus.textContent =
        "Please correct the highlighted fields.";

      formStatus.classList.add("failure");

      const firstInvalidField = fields.find((item) => {
        return item.field.classList.contains("invalid");
      });

      if (firstInvalidField) {
        firstInvalidField.field.focus();
      }

      return;
    }

    /*
      The form is currently validated locally.
      No message is sent to an email service yet.
    */

    formStatus.textContent =
      "Your form has been validated successfully. Message delivery is not connected yet.";

    formStatus.classList.add("success");

    contactForm.reset();

    fields.forEach((item) => {
      showError(item.field, item.errorId, "");
    });
  });
}

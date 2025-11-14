// ======= Toast Notification Utility =======
function showToast(message) {
  const existingToast = document.querySelector(".toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Show fade-out after 2.5s
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500); // Remove after fade-out duration
  }, 2500);
}

// ======= Local (In-Memory) Storage =======
window.appStorage = window.appStorage || {};

// For persistent storage (e.g., use localStorage for persistence across page reloads)
function setUser(userData) {
  // Use localStorage for persistence across page reloads
  localStorage.setItem("gymgeniusUser", JSON.stringify(userData));
  window.appStorage.gymgeniusUser = userData; // In-memory copy
}

function getUser() {
  // Check localStorage if the user is set
  const storedUser = localStorage.getItem("gymgeniusUser");
  return storedUser ? JSON.parse(storedUser) : window.appStorage.gymgeniusUser || null;
}

// ======= Greet Logged-In User =======
function greetUser() {
  const user = getUser();
  if (user && user.username) {
    const userNameElements = document.querySelectorAll("#userName, #profileName");
    userNameElements.forEach(span => {
      span.textContent = user.username;
    });
  }
}

// ======= Navigation & Hamburger Logic =======
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Ensure hamburger and navLinks exist before attaching event listeners
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active"); // Animate hamburger to “X”
    });

    // Close menu when a link is clicked
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  // Call greetUser after DOM is fully loaded
  greetUser();
});

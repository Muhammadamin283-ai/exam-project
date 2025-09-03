// DOM Elements
const body = document.body;
const navbar = document.querySelector(".navbar");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navbarNav = document.querySelector(".navbar-nav");

// Dark Mode Toggle
function createDarkModeToggle() {
  const toggle = document.createElement("button");
  toggle.className = "dark-mode-toggle";
  toggle.innerHTML = "🌙";
  toggle.setAttribute("aria-label", "Toggle dark mode");
  document.body.appendChild(toggle);

  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    body.classList.add("dark-mode");
    toggle.innerHTML = "☀️";
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    toggle.innerHTML = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
  });
}

// Mobile Menu
function initMobileMenu() {
  if (mobileMenuToggle && navbarNav) {
    mobileMenuToggle.addEventListener("click", () => {
      navbarNav.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navbarNav.classList.contains("active")) {
          navbarNav.classList.remove("active");
          mobileMenuToggle.classList.remove("active");
        }
      }
    });
  });
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .management-text, .support-text, .collaboration-text, .strategy-card, .pricing-card, .testimonial-card"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// Form Validation (if forms are added)
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (isValid) {
        // Handle form submission
        console.log("Form submitted successfully");
        showNotification("Message sent successfully!", "success");
      } else {
        showNotification("Please fill in all required fields.", "error");
      }
    });
  });
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "16px 24px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    backgroundColor:
      type === "success" ? "#00D4AA" : type === "error" ? "#FF6B6B" : "#6C5CE7",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Loading Screen
function initLoadingScreen() {
  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loading.style.opacity = "0";
      setTimeout(() => {
        if (loading.parentNode) {
          loading.parentNode.removeChild(loading);
        }
      }, 300);
    }, 500);
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = "↑";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");

  Object.assign(backToTop.style, {
    position: "fixed",
    bottom: "24px",
    left: "24px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#00D4AA",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    opacity: "0",
    visibility: "hidden",
    transition: "all 0.3s ease",
    zIndex: "999",
  });

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Counter Animation for Numbers
function initCounterAnimation() {
  const counters = document.querySelectorAll(".pricing-price .price");

  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent);
    const duration = 1000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
}

// Navbar Active Link
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  createDarkModeToggle();
  initMobileMenu();
  handleNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initFormValidation();
  initBackToTop();
  initCounterAnimation();
  initLazyLoading();
  initActiveNavLink();
});

// Responsive handling
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  if (window.innerWidth > 1024 && navbarNav.classList.contains("active")) {
    navbarNav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
});

// Performance optimization
window.addEventListener(
  "scroll",
  throttle(() => {
    // Handle scroll events with throttling
  }, 16)
);

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
});

// Service Worker registration (for PWA functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

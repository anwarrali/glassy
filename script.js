// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  // Default configuration
  const defaultConfig = {
    hero_name: "Rand Khaled",
    hero_title: "IT Specialist | Software Engineering Student",
    hero_tagline:
      "Building scalable, smart, and user-focused digital solutions.",
    about_text:
      "I'm a passionate IT professional and Software Engineering student with a deep focus on creating impactful digital experiences. My expertise spans across frontend development with React and Next.js, backend systems using Node.js and Express, and integrating cutting-edge AI solutions into practical applications.",
    contact_email: "contact@randkhaled.com",
    background_color: "#0f0f0f",
    surface_color: "rgba(255, 255, 255, 0.05)",
    text_color: "#ffffff",
    primary_action_color: "#FFD600",
    secondary_action_color: "#FFA500",
  };

  // Theme state
  let isDarkMode = true;

  // Initialize Element SDK
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        // Update hero section
        document.getElementById("heroName").textContent =
          config.hero_name || defaultConfig.hero_name;
        document.getElementById("heroTitle").textContent =
          config.hero_title || defaultConfig.hero_title;
        document.getElementById("heroTagline").textContent =
          config.hero_tagline || defaultConfig.hero_tagline;

        // Update about section
        document.getElementById("aboutText").textContent =
          config.about_text || defaultConfig.about_text;

        // Update contact email
        const contactEmailEl = document.getElementById("contactEmail");
        if (contactEmailEl) {
          contactEmailEl.textContent =
            config.contact_email || defaultConfig.contact_email;
        }
      },
      mapToCapabilities: (config) => ({
        recolorables: [
          {
            get: () =>
              config.background_color || defaultConfig.background_color,
            set: (value) =>
              window.elementSdk.setConfig({ background_color: value }),
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (value) =>
              window.elementSdk.setConfig({ surface_color: value }),
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => window.elementSdk.setConfig({ text_color: value }),
          },
          {
            get: () =>
              config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) =>
              window.elementSdk.setConfig({ primary_action_color: value }),
          },
          {
            get: () =>
              config.secondary_action_color ||
              defaultConfig.secondary_action_color,
            set: (value) =>
              window.elementSdk.setConfig({
                secondary_action_color: value,
              }),
          },
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined,
      }),
      mapToEditPanelValues: (config) =>
        new Map([
          ["hero_name", config.hero_name || defaultConfig.hero_name],
          ["hero_title", config.hero_title || defaultConfig.hero_title],
          ["hero_tagline", config.hero_tagline || defaultConfig.hero_tagline],
          ["about_text", config.about_text || defaultConfig.about_text],
          [
            "contact_email",
            config.contact_email || defaultConfig.contact_email,
          ],
        ]),
    });
  }

  // Theme toggle
  window.toggleTheme = () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);

    // Refresh AOS to handle potential layout changes
    setTimeout(() => {
      if (typeof AOS !== "undefined") AOS.refresh();
    }, 500);
  };

  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (themeToggleMobile)
    themeToggleMobile.addEventListener("click", toggleTheme);

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formSuccess.classList.remove("hidden");
      contactForm.reset();
      setTimeout(() => {
        formSuccess.classList.add("hidden");
      }, 3000);
    });
  }

  // Project click handler
  function openProject(projectId) {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-8 left-1/2 transform -translate-x-1/2 glass-card rounded-full px-6 py-3 z-50 animate-fade-in-up";
    toast.innerHTML = `<span class="accent-text font-medium">Project: ${projectId}</span> <span class="opacity-70">- Details page coming soon!</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Ensure click on modal inner clears the close timeout
  const modalInner = document.querySelector(".modal-inner");
  if (modalInner) {
    modalInner.addEventListener("mouseenter", clearCloseTimeout);
  }
});

// Project Modal Logic - Moved to global scope for HTML onclick access
let closeTimeout;

function handleProjectMouseEnter(element) {
  // No longer auto-opening on hover as per user request
}

function handleProjectInteraction(element) {
  openProjectModal(element);
}

function openProjectModal(element) {
  const projectModal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");
  if (!projectModal || !modalContent) return;

  clearCloseTimeout();
  const title = element.getAttribute("data-project-title");
  const desc = element.getAttribute("data-project-desc");
  const tech = element.getAttribute("data-project-tech");
  const color = element.getAttribute("data-project-color");
  const imgUrl = element.getAttribute("data-project-img");

  modalContent.innerHTML = `
        <div class="flex flex-col gap-6">
          <div>
            <h2 class="text-3xl font-bold mb-4 accent-text">${title}</h2>
            <p class="text-lg opacity-80 mb-6">${desc}</p>
            <div class="flex flex-wrap gap-2 mb-8">
              ${tech
                .split(",")
                .map((t) => `<span class="tech-tag">${t.trim()}</span>`)
                .join("")}
            </div>
            <button class="btn-primary">View Case Study</button>
          </div>
        </div>
      `;
  projectModal.classList.add("active");
}

function closeProjectModalAuto() {
  const projectModal = document.getElementById("projectModal");
  if (!projectModal) return;

  if (window.innerWidth > 1024) {
    closeTimeout = setTimeout(() => {
      projectModal.classList.remove("active");
    }, 500);
  }
}

function closeProjectModalExplicit() {
  const projectModal = document.getElementById("projectModal");
  if (!projectModal) return;

  clearCloseTimeout();
  projectModal.classList.remove("active");
}

function clearCloseTimeout() {
  if (closeTimeout) clearTimeout(closeTimeout);
}

(() => {
  "use strict";

  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  const setHeaderState = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
    nav?.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("revealed"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -45px"
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll(".partner-photo").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.display = "none";
    }, { once: true });
  });

  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const buttonLabel = submitButton?.querySelector("span");
    const originalLabel = buttonLabel?.textContent || "Enviar solicitação";

    successMessage?.setAttribute("hidden", "");
    errorMessage?.setAttribute("hidden", "");

    if (submitButton) submitButton.disabled = true;
    if (buttonLabel) buttonLabel.textContent = "Enviando...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Não foi possível enviar a mensagem.");
      }

      form.reset();
      successMessage?.removeAttribute("hidden");
      successMessage?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = "O envio não foi concluído. Tente novamente ou fale conosco pelo WhatsApp.";
        errorMessage.removeAttribute("hidden");
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (buttonLabel) buttonLabel.textContent = originalLabel;
    }
  });
})();

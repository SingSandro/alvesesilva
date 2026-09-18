(() => {
  "use strict";

  const nav = document.getElementById("nav");
  const menuButton = document.getElementById("menuButton");
  const body = document.body;

  const setMenuState = (open) => {
    if (!nav || !menuButton) return;
    nav.classList.toggle("menu-active", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuButton.textContent = open ? "\u2715" : "\u2630";
    body.classList.toggle("menu-open", open);
  };

  menuButton?.addEventListener("click", () => {
    setMenuState(!nav?.classList.contains("menu-active"));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenuState(false);
  });

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add("open");
    body.classList.add("modal-open");
  };

  const closeModals = () => {
    document.querySelectorAll(".modal.open").forEach((modal) => {
      modal.classList.remove("open");
      modal.hidden = true;
    });
    body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger.getAttribute("data-modal-open"));
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((trigger) => {
    trigger.addEventListener("click", closeModals);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModals();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const buttonLabel = submitButton?.querySelector("span");
    const originalLabel = buttonLabel?.textContent || "Enviar solicitação";

    successMessage?.classList.remove("show");
    successMessage?.setAttribute("hidden", "");
    errorMessage?.classList.remove("show");
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
      if (successMessage) {
        successMessage.classList.add("show");
        successMessage.removeAttribute("hidden");
        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = "O envio não foi concluído. Tente novamente ou fale conosco pelo WhatsApp.";
        errorMessage.classList.add("show");
        errorMessage.removeAttribute("hidden");
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (buttonLabel) buttonLabel.textContent = originalLabel;
    }
  });
})();
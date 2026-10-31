import "bootstrap";

// Identifica la página actual en las dos zonas de navegación.
const currentPage = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

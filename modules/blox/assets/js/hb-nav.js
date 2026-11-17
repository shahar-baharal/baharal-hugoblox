// Navigation

const applyScrollPadding = () => {
  const header = document.querySelector(".page-header");
  const position = header.getBoundingClientRect();
  document.documentElement.style.scrollPaddingTop = `${position.height.toString()}px`;
  const r = document.querySelector(":root");
  r.style.setProperty("--navbar-height", `${position.height.toString()}px`);
};

window.addEventListener("DOMContentLoaded", () => {
  const dropdownMenus = document.querySelectorAll(".nav-dropdown > .nav-link[role='button']");

  dropdownMenus.forEach((toggler) => {
    const toggle = (el) => {
      const parent = el.closest(".nav-dropdown");
      const willActivate = !parent.classList.contains("active");
      parent.classList.toggle("active", willActivate);
      el.setAttribute("aria-expanded", willActivate ? "true" : "false");
    };

    toggler?.addEventListener("click", (e) => {
      e.preventDefault();
      toggle(e.currentTarget);
    });

    // Keyboard support
    toggler?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(e.currentTarget);
      }
      if (e.key === "Escape") {
        const parent = e.currentTarget.closest(".nav-dropdown");
        parent?.classList.remove("active");
        e.currentTarget.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Mobile menu (navbar.html's #nav-toggle checkbox): Escape closes it and
  // puts focus back on the toggle. click() rather than setting .checked, so
  // any other listener on the toggle (hb-sidebar.js) stays in step.
  const navToggle = document.querySelector("#nav-toggle");
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle?.checked) {
      navToggle.click();
      navToggle.focus({ preventScroll: true });
    }
  });

  // Tapping the hamburger label would focus the checkbox, and Chrome scrolls a
  // focused element in the sticky header back toward its place at the top of
  // the page. Toggle the checkbox directly instead, which doesn't focus it.
  document.querySelector("label[for='nav-toggle']")?.addEventListener("click", (e) => {
    e.preventDefault();
    navToggle?.click();
  });

  // Tapping a link in the open mobile menu closes it. Only an in-page link
  // (#section) needs this, since others load a new page, but closing on any
  // link keeps it simple. Dropdown parents are spans, so they stay unaffected.
  document.querySelector("#nav-menu")?.addEventListener("click", (e) => {
    if (navToggle?.checked && e.target.closest("a[href]")) navToggle.click();
  });

  applyScrollPadding();
});

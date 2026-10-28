const menuButton = document.querySelector("#menu-button");
const mobileMenu = document.querySelector("#mobile-menu");

function setMenu(open) {
  mobileMenu.classList.toggle("hidden", !open);
  menuButton.setAttribute("aria-expanded", open);
  menuButton.querySelector("i").className = open ? "bi bi-x-lg" : "bi bi-list";
}

menuButton.addEventListener("click", () =>
  setMenu(mobileMenu.classList.contains("hidden"))
);
mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));

const burger = document.getElementById("header-burger");
const menu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("mobile-menu-close");

function openMenu() {
  menu.classList.add("is-open");
  menu.removeAttribute("aria-hidden");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

burger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) closeMenu();
});

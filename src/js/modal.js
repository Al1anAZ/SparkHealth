const overlay = document.getElementById("modal-overlay");
const closeBtn = document.getElementById("modal-close");
const openBtns = document.querySelectorAll("[data-modal-open]");

function openModal() {
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

openBtns.forEach((btn) => btn.addEventListener("click", openModal));

closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

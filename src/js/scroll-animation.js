function initScrollCards(wrapperEl) {
  const cards = [...wrapperEl.querySelectorAll("[data-scroll-card]")];
  if (cards.length === 0) return;

  function update() {
    const viewportCenter = window.innerHeight / 2;
    let focusIndex = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < minDist) {
        minDist = dist;
        focusIndex = i;
      }
    });

    cards.forEach((card, i) => {
      card.dataset.cardState = i === focusIndex ? "focus" : "dim";
    });
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
}

document
  .querySelectorAll("[data-scroll-cards-section]")
  .forEach(initScrollCards);

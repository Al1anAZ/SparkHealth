const SCROLL_PER_CARD = 600;

function initScrollCards(wrapperEl) {
  const sectionEl = wrapperEl.querySelector("[data-scroll-sticky]");
  const listEl = wrapperEl.querySelector("[data-scroll-cards]");
  const cards = [...wrapperEl.querySelectorAll("[data-scroll-card]")];
  const cardCount = cards.length;

  if (!sectionEl || !listEl || cardCount === 0) return;

  function setup() {
    const maxHeight = Math.max(...cards.map((c) => c.offsetHeight));
    listEl.style.height = `${maxHeight}px`;
    wrapperEl.style.height = `${window.innerHeight + (cardCount - 1) * SCROLL_PER_CARD}px`;
  }

  function update() {
    const rect = wrapperEl.getBoundingClientRect();
    const scrolled = -rect.top;
    const budget = (cardCount - 1) * SCROLL_PER_CARD;
    const progress = Math.max(0, Math.min(1, scrolled / budget));
    const activeIndex = Math.round(progress * (cardCount - 1));

    cards.forEach((card, i) => {
      const rel = i - activeIndex;
      card.dataset.cardState =
        rel < 0
          ? "past"
          : rel === 0
            ? "active"
            : rel === 1
              ? "near"
              : rel === 2
                ? "far"
                : "distant";
    });
  }

  setup();
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", () => {
    setup();
    update();
  });
}

document
  .querySelectorAll("[data-scroll-cards-section]")
  .forEach(initScrollCards);

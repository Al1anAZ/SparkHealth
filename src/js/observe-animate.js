export function observeAnimate(
  selector,
  trigger,
  { threshold = 0.2, all = false } = {},
) {
  if (window.innerWidth <= 1000) return;
  const elements = all
    ? [...document.querySelectorAll(selector)]
    : [document.querySelector(selector)].filter(Boolean);
  elements.forEach((el) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger(el);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
  });
}

import { observeAnimate } from "./observe-animate.js";

observeAnimate(
  ".card-grid-cards",
  (el) => el.setAttribute("data-animated", ""),
  { threshold: 0.5, all: true },
);

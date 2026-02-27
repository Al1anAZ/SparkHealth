import { observeAnimate } from "./observe-animate.js";

observeAnimate(
  ".feature-list-list",
  (el) => el.setAttribute("data-animated", ""),
  { threshold: 0.5 },
);

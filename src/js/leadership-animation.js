import { observeAnimate } from "./observe-animate.js";

observeAnimate(
  ".leadership-grid",
  (el) => el.setAttribute("data-animated", ""),
  { threshold: 0.5 },
);

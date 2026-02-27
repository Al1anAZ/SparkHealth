import { observeAnimate } from "./observe-animate.js";

observeAnimate(
  ".clinical-memory-grid",
  (el) => el.setAttribute("data-animated", ""),
  { threshold: 0.5 },
);

import { observeAnimate } from "./observe-animate.js";

observeAnimate(".security-text", (el) => el.setAttribute("data-animated", ""), {
  threshold: 0.5,
});

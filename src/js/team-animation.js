import { observeAnimate } from "./observe-animate.js";

observeAnimate(".team-text", (el) => el.setAttribute("data-animated", ""), {
  threshold: 0.5,
});

import "./portfolio.js";

const autoTypingSentence = [
  "web development",
  "template to HTML",
  "wordpress",
  "framework",
];

const autoTyping = new Typed(".auto-type", {
  strings: autoTypingSentence,
  typeSpeed: 30,
  backSpeed: 1,
  loop: true,
  loopCount: Infinity,
  showCursor: true,
  cursorChar: "  >_",
});

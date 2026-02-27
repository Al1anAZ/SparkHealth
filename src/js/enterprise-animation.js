const diagram = document.querySelector(".enterprise-diagram");

if (diagram && window.innerWidth > 1000) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        diagram.classList.add("enterprise-diagram--animate");
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  observer.observe(diagram);
}

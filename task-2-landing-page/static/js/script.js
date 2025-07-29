// scroll reveal using IntersectionObserver

const reveals = document.querySelectorAll(".scroll-reveal");

const options = {
  threshold: 0.2,
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, options);

reveals.forEach((reveal) => {
  observer.observe(reveal);
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const typingText = document.getElementById("typingText");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    themeToggle.innerHTML = `<i data-lucide='${savedTheme === "dark" ? "sun" : "moon"}'></i>`;
  }

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.innerHTML = `<i data-lucide='${next === "dark" ? "sun" : "moon"}'></i>`;
    lucide.createIcons();

  });

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navLinks a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = sec.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))
              .scrollIntoView({ behavior: "smooth" });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  const progressBar = document.createElement("div");
  progressBar.id = "progressBar";
  document.body.appendChild(progressBar);
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });

  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.innerHTML = `<i data-lucide="arrow-up"></i>`;
  document.body.appendChild(backToTop);
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  if (typingText) {
    const texts = [
      "Mình là Frontend Developer ",
      "Mình yêu thích UI/UX Design ",
      "Web/Mobile Developer ",
      "Freelancer & Creator "
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 120; // tốc độ gõ

    function typeEffect() {
      const current = texts[index];
      if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex--);
        speed = 50;
      } else {
        typingText.textContent = current.substring(0, charIndex++);
        speed = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        speed = 1000; // dừng một chút khi gõ xong
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length; // chuyển sang câu tiếp
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // -----------------------------
  lucide.createIcons();
});

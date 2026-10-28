const menuButton = document.querySelector("#menu-button");
const mobileMenu = document.querySelector("#mobile-menu");

function setMenu(open) {
  mobileMenu.classList.toggle("hidden", !open);
  menuButton.setAttribute("aria-expanded", open);
  menuButton.querySelector("i").className = open ? "bi bi-x-lg" : "bi bi-list";
}

menuButton.addEventListener("click", () =>
  setMenu(mobileMenu.classList.contains("hidden"))
);
mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 }
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Line-art flowers in the brand colours, drifting up the background
const flowerShapes = [
  // Five-petal blossom
  `<g fill="currentColor" fill-opacity=".12">${[0, 72, 144, 216, 288]
    .map((a) => `<ellipse cx="50" cy="29" rx="12" ry="21" transform="rotate(${a} 50 50)"/>`)
    .join("")}</g><circle cx="50" cy="50" r="5"/>`,
  // Freesia stem with small buds
  `<path d="M30 96 C34 70 46 46 74 22"/><path d="M44 62 c-10 -2 -16 -10 -14 -20 c8 2 14 10 14 20z"/><path d="M56 44 c-8 -6 -10 -15 -5 -23 c7 5 9 14 5 23z"/><path d="M68 30 c-2 -9 2 -17 10 -20 c2 9 -2 17 -10 20z"/>`,
  // Single petal
  `<path d="M50 8 C76 34 76 70 50 92 C24 70 24 34 50 8Z" fill="currentColor" fill-opacity=".12"/><path d="M50 18 V84"/>`,
  // Tulip
  `<path d="M34 40 C34 22 44 14 50 30 C56 14 66 22 66 40 C66 58 34 58 34 40Z" fill="currentColor" fill-opacity=".12"/><path d="M50 54 V96"/><path d="M50 80 C42 72 34 72 28 74 C34 84 44 86 50 82"/>`,
];
const flowerColors = ["#C9ADA7", "#BB4251", "#94A9C9"];
const flowerLayer = document.querySelector("#flowers");

if (flowerLayer) {
  const count = window.innerWidth < 768 ? 7 : 12;
  for (let i = 0; i < count; i++) {
    const size = 40 + Math.random() * 50;
    const duration = 28 + Math.random() * 30;
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.style.cssText = `
      left: ${Math.random() * 95}%;
      width: ${size}px;
      height: ${size}px;
      color: ${flowerColors[i % flowerColors.length]};
      opacity: ${0.55 + Math.random() * 0.35};
      --duration: ${duration}s;
      --delay: ${-Math.random() * duration}s;
      --drift: ${(Math.random() - 0.5) * 30}vw;
      --spin: ${(Math.random() - 0.5) * 540}deg;
      --still-top: ${Math.random() * 95}%;
    `;
    flower.innerHTML = `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${
      flowerShapes[i % flowerShapes.length]
    }</svg>`;
    flowerLayer.appendChild(flower);
  }
}

// Sign-up form: sends the filled-in details by e-mail or WhatsApp
const signupForm = document.querySelector("#signup-form");

if (signupForm) {
  const classSelect = signupForm.elements["class"];
  const preselected = new URLSearchParams(location.search).get("class");
  if (preselected) classSelect.value = preselected;

  const signupMessage = () => {
    const f = signupForm.elements;
    const chosen = classSelect.value
      ? classSelect.options[classSelect.selectedIndex].text
      : "-";
    return {
      subject: `HHeels: ${chosen}`,
      body: `Name: ${f.name.value}\nContact: ${f.contact.value}\nClass: ${chosen}\n\n${f.message.value}`,
    };
  };

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { subject, body } = signupMessage();
    location.href = `mailto:moin@hheels.dance?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  });

  document.querySelector("#whatsapp-send").addEventListener("click", () => {
    if (!signupForm.reportValidity()) return;
    const { body } = signupMessage();
    window.open(
      `https://wa.me/4915259516681?text=${encodeURIComponent(body)}`,
      "_blank"
    );
  });
}

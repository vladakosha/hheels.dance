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

// Translucent flowers drifting up the page edges, away from the text
const flowerLayer = document.querySelector("#flowers");

if (flowerLayer) {
  const small = window.innerWidth < 768;
  const count = small ? 4 : 8;
  // Free space on each side of the 72rem content column
  const gutter = Math.max((window.innerWidth - 1152) / 2, small ? 40 : 90);
  for (let i = 0; i < count; i++) {
    const size = small ? 50 + Math.random() * 30 : 70 + Math.random() * 60;
    const duration = 35 + Math.random() * 30;
    const onLeft = i % 2 === 0;
    const x = Math.random() * gutter - size / 2;
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.style.cssText = `
      ${onLeft ? "left" : "right"}: ${x}px;
      width: ${size}px;
      height: ${size}px;
      opacity: ${small ? 0.35 + Math.random() * 0.15 : 0.55 + Math.random() * 0.25};
      --duration: ${duration}s;
      --delay: ${-Math.random() * duration}s;
      --drift: ${(onLeft ? 1 : -1) * Math.random() * 3}vw;
      --spin: ${(Math.random() - 0.5) * 240}deg;
      --still-top: ${Math.random() * 95}%;
    `;
    flower.innerHTML = `<img src="assets/flowers/sheer-${(i % 5) + 1}.webp" alt="" />`;
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

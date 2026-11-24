const navigation = performance.getEntriesByType("navigation")[0];

if (navigation?.type === "reload") {
  history.scrollRestoration = "manual";

  history.replaceState(
    history.state,
    "",
    window.location.pathname + window.location.search,
  );

  window.addEventListener("load", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  });
}

let isModalOpen = false;
let contrastToggle = false;

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const form = event.target;
  form.classList.add("contact-form--sending");
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_ff6p4tk",
      "template_lwylzj4",
      event.target,
      "Dfp3kHNwXONU0kcgL",
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch((error) => {
      console.error("Error de EmailJS", error);
      loading.classList.remove("modal__overlay--visible");
      form.classList.remove("contact-form--sending");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com",
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

function createBinaryRain() {
  const container = document.querySelector(".binary-rain__columns");

  if (!container) return;

  const columnCount = Math.ceil(window.innerWidth / 28);

  container.innerHTML = "";

  const rainHeight = container.offsetHeight;
  const characterHeight = 12 * 1.3;

  const characterCount = Math.ceil((rainHeight * 1.5) / characterHeight);

  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement("span");

    let binary = "";

    for (let j = 0; j < characterCount; j++) {
      binary += Math.round(Math.random());
    }

    column.textContent = binary;

    const speed = 9 + Math.random() * 12;
    const delay = -Math.random() * speed;

    column.style.setProperty("--speed", `${speed}s`);
    column.style.setProperty("--delay", `${delay}s`);

    // column.style.opacity = 0.2 + Math.random() * 0.5;

    // Different brightness levels
    column.style.opacity = 0.15 + Math.random() * 0.65;

    // Subtle depth of field
    const blur = Math.random() < 0.3 ? Math.random() * 1.5 : 0;
    column.style.filter = `blur(${blur}px)`;

    // Different column lengths
    // const length = 35 + Math.floor(Math.random() * 65);
    // column.textContent = binary.slice(0, length);

    container.appendChild(column);
  }
}

document.addEventListener("DOMContentLoaded", createBinaryRain);

function toggleLanguage() {
  const nextLanguage = document.documentElement.lang === "en" ? "es" : "en";

  document.documentElement.lang = nextLanguage;

  document.querySelectorAll("[data-href-en][data-href-es]").forEach((link) => {
    link.href = link.getAttribute(`data-href-${nextLanguage}`);
  });

  document.querySelectorAll("[data-en][data-es]").forEach((element) => {
    element.textContent = element.dataset[nextLanguage];
  });

  const button = document.querySelector(".language-toggle");

  button.textContent = nextLanguage === "en" ? "ES" : "EN";
  button.setAttribute(
    "aria-label",
    nextLanguage === "en" ? "Switch to Spanish" : "Cambiar a inglés",
  );
}

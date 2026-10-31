const works = [
  {
    author: "Arturo Pérez-Reverte", title: "Misión en París", year: 2025,
    photo: new URL("../images/participa/autores/perez-reverte.jpg", import.meta.url).href,
    cover: new URL("../images/participa/libros/mision-en-paris.svg", import.meta.url).href,
    hint: "Una aventura histórica del capitán Alatriste en la capital francesa.",
    url: "https://www.penguinlibros.com/es/novela-historica/389597-libro-mision-en-paris-las-aventuras-del-capitan-alatriste-8-9788420479446",
    credit: "Librairie Mollat", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Arturo_P%C3%A9rez-Reverte_(2024).jpg"
  },
  {
    author: "Javier Castillo", title: "El susurro del fuego", year: 2025,
    photo: new URL("../images/participa/autores/javier-castillo.jpg", import.meta.url).href,
    cover: new URL("../images/participa/libros/el-susurro-del-fuego.svg", import.meta.url).href,
    hint: "Un viaje a Tenerife, una desaparición y una búsqueda contrarreloj.",
    url: "https://www.penguinlibros.com/es/novela-negra-misterio-y-thriller/390047-libro-el-susurro-del-fuego-9788491299790",
    credit: "Pedro J Pacheco", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Goyas_2023_-_Javier_Castillo.jpg"
  },
  {
    author: "Dolores Redondo", title: "Las que no duermen NASH", year: 2024,
    photo: new URL("../images/participa/autores/dolores-redondo.jpg", import.meta.url).href,
    cover: new URL("../images/participa/libros/las-que-no-duermen-nash.svg", import.meta.url).href,
    hint: "Una psicóloga forense investiga un hallazgo en una sima de Navarra.",
    url: "https://www.doloresredondo.com/producto/las-que-no-duermen-nash/",
    credit: "Sapristi1000", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Dolores_redondo.jpg"
  },
  {
    author: "Eduardo Mendoza", title: "Tres enigmas para la Organización", year: 2024,
    photo: new URL("../images/participa/autores/eduardo-mendoza.jpg", import.meta.url).href,
    cover: new URL("../images/participa/libros/tres-enigmas.svg", import.meta.url).href,
    hint: "Una peculiar organización de agentes afronta tres investigaciones.",
    url: "https://www.planetadelibros.com/libro-tres-enigmas-para-la-organizacion/388773",
    credit: "Piotr Drabik", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    source: "https://commons.wikimedia.org/wiki/File:Eduardo_Mendoza.jpg"
  },
  {
    author: "Julia Navarro", title: "El niño que perdió la guerra", year: 2024,
    photo: new URL("../images/participa/autores/julia-navarro.jpg", import.meta.url).href,
    cover: new URL("../images/participa/libros/el-nino-que-perdio-la-guerra.svg", import.meta.url).href,
    hint: "Un niño es enviado desde España a la Unión Soviética durante la guerra.",
    url: "https://www.penguinlibros.com/es/literatura-contemporanea/350280-libro-el-nino-que-perdio-la-guerra-9788401027970",
    credit: "Harald Krichel", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Julia_Navarro-64093.jpg"
  },
  {
    author: "Elísabet Benavent", title: "Esnob", year: 2024,
    photo: new URL("../images/participa/autores/elisabet-benavent.jpg", import.meta.url).href,
    cover: new URL("../images/participa/libros/esnob.svg", import.meta.url).href,
    hint: "Un hombre acostumbrado al éxito pierde sus privilegios y debe empezar de nuevo.",
    url: "https://www.penguinlibros.com/es/novela-romantica/344809-libro-esnob-9788491296874",
    credit: "Non Stop People", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:Elisabet_Benavent_(21620654366).jpg"
  }
];

function externalLink(url, text) {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = text;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

// Créditos de los retratos, independientes de las parejas del juego.
const credits = document.querySelector("[data-photo-credits]");
works.forEach((work) => {
  const item = document.createElement("li");
  item.append(`${work.author}: fotografía de ${work.credit}. `,
    externalLink(work.source, "Fuente"), " · ",
    externalLink(work.licenseUrl, work.license));
  credits.append(item);
});

// Envío real solo después de que Netlify haya procesado el formulario.
const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
// El minificador puede omitir type="submit" porque es el valor predeterminado.
const submitButton = form.querySelector(".contact-panel__submit");
const messageField = form.elements.namedItem("mensaje");
const messageError = document.querySelector("#mensaje-error");
messageField.addEventListener("invalid", () => {
  messageField.setAttribute("aria-invalid", "true");
  messageError.textContent = messageField.validationMessage;
  messageError.hidden = false;
});
messageField.addEventListener("input", () => {
  messageField.setCustomValidity("");
  messageField.removeAttribute("aria-invalid");
  messageError.textContent = "";
  messageError.hidden = true;
});
let sending = false;
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sending) return;
  ["nombre", "email", "mensaje"].forEach((name) => {
    form.elements.namedItem(name).value = form.elements.namedItem(name).value.trim();
  });
  // Tras modificar value, minlength no basta para validar el texto recortado.
  messageField.setCustomValidity(messageField.value.length < 10
    ? "Escribe un mensaje de al menos 10 caracteres, sin contar los espacios del principio y del final."
    : "");
  if (!form.reportValidity()) return;
  if (form.hasAttribute("data-netlify")) {
    formStatus.textContent = "Los campos son válidos, pero no se ha enviado nada. El envío estará disponible al publicar y activar el formulario en Netlify.";
    return;
  }
  sending = true;
  submitButton.disabled = true;
  form.setAttribute("aria-busy", "true");
  formStatus.textContent = "Enviando consulta…";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
      signal: controller.signal
    });
    if (!response.ok) throw new Error("Envío rechazado");
    form.reset();
    formStatus.textContent = "Tu consulta se ha enviado. Gracias por escribirnos.";
  } catch {
    formStatus.textContent = "No hemos podido confirmar el envío. Conservamos tu mensaje para que puedas volver a intentarlo.";
  } finally {
    window.clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    form.removeAttribute("aria-busy");
  }
});

// Galería: los enlaces siguen funcionando si no hay soporte para dialog.
const galleryLinks = [...document.querySelectorAll("[data-gallery]")];
const dialog = document.querySelector("[data-gallery-dialog]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
let galleryIndex = 0;
function showPhoto(index) {
  galleryIndex = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[galleryIndex];
  galleryImage.src = link.querySelector("img").currentSrc || link.querySelector("img").src;
  galleryImage.alt = link.querySelector("img").alt;
  galleryCaption.textContent = `${galleryIndex + 1} de ${galleryLinks.length} · ${[...link.nextElementSibling.children].map((element) => element.textContent).join(" · ")}`;
}
galleryLinks.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    showPhoto(index);
    dialog.showModal();
  });
});
document.querySelector("[data-gallery-prev]").addEventListener("click", () => showPhoto(galleryIndex - 1));
document.querySelector("[data-gallery-next]").addEventListener("click", () => showPhoto(galleryIndex + 1));
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(galleryIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

// Abrir los créditos antes de seguir el enlace interno.
const projectCredits = document.querySelector("#creditos");
document.querySelectorAll("[data-open-credits]").forEach((link) => {
  link.addEventListener("click", () => { projectCredits.open = true; });
});
function openLinkedCredits() {
  if (window.location.hash === "#creditos") projectCredits.open = true;
}
window.addEventListener("hashchange", openLinkedCredits);
openLinkedCredits();

// Juego de asociación: todas las obras permanecen visibles.
const game = document.querySelector("[data-game]");
const score = document.querySelector("[data-game-score]");
const status = document.querySelector("[data-game-status]");
const authorName = document.querySelector("[data-author-name]");
const authorPhoto = document.querySelector("[data-author-photo]");
const roundLabel = document.querySelector("[data-game-round]");
const books = document.querySelector("[data-books]");
const selection = document.querySelector("[data-game-selection]");
const hintButton = document.querySelector("[data-game-hint]");
const hintText = document.querySelector("[data-game-hint-text]");
const confirmButton = document.querySelector("[data-game-confirm]");
const nextButton = document.querySelector("[data-game-next]");
const discoveries = document.querySelector("[data-discoveries]");
const discoveryList = document.querySelector("[data-discovery-list]");
let authorOrder = [];
let bookOrder = [];
let round = 0;
let answer = null;
let attempts = 0;
let matches = new Set();
let hints = new Set();
let locked = false;

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function updateScore() {
  score.textContent = `${matches.size} de 6 parejas · ${attempts} ${attempts === 1 ? "intento" : "intentos"} · ${hints.size} ${hints.size === 1 ? "pista" : "pistas"}`;
  confirmButton.disabled = answer === null || locked;
  hintButton.disabled = locked;
}

function renderBooks() {
  books.replaceChildren();
  bookOrder.forEach((pair) => {
    const work = works[pair];
    const label = document.createElement("label");
    label.className = "book-choice";
    label.classList.toggle("book-choice--used", matches.has(pair));

    const radio = document.createElement("input");
    radio.className = "book-choice__radio";
    radio.type = "radio";
    radio.name = "obra-juego";
    radio.value = String(pair);
    radio.checked = answer === pair;
    radio.disabled = locked || matches.has(pair);

    const image = document.createElement("img");
    image.className = "book-choice__image";
    image.src = work.cover;
    image.alt = "";
    image.width = 400;
    image.height = 500;

    const title = document.createElement("strong");
    title.className = "book-choice__title";
    title.textContent = work.title;

    const detail = document.createElement("span");
    detail.className = "book-choice__detail";
    detail.textContent = matches.has(pair)
      ? `Relacionada con ${work.author}`
      : String(work.year);

    radio.addEventListener("change", () => {
      answer = pair;
      selection.textContent = `Has elegido: ${work.title}. Puedes cambiarla o confirmar.`;
      updateScore();
    });

    label.append(radio, image, title, detail);
    books.append(label);
  });
}

function showAuthor() {
  const work = works[authorOrder[round]];
  answer = null;
  locked = false;
  authorName.textContent = work.author;
  authorPhoto.src = work.photo;
  authorPhoto.alt = `Retrato de ${work.author}`;
  roundLabel.textContent = `Autor ${round + 1} de ${works.length}`;
  hintText.textContent = "";
  selection.textContent = "Ninguna obra seleccionada.";
  status.textContent = "Elige una obra y confirma tu respuesta.";
  nextButton.hidden = true;
  renderBooks();
  updateScore();
}

confirmButton.addEventListener("click", () => {
  if (answer === null || locked) return;
  const pair = authorOrder[round];
  const work = works[pair];
  attempts += 1;

  if (answer !== pair) {
    status.textContent = `${works[answer].title} no corresponde a ${work.author}. Puedes seleccionar otra obra y volver a confirmar.`;
    answer = null;
    selection.textContent = "Selecciona otra obra para volver a intentarlo.";
    renderBooks();
  } else {
    matches.add(pair);
    locked = true;
    renderBooks();
    const item = document.createElement("li");
    item.append(`${work.author} · ${work.title} (${work.year}). ${work.hint} `,
      externalLink(work.url, "Ficha del libro"));
    discoveryList.append(item);
    discoveries.hidden = false;
    selection.textContent = `Respuesta fijada: ${work.title}.`;
    status.textContent = `¡Correcto! ${work.author} escribió ${work.title}. Pulsa Siguiente autor para continuar.`;
    nextButton.hidden = false;

    if (matches.size === works.length) {
      nextButton.hidden = true;
      status.textContent = `¡Has relacionado las seis parejas en ${attempts} intentos y con ${hints.size} ${hints.size === 1 ? "pista" : "pistas"}! Puedes consultar las lecturas o empezar otra partida.`;
    }
  }
  updateScore();
  status.focus();
});

nextButton.addEventListener("click", () => {
  if (!locked || round >= works.length - 1) return;
  round += 1;
  showAuthor();
  authorName.focus();
});

hintButton.addEventListener("click", () => {
  if (locked) return;
  const pair = authorOrder[round];
  hints.add(pair);
  hintText.textContent = `Pista: ${works[pair].hint}`;
  updateScore();
});

function resetGame() {
  const pairs = works.map((_, index) => index);
  authorOrder = shuffle(pairs);
  bookOrder = shuffle(pairs);
  round = 0;
  attempts = 0;
  matches = new Set();
  hints = new Set();
  discoveryList.replaceChildren();
  discoveries.hidden = true;
  showAuthor();
}

document.querySelector("[data-game-reset]").addEventListener("click", () => {
  resetGame();
  authorName.focus();
});
resetGame();
game.hidden = false;

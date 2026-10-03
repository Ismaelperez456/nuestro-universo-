/* ==========================================================================
   CONFIGURACIÓN PERSONALIZABLE
   ========================================================================== */

// 1. Fecha de inicio de la relación
const relationshipDate = new Date("2026-01-01T00:00:00");

// 2. Recuerdos de la Constelación
const memories = [
    "Ese primer momento en que conectamos Manila y Tucumán por primera vez. ✨",
    "Todas esas madrugadas y noches hablando sin importar la diferencia de horario. 🌙",
    "Cada risa, llamada y mensaje compartido que acorta cualquier distancia. 💫",
    "Los planes y viajes que ya nos esperan en nuestro futuro juntos. ✈",
    "Incluso a 17,800 kilómetros, sos y vas a seguir siendo mi lugar favorito. ❤️"
];

/* ==========================================================================
   ELEMENTOS DEL DOM
   ========================================================================== */
const startButton = document.getElementById("startButton");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicPlayer = document.getElementById("musicPlayer");
const app = document.getElementById("app");
const progress = document.getElementById("progress");
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");
const letters = document.querySelectorAll(".letter");
const modal = document.getElementById("letterModal");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.getElementById("closeModal");
const sendWishButton = document.getElementById("sendWishButton");
const wishInput = document.getElementById("wishInput");
const wishFeedback = document.getElementById("wishFeedback");

/* ==========================================================================
   HORARIOS EN TIEMPO REAL (MANILA Y TUCUMÁN)
   ========================================================================== */
function updateRealTimeClocks() {
    const timeManilaEl = document.getElementById("timeManila");
    const timeTucumanEl = document.getElementById("timeTucuman");

    const now = new Date();

    const optionsManila = { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    const optionsTucuman = { timeZone: "America/Argentina/Tucuman", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };

    if (timeManilaEl) {
        timeManilaEl.textContent = new Intl.DateTimeFormat("es-AR", optionsManila).format(now);
    }
    if (timeTucumanEl) {
        timeTucumanEl.textContent = new Intl.DateTimeFormat("es-AR", optionsTucuman).format(now);
    }
}

setInterval(updateRealTimeClocks, 1000);
updateRealTimeClocks();

/* ==========================================================================
   NAVEGACIÓN POR CAPÍTULOS
   ========================================================================== */
const chapters = [
    { id: "hero", label: "00 — Inicio" },
    { id: "intro-sec", label: "01 — Historia" },
    { id: "distance-sec", label: "02 — El Planeta" },
    { id: "counter-sec", label: "03 — Tiempo" },
    { id: "constellation-sec", label: "04 — Constelación" },
    { id: "letters-sec", label: "05 — Cartas" },
    { id: "secret-sec", label: "06 — Secreto" },
    { id: "wishes-sec", label: "07 — Deseos" },
    { id: "final-sec", label: "08 — Final" }
];

function createNavigation() {
    const nav = document.createElement("nav");
    nav.className = "chapter-nav";
    
    chapters.forEach(chap => {
        const link = document.createElement("a");
        link.href = `#${chap.id}`;
        link.innerText = chap.label;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetEl = document.getElementById(chap.id);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
        nav.appendChild(link);
    });

    document.body.appendChild(nav);
}

function updateActiveChapter() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    const navLinks = document.querySelectorAll(".chapter-nav a");

    chapters.forEach((chap, index) => {
        const section = document.getElementById(chap.id);
        if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(l => l.classList.remove("active"));
                if (navLinks[index]) {
                    navLinks[index].classList.add("active");
                    if (window.innerWidth <= 768) {
                        navLinks[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                    }
                }
            }
        }
    });
}

/* ==========================================================================
   MÚSICA Y REPRODUCCIÓN
   ========================================================================== */
async function startExperience() {
    app.scrollIntoView({ behavior: "smooth" });
    try {
        await music.play();
        setAudioUIState(true);
    } catch (error) {
        console.log("Autoplay bloqueado por el navegador:", error);
    }
}

function setAudioUIState(isPlaying) {
    if (isPlaying) {
        musicButton.textContent = "Ⅱ";
        musicPlayer.classList.add("playing");
    } else {
        musicButton.textContent = "▶";
        musicPlayer.classList.remove("playing");
    }
}

startButton.addEventListener("click", startExperience);

musicButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        setAudioUIState(true);
    } else {
        music.pause();
        setAudioUIState(false);
    }
});

music.addEventListener("play", () => setAudioUIState(true));
music.addEventListener("pause", () => setAudioUIState(false));

/* ==========================================================================
   PROGRESO DE SCROLL
   ========================================================================== */
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = (scrollTop / documentHeight) * 100;
    progress.style.width = `${percentage}%`;
    updateActiveChapter();
});

/* ==========================================================================
   ANIMACIONES DE APARICIÓN (REVEAL)
   ========================================================================== */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => revealObserver.observe(element));

/* ==========================================================================
   CONTADOR EN TIEMPO REAL
   ========================================================================== */
function updateCounter() {
    const now = new Date();
    const difference = now - relationshipDate;

    if (difference < 0) return;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = hours % 24;
    if (mEl) mEl.textContent = minutes % 60;
    if (sEl) sEl.textContent = seconds % 60;
}

updateCounter();
setInterval(updateCounter, 1000);

/* ==========================================================================
   CONSTELACIÓN INTERACTIVA
   ========================================================================== */
const stars = document.querySelectorAll(".constellation-star");
stars.forEach((star, index) => {
    const handleStarClick = () => {
        const memoryBox = document.getElementById("memoryBox");
        if (memoryBox && memories[index]) {
            memoryBox.innerHTML = `<span>✦</span> <p>${memories[index]}</p>`;
        }
    };
    star.addEventListener("click", handleStarClick);
});

/* ==========================================================================
   MODAL DE CARTAS
   ========================================================================== */
letters.forEach(letter => {
    letter.addEventListener("click", () => {
        const message = letter.dataset.message;
        modalMessage.textContent = message;
        modal.classList.add("active");
    });
});

closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.remove("active");
});

/* ==========================================================================
   MENSAJE SECRETO
   ========================================================================== */
if (secretButton) {
    secretButton.addEventListener("click", () => {
        secretMessage.classList.add("visible");
        secretButton.textContent = "❤️";
    });
}

/* ==========================================================================
   EFECTO TÁCTIL: CORAZONES AL TOCAR LA PANTALLA
   ========================================================================== */
function createTouchHeart(x, y) {
    const heart = document.createElement("div");
    heart.className = "floating-touch-heart";
    heart.innerHTML = "♥";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const colors = ["#e7b8ff", "#cfa5ff", "#ffffff", "#ffb3d9"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1200);
}

window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
        createTouchHeart(e.touches[0].clientX, e.touches[0].clientY);
    }
});

/* ==========================================================================
   NUBE DE DESEOS
   ========================================================================== */
if (sendWishButton && wishInput) {
    sendWishButton.addEventListener("click", () => {
        const wishText = wishInput.value.trim();

        if (wishText === "") {
            wishFeedback.textContent = "Escribí un deseo antes de enviarlo al cielo ✨";
            return;
        }

        wishFeedback.textContent = "✨ Tu deseo ha sido enviado a las estrellas. ¡Prometo hacerlo realidad! ❤️";
        wishInput.value = "";

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const randomX = window.innerWidth / 2 + (Math.random() * 200 - 100);
                const randomY = window.innerHeight / 2 + (Math.random() * 200 - 100);
                createTouchHeart(randomX, randomY);
            }, i * 150);
        }
    });
}

/* ==========================================================================
   PARTÍCULAS ESPACIALES EN CANVAS
   ========================================================================== */
function initBackgroundParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width, height, particles;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((width * height) / 12000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.6 + 0.2,
                alpha: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.3 + 0.05
            });
        }
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        
        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < 0) p.y = height;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    resize();
    render();
}

/* ==========================================================================
   INICIALIZACIÓN AL CARGAR PÁGINA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    createNavigation();
    initBackgroundParticles();
    updateActiveChapter();
});
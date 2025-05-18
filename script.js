document.addEventListener('DOMContentLoaded', function() {
    // --- Gestione del Dark Mode con persistenza ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    function applyThemeFromStorage() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.textContent = '🌙';
        }
    }
    applyThemeFromStorage();

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-mode');
            if (isDark) {
                darkModeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                darkModeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Gestione cambio lingua con persistenza ---
    const langButtons = document.querySelectorAll('.lang-toggle');
    function applyLangFromStorage() {
        const savedLang = localStorage.getItem('lang');
        if (savedLang === 'it' || savedLang === 'en') {
            document.body.classList.remove('lang-it', 'lang-en');
            document.body.classList.add('lang-' + savedLang);
        }
    }
    applyLangFromStorage();

    langButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const lang = btn.getAttribute('data-lang');
            document.body.classList.remove('lang-it', 'lang-en');
            document.body.classList.add('lang-' + lang);
            localStorage.setItem('lang', lang);
        });
    });

    // --- Riavvio animazione hero su click "Home" ---
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.remove('animate');
                void heroContent.offsetWidth;
                heroContent.classList.add('animate');
            }
        });
    });

    // --- Inizializza EmailJS ---
    emailjs.init("WSHgr3JUQ3d6aNCtq");

    // --- Gestione Form contatto (solo invio email, niente download CV) ---
    const cvForm = document.getElementById('cv-request-form');
    if (cvForm) {
        cvForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const form = this;
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                alert("Per favore, compila tutti i campi.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Inserisci un'email valida.");
                return;
            }

            // Invio email con EmailJS
            emailjs.sendForm(
                'service_3py3qfs',
                'template_no2x3aj',
                form
            )
            .then(() => {
                console.log('Email inviata con successo!');
            }, (err) => {
                console.error('Errore invio email:', err);
            });

            // Pulizia form
            form.reset();

            // Messaggio di ringraziamento
            const lang = document.body.classList.contains("lang-it") ? "it" : "en";
            const confirmation = document.createElement("div");
            confirmation.textContent = lang === "it"
                ? "Grazie per avermi contattato! Ti risponderò al più presto."
                : "Thank you for reaching out! I’ll get back to you soon.";
            confirmation.className = "cv-confirmation";
            form.appendChild(confirmation);
            setTimeout(() => confirmation.remove(), 5000);
        });
    }

    // --- Gestione download CV dal nuovo bottone dedicato ---
    const cvDownloadBtn = document.getElementById('cv-download-btn');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function() {
            // Rileva lingua attiva
            const lang = document.body.classList.contains("lang-it") ? "it" : "en";
            const base64CV = base64CVs[lang];

            // Decodifica e download
            const byteCharacters = atob(base64CV);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = lang === "it" ? "cv_riccardo_it.pdf" : "cv_riccardo_en.pdf";
            link.click();

            // Messaggio di conferma
            const confirmation = document.createElement("div");
            confirmation.textContent = lang === "it"
                ? "Grazie! Il tuo CV è stato scaricato con successo."
                : "Thank you! Your CV has been successfully downloaded.";
            confirmation.className = "cv-confirmation";
            cvDownloadBtn.parentNode.appendChild(confirmation);
            setTimeout(() => confirmation.remove(), 5000);

            // Counter download
            const countKey = "cvDownloadCount";
            const count = parseInt(localStorage.getItem(countKey) || "0") + 1;
            localStorage.setItem(countKey, count);
            console.log("Download CV numero:", count);
        });
    }
});

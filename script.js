document.addEventListener('DOMContentLoaded', function() {
    // Gestione del Dark Mode
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
          darkModeToggle.textContent = '☀️';
        } else {
          darkModeToggle.textContent = '🌙';
        }
      });
    }
  
    // Gestione del cambio lingua
    const langButtons = document.querySelectorAll('.lang-toggle');
    langButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const lang = btn.getAttribute('data-lang');
        document.body.classList.remove('lang-it', 'lang-en');
        document.body.classList.add('lang-' + lang);
      });
    });
  
    // Riavvio dell'animazione della hero al clic sul link "Home"
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          // Rimuove la classe per cancellare l'animazione precedente
          heroContent.classList.remove('animate');
          // Forza il reflow per assicurarsi che la rimozione sia registrata
          void heroContent.offsetWidth;
          // Riaggiunge la classe per far partire l'animazione da capo
          heroContent.classList.add('animate');
        }
      });
    });
  
 // Inizializza EmailJS
 emailjs.init("WSHgr3JUQ3d6aNCtq"); // 

    // Snippet CV
// document.getElementById('cv-request-form').addEventListener('submit', function (e) {
//    e.preventDefault();
const cvForm = document.getElementById('cv-request-form');
if (cvForm) {
  cvForm.addEventListener('submit', function (e) {
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
      'service_3py3qfs',     // es. "service_123abc"
      'template_no2x3aj',    // es. "template_456def"
      form                  // l'elemento form
    )
    .then(() => {
      console.log('Email inviata con successo!');
    }, (err) => {
      console.error('Errore invio email:', err);
    });


    // 3) Download del CV
    const lang = document.body.classList.contains("lang-it") ? "it" : "en";
    const base64CV = base64CVs[lang];
  
    // Decodifica
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
  
    // Pulizia form
    form.reset();
  
    // Messaggio di ringraziamento
    const confirmation = document.createElement("div");
    confirmation.textContent = lang === "it" ? "Grazie! Il tuo CV è stato scaricato con successo." : "Thank you! Your CV has been successfully downloaded.";
    confirmation.className = "cv-confirmation";
    form.appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 5000);
  
    // Contatore interno
    const countKey = "cvDownloadCount";
    const count = parseInt(localStorage.getItem(countKey) || "0") + 1;
    localStorage.setItem(countKey, count);
    console.log("Download CV numero:", count);
    });
}
});
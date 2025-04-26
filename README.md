# Portfolio di Riccardo Mechi

Sito web vetrina personale per presentare competenze e progetti di **Riccardo Mechi**, IT Project Manager e Full Stack Web Developer.

---

## 🚀 Panoramica

Questo progetto è un sito statico realizzato con HTML, CSS e JavaScript puro (`vanilla JS`), pensato per:

- Mostrare **hero section** di benvenuto con animazioni.
- Gestire **modalità Light/Dark** con salvataggio della preferenza.
- Offrire **supporto multi-lingua** (italiano/inglese) senza ricaricare la pagina.
- Esibire una sezione **Competenze** (Skills) con card interattive.
- Far provare una sezione **Portfolio** con anteprime dei progetti e pagine dettaglio dedicate.
- Includere un **form di contatto** che invia email tramite EmailJS e scarica automaticamente il CV PDF.

---

## 📁 Struttura del Progetto

```
/ (root)
├─ index.html              # Pagina principale
├─ project1.html…project5.html  # Pagine di dettaglio progetto
├─ styles.css              # Stili globali e variabili CSS
├─ css/
│   ├─ skills_section.css   # Stili dedicati alla sezione Skills
│   ├─ portfolio_section.css # Stili dedicati alla sezione Portfolio
|   └─ project_section.css  # Stili dedicati alla sezione Progetti
├─ script.js               # Script per Dark Mode, i18n, CV-download e invio email
├─ cv_simple_multi.js      # Snippet per download base64 PDF del CV
└─ assets/
    ├─ icons/              # Icone (Devicon, ecc.)
    └─ projects/           # Immagini placeholder o reali dei progetti
```

---

## 🛠️ Tecnologie Utilizzate

- **HTML5** per il markup semantico.
- **CSS3** con Custom Properties (variabili) per il tema chiaro/scuro e gradienti.
- **JavaScript (ES6+)** per:
  - Toggle **Dark/Light Mode**
  - Switch **Lingua** con `data-lang`
  - Animazioni con classi CSS
  - **Download** dinamico del PDF del CV (base64)
  - **Invio email** tramite [EmailJS SDK v4](https://www.emailjs.com)
- **Devicon** per le icone delle tecnologie.
- **EmailJS** per l’invio client-side delle email di contatto.

---

## ⚙️ Installazione e Deploy

1. **Clona il repository**
   ```bash
   git clone https://github.com/RiccardoMechi/portfolio-riccardo-mechi.git
   cd portfolio-riccardo-mechi
   ```

2. **Configura EmailJS se oltre a vedere il sito vuoi anche ospitare il tuo personale portfolio con form attivo**
   - Registra un account su https://www.emailjs.com.
   - Crea un servizio (es. Gmail o SMTP) e un template con le variabili: `name`, `email`, `message`.
   - Copia il tuo **Service ID**, **Template ID** e **Public Key**.
   - Nel `index.html`, sostituisci la public key in:
     ```html
     <script>
       emailjs.init('public_XXXXXXXXXXXX');
     </script>
     ```
   - In `script.js`, imposta i tuoi `service_id` e `template_id` in `emailjs.sendForm(...)`.

3. **Ottimizza Risorse** (opzionale ma consigliato)
   - Comprime immagini con [TinyPNG](https://tinypng.com) o ImageOptim.
   - Minifica `styles.css` e `script.js` per produzione.

4. **Pubblica**
   - Puoi farne il deploy su GitHub Pages, Netlify, Vercel o un qualsiasi hosting statico.

---

## 🎨 Personalizzazione

- **Colori & Tipografia**: modifica le [CSS custom properties](./styles.css) in `:root` e `.dark-mode`.
- **Lingue**: per aggiungere un’altra lingua, estendi gli attributi `data-lang="xx"` e lo script di switch.
- **Progetti**: duplica `project-template.html`, rinominalo, e aggiorna titoli, descrizioni e immagini.

---

## 📞 Contatti

- **Email**: riccardo.mechi@gmail.com
- **LinkedIn**: [linkedin.com/in/riccardo-mechi](https://linkedin.com/in/riccardo-mechi)

---

*Ready to deploy your personal portfolio?* 🎉



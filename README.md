# Aswath Darshan — Portfolio Website

[![Live Site](https://img.shields.io/badge/Live%20Site-aswath--darshan.github.io-00d4aa?style=flat&logo=github)](https://aswath-darshan.github.io/portfolio.io/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=black)](https://gsap.com)

A cinematic, fullscreen scroll-snap single-page portfolio — built entirely with vanilla HTML, CSS, and JavaScript. No frameworks. No build tools.

🔗 **Live:** https://aswath-darshan.github.io/portfolio.io/

---

## ✨ Features

| Section | What's in it |
|---------|-------------|
| **Hero** | Animated starfield canvas · Glitch-text name effect · Typing animation loop |
| **About** | Profile photo with animated orbital rings · Skill timeline |
| **Skills** | Interactive bento-grid (8 skills) · Explosion-from-center animation |
| **Projects** | Carousel of 3 projects · Live animated SVG signal visualizations |
| **Contact** | Validated contact form · Resume PDF download · Confetti on submit |

**Other details:**
- Custom cursor (dot + trailing ring)
- GSAP scroll-triggered animations
- Cinematic zoom transitions between sections
- Scroll-spy active nav highlighting
- Fully responsive — mobile hamburger nav

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — zero dependencies for the core site
- **GSAP 3 + ScrollTrigger** — scroll animations
- **Canvas API** — starfield (hero) + geometric shapes (contact background)
- **canvas-confetti** — contact form success effect
- **Google Fonts** — Poppins (300–900)

---

## 🗂️ File Structure

```
portfolio.io/
├── index.html          # Single-page app (5 sections, 361 lines)
├── style.css           # All styles + animations (27 KB)
├── script.js           # All interactivity + canvas effects (19 KB)
├── .gitignore
└── assets/
    ├── profile.jpg                # Profile photo
    └── Aswath_Darshan_Resume.pdf  # Downloadable resume
```

---

## 🚀 Running Locally

No build step needed — just open in browser:

```bash
git clone https://github.com/aswath-darshan/portfolio.io.git
cd portfolio.io
# Open index.html in your browser
```

Or use Live Server (VS Code extension) for hot reload.

---

## 📬 Contact Form Setup

The contact form uses [Formspree](https://formspree.io). To use your own endpoint:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. Replace the `action` attribute in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## 👤 Author

**Aswath Darshan K G**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-aswathdarshan-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/aswathdarshan)
[![Email](https://img.shields.io/badge/Email-aswathdarshan2007@gmail.com-blue?style=flat&logo=gmail)](mailto:aswathdarshan2007@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-aswath--darshan-181717?style=flat&logo=github)](https://github.com/aswath-darshan)

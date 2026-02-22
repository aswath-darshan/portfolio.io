/* ════════════════════════════════════════════
   ASWATH PORTFOLIO — CINEMATIC FULLSCREEN JS
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    const scrollContainer = document.getElementById('scrollContainer');
    const sections = document.querySelectorAll('.section');
    const navLinksAll = document.querySelectorAll('.nav-link');

    /* ═══════════ CUSTOM CURSOR ═══════════ */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* ═══════════ STARFIELD CANVAS ═══════════ */
    const starCanvas = document.getElementById('starfield');
    const starCtx = starCanvas.getContext('2d');
    let stars = [];

    function initStars() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                r: Math.random() * 1.8 + 0.3,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.8 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    initStars();
    window.addEventListener('resize', initStars);

    function drawStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        const time = Date.now() * 0.001;
        stars.forEach(s => {
            s.y -= s.speed;
            if (s.y < -5) { s.y = starCanvas.height + 5; s.x = Math.random() * starCanvas.width; }
            const alpha = s.opacity * (0.6 + 0.4 * Math.sin(time * 2 + s.pulse));
            const isTeal = Math.random() > 0.7;
            starCtx.beginPath();
            starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            starCtx.fillStyle = isTeal
                ? `rgba(0,212,170,${alpha})`
                : `rgba(228,228,231,${alpha * 0.6})`;
            starCtx.fill();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    /* ═══════════ GLITCH EFFECT ═══════════ */
    const glitchText = document.querySelector('.glitch-text');
    function triggerGlitch() {
        glitchText.classList.add('glitching');
        setTimeout(() => glitchText.classList.remove('glitching'), 300);
        setTimeout(triggerGlitch, 3000 + Math.random() * 5000);
    }
    setTimeout(triggerGlitch, 2000);

    /* ═══════════ TYPING ANIMATION ═══════════ */
    const phrases = [
        'AI that detects anomalies in signals',
        'LSTM fault detection from vibration data',
        'Fourier-SVD for biomedical signal processing',
        'Exploring deep learning at Amrita University'
    ];
    const typingEl = document.getElementById('typingText');
    let phraseIdx = 0, charIdx = 0, deleting = false;

    function typeLoop() {
        const current = phrases[phraseIdx];
        if (!deleting) {
            typingEl.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(typeLoop, 2200);
                return;
            }
            setTimeout(typeLoop, 50);
        } else {
            typingEl.textContent = current.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(typeLoop, 400);
                return;
            }
            setTimeout(typeLoop, 25);
        }
    }
    typeLoop();

    /* ═══════════ NAV CLICK → CINEMATIC ZOOM TRANSITION ═══════════ */
    function navigateTo(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        // Find current visible section
        const currentSection = [...sections].find(s => {
            const rect = s.getBoundingClientRect();
            return rect.top >= -100 && rect.top < window.innerHeight / 2;
        });

        if (currentSection && currentSection !== target) {
            // Zoom-out current
            currentSection.classList.add('zoom-out');

            // After zoom-out, scroll & zoom-in target
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.classList.add('zoom-in');

                setTimeout(() => {
                    currentSection.classList.remove('zoom-out');
                    target.classList.remove('zoom-in');
                }, 800);
            }, 400);
        } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Close mobile nav
        document.querySelector('.nav-links')?.classList.remove('open');
    }

    // Nav link clicks
    document.querySelectorAll('.nav-link, [data-nav]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href') || '#' + link.dataset.nav;
            const targetId = href.replace('#', '');
            navigateTo(targetId);
        });
    });

    // Logo click
    document.querySelector('.nav-logo')?.addEventListener('click', e => {
        e.preventDefault();
        navigateTo('home');
    });

    /* ═══════════ SCROLL-SPY (IntersectionObserver) ═══════════ */
    const spyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinksAll.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
                if (active) active.classList.add('active');

                // Trigger section-specific animations
                onSectionEnter(entry.target);
            }
        });
    }, {
        root: scrollContainer,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
    });

    sections.forEach(sec => spyObserver.observe(sec));

    /* ═══════════ SECTION ENTER ANIMATIONS ═══════════ */
    const animatedSections = new Set();

    function onSectionEnter(section) {
        const id = section.id;
        if (animatedSections.has(id)) return;
        animatedSections.add(id);

        if (id === 'about') animateAbout();
        if (id === 'skills') animateSkills();
        if (id === 'projects') animateProjects();
    }

    // Animate About timeline
    function animateAbout() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), 200 + i * 250);
        });
    }

    // Animate Skills — explosion from center
    function animateSkills() {
        const tiles = document.querySelectorAll('.skill-tile');
        tiles.forEach((tile, i) => {
            setTimeout(() => {
                tile.classList.add('exploded');
                tile.style.transition = `all .6s cubic-bezier(.34,1.56,.64,1) ${i * 0.08}s`;
            }, 100);
        });
    }

    // Animate Projects — show first card
    function animateProjects() {
        generateVibrationWave();
        generateSignalPaths();
    }

    /* ═══════════ PROJECT CAROUSEL ═══════════ */
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.remove('active', 'prev');
            if (i === index) s.classList.add('active');
            else if (i < index) s.classList.add('prev');
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentSlide = index;
    }

    document.getElementById('nextProject')?.addEventListener('click', () => {
        showSlide((currentSlide + 1) % slides.length);
    });
    document.getElementById('prevProject')?.addEventListener('click', () => {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') showSlide((currentSlide + 1) % slides.length);
        if (e.key === 'ArrowLeft') showSlide((currentSlide - 1 + slides.length) % slides.length);
    });

    /* ═══════════ VIBRATION WAVE (Project 1) ═══════════ */
    function generateVibrationWave() {
        const vibPath = document.getElementById('vibPath');
        const anomalyPath = document.getElementById('anomalyPath');
        if (!vibPath) return;

        let frame = 0;
        function drawWave() {
            frame++;
            let d = 'M0 50 ';
            let ad = 'M0 50 ';
            for (let x = 0; x <= 400; x += 2) {
                const y = 50 + Math.sin(x * 0.05 + frame * 0.08) * 20
                    + Math.sin(x * 0.12 + frame * 0.05) * 8;
                d += `L${x} ${y} `;

                // Anomaly spikes at intervals
                const isAnomaly = (x > 180 && x < 220) || (x > 320 && x < 350);
                const ay = isAnomaly
                    ? 50 + Math.sin(x * 0.3 + frame * 0.15) * 35
                    : y;
                ad += `L${x} ${ay} `;
            }
            vibPath.setAttribute('d', d);
            anomalyPath.setAttribute('d', ad);
            requestAnimationFrame(drawWave);
        }
        drawWave();
    }

    /* ═══════════ SIGNAL PATHS (Project 2) ═══════════ */
    function generateSignalPaths() {
        const noisyPaths = document.querySelectorAll('.noisy-path');
        const cleanPaths = document.querySelectorAll('.clean-path');

        let frame = 0;
        function drawSignals() {
            frame++;
            let noisy = 'M0 30 ';
            let clean = 'M0 30 ';
            for (let x = 0; x <= 200; x += 2) {
                const base = Math.sin(x * 0.06 + frame * 0.04) * 18;
                noisy += `L${x} ${30 + base + (Math.random() - 0.5) * 16} `;
                clean += `L${x} ${30 + base} `;
            }
            noisyPaths.forEach(p => p.setAttribute('d', noisy));
            cleanPaths.forEach(p => p.setAttribute('d', clean));
            requestAnimationFrame(drawSignals);
        }
        drawSignals();
    }

    /* ═══════════ GEOMETRY CANVAS (Contact) ═══════════ */
    const geoCanvas = document.getElementById('geoCanvas');
    const geoCtx = geoCanvas?.getContext('2d');
    let geoShapes = [];

    function initGeo() {
        if (!geoCanvas) return;
        geoCanvas.width = window.innerWidth;
        geoCanvas.height = window.innerHeight;
        geoShapes = [];
        for (let i = 0; i < 25; i++) {
            geoShapes.push({
                x: Math.random() * geoCanvas.width,
                y: Math.random() * geoCanvas.height,
                size: Math.random() * 40 + 15,
                speed: Math.random() * 0.3 + 0.05,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.01,
                type: Math.floor(Math.random() * 3), // 0=circle, 1=triangle, 2=square
                opacity: Math.random() * 0.08 + 0.02,
                color: Math.random() > 0.5 ? '0,212,170' : '139,92,246'
            });
        }
    }
    initGeo();
    window.addEventListener('resize', initGeo);

    function drawGeo() {
        if (!geoCtx) return;
        geoCtx.clearRect(0, 0, geoCanvas.width, geoCanvas.height);
        geoShapes.forEach(s => {
            s.y -= s.speed;
            s.rotation += s.rotSpeed;
            if (s.y < -s.size) { s.y = geoCanvas.height + s.size; s.x = Math.random() * geoCanvas.width; }

            geoCtx.save();
            geoCtx.translate(s.x, s.y);
            geoCtx.rotate(s.rotation);
            geoCtx.strokeStyle = `rgba(${s.color},${s.opacity})`;
            geoCtx.lineWidth = 1.5;

            if (s.type === 0) {
                geoCtx.beginPath();
                geoCtx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
                geoCtx.stroke();
            } else if (s.type === 1) {
                geoCtx.beginPath();
                geoCtx.moveTo(0, -s.size / 2);
                geoCtx.lineTo(s.size / 2, s.size / 2);
                geoCtx.lineTo(-s.size / 2, s.size / 2);
                geoCtx.closePath();
                geoCtx.stroke();
            } else {
                geoCtx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
            }
            geoCtx.restore();
        });
        requestAnimationFrame(drawGeo);
    }
    drawGeo();

    /* ═══════════ MOBILE NAV TOGGLE ═══════════ */
    document.getElementById('navToggle')?.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('open');
    });

    /* ═══════════ CONTACT FORM VALIDATION ═══════════ */
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const messageInput = document.getElementById('formMessage');
    const sendBtn = document.getElementById('sendBtn');

    function validateField(input, errorId, validator) {
        const value = input.value.trim();
        const error = validator(value);
        const errorSpan = document.getElementById(errorId);
        if (error) {
            input.classList.add('invalid'); input.classList.remove('valid');
            errorSpan.textContent = error; return false;
        } else if (value) {
            input.classList.remove('invalid'); input.classList.add('valid');
            errorSpan.textContent = ''; return true;
        } else {
            input.classList.remove('invalid', 'valid');
            errorSpan.textContent = ''; return false;
        }
    }

    nameInput?.addEventListener('input', () =>
        validateField(nameInput, 'nameError', v => !v ? 'Name is required' : null)
    );
    emailInput?.addEventListener('input', () =>
        validateField(emailInput, 'emailError', v => {
            if (!v) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email';
            return null;
        })
    );
    messageInput?.addEventListener('input', () =>
        validateField(messageInput, 'messageError', v => !v ? 'Message is required' : null)
    );

    form?.addEventListener('submit', e => {
        e.preventDefault();
        const v1 = validateField(nameInput, 'nameError', v => !v ? 'Name is required' : null);
        const v2 = validateField(emailInput, 'emailError', v => {
            if (!v) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email';
            return null;
        });
        const v3 = validateField(messageInput, 'messageError', v => !v ? 'Message is required' : null);
        if (!v1 || !v2 || !v3) return;

        const btnText = sendBtn.querySelector('.btn-text');
        const btnLoader = sendBtn.querySelector('.btn-loader');
        btnText.textContent = 'Sending...';
        btnLoader.hidden = false;
        sendBtn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    // Screen shake!
                    document.querySelector('.section-contact').classList.add('shake');
                    setTimeout(() => document.querySelector('.section-contact').classList.remove('shake'), 600);

                    btnText.textContent = 'Sent! ✓';
                    btnLoader.hidden = true;
                    form.reset();
                    [nameInput, emailInput, messageInput].forEach(i => i.classList.remove('valid', 'invalid'));

                    // Confetti!
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: 150, spread: 90, origin: { y: 0.6 },
                            colors: ['#00d4aa', '#8b5cf6', '#2dd4bf', '#a855f7']
                        });
                    }
                    setTimeout(() => { btnText.textContent = 'Send Message'; sendBtn.disabled = false; }, 3000);
                } else { throw new Error(); }
            })
            .catch(() => {
                btnText.textContent = 'Error — Retry';
                btnLoader.hidden = true; sendBtn.disabled = false;
                setTimeout(() => { btnText.textContent = 'Send Message'; }, 3000);
            });
    });

    /* ═══════════ TRIGGER HOME SECTION IMMEDIATELY ═══════════ */
    animatedSections.add('home');

    /* ═══════════ NAVBAR BG ON SCROLL ═══════════ */
    scrollContainer.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        navbar.style.background = scrollContainer.scrollTop > 50
            ? 'rgba(10,10,10,.9)' : 'rgba(10,10,10,.6)';
    }, { passive: true });

});

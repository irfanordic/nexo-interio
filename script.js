document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// WhatsApp 
const WHATSAPP_NUMBER = '919999999999';
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get('name').trim();
    const phone = data.get('phone').trim();
    const service = data.get('service');
    const message = data.get('message').trim();

    if (!name || !phone) {
        formNote.textContent = 'Please add your name and phone number.';
        return;
    }

    const text =
        `Hi Nexo Interio, I'm ${name}.%0A` +
        `Phone: ${phone}%0A` +
        `Interested in: ${service}%0A` +
        (message ? `Message: ${message}` : '');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');

    formNote.textContent = 'Opening WhatsApp…';
    contactForm.reset();
});

// Scroll 
const revealElements = document.querySelectorAll('section, .service-card, .gallery-item');

revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealOnScroll.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();


const siteHeader = document.querySelector('.site-header');
const toggleHeaderStyle = () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
};
toggleHeaderStyle();
window.addEventListener('scroll', toggleHeaderStyle, { passive: true });


const revealTargets = document.querySelectorAll(
    '.about-grid, .build-row, .why-list li, .process-list li, .gallery-item'
);
revealTargets.forEach(el => el.classList.add('reveal'));


document.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.style.setProperty('--i', i);
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => revealObserver.observe(el));
} else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
}

document.querySelectorAll('.build-cta[data-service]').forEach(link => {
    link.addEventListener('click', () => {
        const select = document.querySelector('#contactForm select[name="service"]');
        if (select) select.value = link.dataset.service;
    });
});

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


const WHATSAPP_NUMBER = '91999999999';
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
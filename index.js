/* ------- Hamburger menu ------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
});

function closeMobile() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
}

/* ------- Scroll reveal ------- */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
    }
    });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ------- Navbar shadow on scroll ------- */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 30px rgba(13,27,62,.15)'
    : '0 2px 20px rgba(13,27,62,.1)';
});

/* ------- Form submit ------- */
function submitForm() {
    const fname   = document.getElementById('fname').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!fname || !phone || !service || !message) {
    showToast('⚠️ Please fill in all required fields.', false);
    return;
    }

    // Build WhatsApp message
    const lname   = document.getElementById('lname').value.trim();
    const email   = document.getElementById('email').value.trim();
    const text = encodeURIComponent(
    `Hello Branmanagers Logistics,\n\nName: ${fname} ${lname}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nMessage: ${message}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/254710977280?text=${text}`, '_blank');
    showToast('✅ Redirecting to WhatsApp…', true);

    // Clear form
    ['fname','lname','phone','email','message'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('service').value = '';
}

function showToast(msg, success) {
    const toast   = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.style.background = success ? '#0d1b3e' : '#c0392b';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}
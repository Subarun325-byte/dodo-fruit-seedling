// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navActions.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const isLight = body.classList.contains('light-mode');
    if (window.scrollY > 50) {
        navbar.style.background = isLight ? 'rgba(248, 250, 252, 0.98)' : 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = isLight ? 'rgba(248, 250, 252, 0.95)' : 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu
            navLinks.classList.remove('active');
        }
    });
});

// WhatsApp Order Integration
function sendWhatsAppOrder(seedlingName, quantity) {
    const message = `Maayong adlaw DODO! Gusto ko mag-order ug seedlings.\n\nSeedling: ${seedlingName}\nQuantity: ${quantity || '1'}`;
    const whatsappUrl = `https://wa.me/639156108345?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .seedling-card, .feature-card, .contact-item, .contact-btn {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .seedling-card.animate, .feature-card.animate, .contact-item.animate, .contact-btn.animate {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.active {
        display: flex !important;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.98);
        flex-direction: column;
        padding: 20px;
        gap: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    body.light-mode .nav-links.active {
        background: rgba(248, 250, 252, 0.98);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .nav-actions.active {
        display: flex !important;
        position: absolute;
        top: calc(70px + 160px);
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.98);
        justify-content: center;
        padding: 16px 20px;
        gap: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    body.light-mode .nav-actions.active {
        background: rgba(248, 250, 252, 0.98);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .mobile-menu i.fa-times {
        color: var(--primary);
    }
`;
document.head.appendChild(style);

// Observe elements
document.querySelectorAll('.seedling-card, .feature-card, .contact-item, .contact-btn').forEach(el => {
    observer.observe(el);
});

// Initialize
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

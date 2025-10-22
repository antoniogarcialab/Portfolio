// Smooth scrolling para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll suave para botones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Efecto parallax en el fondo
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-animation');
    background.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Animación de typing para el subtítulo
const typingTexts = [
    'Desarrollador Full Stack',
    'Diseñador UI/UX',
    'Creador de Experiencias Digitales',
    'Apasionado por la Tecnología'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 50;
let pauseDelay = 2000;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typingElement) return;

    const currentText = typingTexts[currentTextIndex];

    if (isDeleting) {
        // Eliminando texto
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingDelay = deletingDelay;
    } else {
        // Escribiendo texto
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingDelay = 100;
    }

    // Control de estados
    if (!isDeleting && currentCharIndex === currentText.length) {
        // Pausa al final del texto
        typingDelay = pauseDelay;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        // Cambiar al siguiente texto
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typingDelay = 500;
    }

    // Efecto de cursor parpadeante
    cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';

    setTimeout(typeText, typingDelay);
}

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador a elementos animables
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar animación de typing
    setTimeout(typeText, 1000);

    // Observar elementos para animaciones al scroll
    const animatedElements = document.querySelectorAll('.project-card, .visual-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto de partículas en el hero (opcional)
    createParticles();
});

// Efecto de partículas simples
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        heroSection.appendChild(particle);
    }
}

// Validación del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;

        // Validación básica
        if (!name || !email || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        // Simular envío (en un caso real, aquí iría una petición fetch)
        showNotification('¡Mensaje enviado! Te contactaré pronto.', 'success');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.2);
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efecto de retroiluminación en tarjetas al hover
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .visual-card, .contact-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});

// Añadir estilos CSS dinámicos para el efecto de retroiluminación
const style = document.createElement('style');
style.textContent = `
    .project-card, .visual-card, .contact-card {
        position: relative;
        overflow: hidden;
    }
    
    .project-card::before, .visual-card::before, .contact-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.1),
            transparent 40%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .project-card:hover::before, .visual-card:hover::before, .contact-card:hover::before {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Contador animado para las estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
        }, 30);
    });
}

// Iniciar contadores cuando la sección hero sea visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Modo oscuro/claro (opcional - se puede activar con una tecla)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'd') {
        document.body.classList.toggle('light-mode');
    }
});

// Añadir estilos para modo claro
const lightModeStyles = `
    .light-mode {
        --text-primary: #1e293b;
        --text-secondary: #475569;
        --bg-primary: #f8fafc;
        --bg-secondary: #e2e8f0;
        --bg-glass: rgba(255, 255, 255, 0.8);
        --bg-glass-dark: rgba(0, 0, 0, 0.05);
        --border-glass: rgba(0, 0, 0, 0.1);
    }
`;
style.textContent += lightModeStyles;
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        header.style.backgroundColor = 'var(--secondary-color)';
    }
});

// Add fade-in effect to sections on scroll
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
            // Add subtle animation to elements inside the section
            const elements = entry.target.querySelectorAll('.skill-card, .project-card, .social-link');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.classList.add('hidden');
    // Initialize elements with opacity 0
    const elements = section.querySelectorAll('.skill-card, .project-card, .social-link');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    sectionObserver.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message with animation
    const button = this.querySelector('button');
    button.innerHTML = 'تم الإرسال بنجاح!';
    button.style.backgroundColor = '#00cc70';
    
    setTimeout(() => {
        button.innerHTML = 'إرسال';
        button.style.backgroundColor = '';
        this.reset();
    }, 2000);
});

// Add animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Terminal typing effect
const terminalLines = document.querySelectorAll('.terminal-line');
let currentLine = 0;

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

async function animateTerminal() {
    for (const line of terminalLines) {
        const command = line.querySelector('.command');
        const output = line.querySelector('.output');
        
        if (command) {
            await typeWriter(command, command.textContent);
        }
        
        if (output) {
            await new Promise(resolve => setTimeout(resolve, 500));
            await typeWriter(output, output.textContent);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Start terminal animation when page loads
window.addEventListener('load', animateTerminal);

// About section animation
const aboutTerminal = document.querySelector('.about-terminal');
const aboutLines = aboutTerminal.querySelectorAll('.terminal-line');

async function animateAboutSection() {
    for (const line of aboutLines) {
        const command = line.querySelector('.command');
        const output = line.querySelector('.output');
        
        if (command) {
            await typeWriter(command, command.textContent);
        }
        
        if (output) {
            await new Promise(resolve => setTimeout(resolve, 300));
            await typeWriter(output, output.textContent);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

// Start animations when elements are in view
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateAboutSection();
            aboutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

aboutObserver.observe(aboutTerminal);

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', `${progress}%`);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(bar);
    });
}

// Initialize skill bars animation
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
});

// Add hover effect to skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const bar = item.querySelector('.skill-bar');
        bar.style.transform = 'scaleX(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        const bar = item.querySelector('.skill-bar');
        bar.style.transform = 'scaleX(1)';
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navContainer = document.querySelector('.nav-container');

menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
        navContainer.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    }
});

// Theme management
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// تحميل السمة المحفوظة
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
    } else {
        // استخدام تفضيلات النظام
        if (prefersDarkScheme.matches) {
            document.body.classList.remove('light-theme');
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        } else {
            document.body.classList.add('light-theme');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    }
}

// تبديل السمة
function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (isLight) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// استماع لتغييرات تفضيلات النظام
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.remove('light-theme');
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        } else {
            document.body.classList.add('light-theme');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    }
});

// إضافة مستمع الحدث لزر تبديل السمة
themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTheme();
});

// تحميل السمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    console.log('Theme loaded:', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Language Management
let currentLang = localStorage.getItem('language') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = translations[lang];
        for (const key of keys) {
            value = value[key];
        }
        if (value) {
            element.textContent = value;
        }
    });
    
    // Update current language display
    const currentLangElement = document.querySelector('.current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = {
            'ar': 'العربية',
            'en': 'English',
            'de': 'Deutsch',
            'tr': 'Türkçe'
        }[lang];
    }
    
    // Update active state in language dropdown
    document.querySelectorAll('.language-dropdown a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-lang') === lang);
    });
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    // Add click event listeners to language options
    document.querySelectorAll('.language-dropdown a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}); 
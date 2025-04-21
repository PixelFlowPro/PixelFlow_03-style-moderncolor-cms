const toggleMobileMenu = () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
};

const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
        toggleMobileMenu();
    }
};

const handleScroll = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('shadow-md', window.scrollY > 10);
};

const observeFadeIns = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-in').forEach(element => observer.observe(element));
};

const initNavigation = () => {
    document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    window.addEventListener('scroll', handleScroll);
    observeFadeIns();
};

document.addEventListener('DOMContentLoaded', initNavigation);
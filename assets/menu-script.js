// Menu sanduíche para mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    if (!hamburgerMenu || !navLinks || !navOverlay) return;

    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburgerMenu.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar em um link
    const navButtons = navLinks.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', closeMenu);
    });
});
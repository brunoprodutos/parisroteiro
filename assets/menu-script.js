// Menu sanduíche para mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    // Verificar se elementos existem
    if (!hamburgerMenu || !navLinks || !navOverlay) {
        console.log('Menu elements not found');
        return;
    }

    console.log('Menu script loaded successfully');

    function toggleMenu() {
        console.log('Toggle menu clicked');
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        console.log('Closing menu');
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    hamburgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar em um link
    const navButtons = navLinks.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', closeMenu);
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Verificar redimensionamento da tela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
// Menu sanduíche para mobile
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing menu...');

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    // Verificar se elementos existem
    if (!hamburgerMenu || !navLinks || !navOverlay) {
        console.error('Menu elements not found:', {
            hamburgerMenu: !!hamburgerMenu,
            navLinks: !!navLinks,
            navOverlay: !!navOverlay
        });
        return;
    }

    console.log('Menu elements found successfully');
    console.log('Hamburger menu style:', getComputedStyle(hamburgerMenu).display);

    // Garantir que o menu seja clicável
    hamburgerMenu.style.pointerEvents = 'all';
    hamburgerMenu.style.userSelect = 'none';

    function toggleMenu() {
        console.log('🎯 Toggle menu clicked!');
        const isActive = navLinks.classList.contains('active');

        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        console.log('🔓 Opening menu');
        hamburgerMenu.classList.add('active');
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        console.log('🔒 Closing menu');
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners múltiplos para garantir funcionamento
    hamburgerMenu.addEventListener('click', function(e) {
        console.log('📱 Hamburger clicked via click event');
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    hamburgerMenu.addEventListener('touchstart', function(e) {
        console.log('👆 Hamburger touched via touchstart');
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Adicionar evento às linhas também
    const hamburgerLines = hamburgerMenu.querySelectorAll('.hamburger-line');
    hamburgerLines.forEach(line => {
        line.addEventListener('click', function(e) {
            console.log('📏 Line clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
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
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });

    // Debug: verificar cliques em geral
    document.addEventListener('click', function(e) {
        console.log('🖱️ Document click:', e.target.className, e.target.id);
    });
});
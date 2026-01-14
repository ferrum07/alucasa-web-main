// ========================================
// ALUCASA - MAIN.JS
// Funcionalidades generales del sitio
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============ MENÚ HAMBURGUESA ============
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                nav.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Evitar scroll
            } else {
                nav.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.checked = false;
                nav.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    
    // ============ BOTÓN WHATSAPP FLOTANTE ============
    createWhatsAppButton();
    
    
    // ============ ANIMACIONES AL SCROLL ============
    observeElements();
    
    
    // ============ SMOOTH SCROLL ============
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
    
    
    // ============ FORMULARIO WHATSAPP ============
    const whatsappForm = document.querySelector('.contact-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre')?.value || '';
            const telefono = document.getElementById('telefono')?.value || '';
            const opcion = document.getElementById('opcion')?.value || '';
            const mensaje = document.getElementById('mensaje')?.value || '';
            
            let textoFinal = '';
            
            if (opcion && opcion !== '') {
                textoFinal = opcion;
                if (nombre) textoFinal += `\n\nNombre: ${nombre}`;
                if (telefono) textoFinal += `\nTeléfono: ${telefono}`;
            } else if (mensaje) {
                textoF

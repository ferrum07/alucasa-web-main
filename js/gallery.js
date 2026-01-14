// ========================================
// ALUCASA - GALLERY.JS
// Sistema de galería con filtros y lightbox
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Solo ejecutar si estamos en la página de galería
    if (!document.querySelector('.gallery-filters')) return;
    
    initGallery();
    initLightbox();
    
});


// ============ INICIALIZAR GALERÍA ============
function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar items
            filterGalleryItems(galleryItems, filter);
        });
    });
}


// ============ FILTRAR ITEMS ============
function filterGalleryItems(items, filter) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'todos' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}


// ============ LIGHTBOX (ZOOM DE IMÁGENES) ============
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            openLightbox(img.src, img.alt, index, galleryImages);
        });
        
        // Hacer las imágenes clickeables visualmente
        img.style.cursor = 'pointer';
    });
}


// ============ ABRIR LIGHTBOX ============
function openLightbox(imageSrc, imageAlt, currentIndex, allImages) {
    // Crear overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Cerrar">&times;</button>
            <button class="lightbox-prev" aria-label="Anterior">&lsaquo;</button>
            <button class="lightbox-next" aria-label="Siguiente">&rsaquo;</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
            <p class="lightbox-caption">${imageAlt}</p>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Mostrar con animación
    setTimeout(() => lightbox.classList.add('active'), 10);
    
    // Event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Navegación
    const visibleImages = Array.from(allImages).filter(img => 
        img.closest('.gallery-item').style.display !== 'none'
    );
    
    let currentIdx = Array.from(visibleImages).indexOf(allImages[currentIndex]);
    
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + visibleImages.length) % visibleImages.length;
        updateLightboxImage(lightbox, visibleImages[currentIdx]);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % visibleImages.length;
        updateLightboxImage(lightbox, visibleImages[currentIdx]);
    });
    
    // Teclado
    document.addEventListener('keydown', handleLightboxKeyboard);
}


// ============ CERRAR LIGHTBOX ============
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-overlay');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }, 300);
    
    document.removeEventListener('keydown', handleLightboxKeyboard);
}


// ============ ACTUALIZAR IMAGEN LIGHTBOX ============
function updateLightboxImage(lightbox, newImage) {
    const img = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = newImage.src;
        img.alt = newImage.alt;
        caption.textContent = newImage.alt;
        img.style.opacity = '1';
    }, 200);
}


// ============ TECLADO EN LIGHTBOX ============
function handleLightboxKeyboard(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev')?.click();
    if (e.key === 'ArrowRight') document.querySelector('.lightbox-next')?.click();
}


// ============ ESTILOS DEL LIGHTBOX ============
(function addLightboxStyles() {
    if (document.getElementById('lightbox-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'lightbox-styles';
    style.textContent = `
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-overlay.active {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
            transition: opacity 0.2s ease;
        }
        
        .lightbox-caption {
            color: white;
            margin-top: 15px;
            font-size: 1.1em;
            text-align: center;
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.3);
            color: white;
            font-size: 2em;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
            z-index: 10001;
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255,255,255,0.2);
            transform: scale(1.1);
        }
        
        .lightbox-close {
            top: 20px;
            right: 20px;
            font-size: 2.5em;
            line-height: 0.8;
        }
        
        .lightbox-prev {
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-next {
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        @media (max-width: 600px) {
            .lightbox-prev,
            .lightbox-next {
                font-size: 1.5em;
                padding: 8px 15px;
            }
            .lightbox-close {
                font-size: 2em;
                top: 10px;
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
})();

// language-switcher.js - Selector de idiomas integrado en el menú

document.addEventListener('DOMContentLoaded', function() {
    
    // Detectar la ruta actual
    const currentPath = window.location.pathname;
    const isGalego = currentPath.includes('/gl/');
    
    // Obtener el nombre del archivo actual
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    // Mapeo de archivos ES <-> GL
    const fileMap = {
        'index.html': 'index.html',
        'servicios.html': 'servizos.html',
        'empresa.html': 'empresa.html',
        'galeria.html': 'galeria.html',
        'contacto.html': 'contacto.html'
    };
    
    const fileMapReverse = {
        'index.html': 'index.html',
        'servizos.html': 'servicios.html',
        'empresa.html': 'empresa.html',
        'galeria.html': 'galeria.html',
        'contacto.html': 'contacto.html'
    };
    
    // Construir las URLs
    let urlES, urlGL;
    
    if (isGalego) {
        const esFileName = fileMapReverse[fileName] || 'index.html';
        urlES = '../' + esFileName;
        urlGL = fileName;
    } else {
        const glFileName = fileMap[fileName] || 'index.html';
        urlES = fileName;
        urlGL = 'gl/' + glFileName;
    }
    
    // Buscar el <nav> en el header
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Crear contenedor de idiomas
    const langContainer = document.createElement('div');
    langContainer.className = 'language-selector';
    
    // Botón ES
    const btnES = document.createElement('a');
    btnES.href = urlES;
    btnES.textContent = 'ES';
    btnES.className = isGalego ? 'lang-link' : 'lang-link active';
    
    // Separador
    const separator = document.createElement('span');
    separator.textContent = '|';
    separator.className = 'lang-separator';
    
    // Botón GL
    const btnGL = document.createElement('a');
    btnGL.href = urlGL;
    btnGL.textContent = 'GL';
    btnGL.className = isGalego ? 'lang-link active' : 'lang-link';
    
    // Añadir al contenedor
    langContainer.appendChild(btnES);
    langContainer.appendChild(separator);
    langContainer.appendChild(btnGL);
    
    // Añadir al nav
    nav.appendChild(langContainer);
    
});

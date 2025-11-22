// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = async (selector, url) => {
    try {
        const res = await fetch(url);
        if(!res.ok) return;
        const html = await res.text();
        const el = document.querySelector(selector);
        if(el) el.innerHTML = html;
    } catch (e) { console.error('Error cargando componente', url, e); }
    };

  // Cargar header/footer desde componentes
    loadComponent('#site-header', 'componentes/header.html');
    loadComponent('#site-footer', 'componentes/footer.html');

  // Inicializar productos y carrito si los métodos existen
    if(window.renderProductos) window.renderProductos('#productos-contenedor');
    if(window.renderMiniCarrito) window.renderMiniCarrito('#mini-carrito');

  // Toggle mini carrito cuando se hace click en el enlace
    document.body.addEventListener('click', e => {
    const target = e.target;
    if(target && (target.id === 'open-carrito' || target.closest && target.closest('#open-carrito'))){
        const mini = document.getElementById('mini-carrito');
        if(!mini) return;
        mini.style.display = (mini.style.display === 'block') ? 'none' : 'block';
    }
    });
});

// js/productos.js
// Maneja la carga de productos desde data/productos.json
const PRODUCTS_URL = 'data/productos.json';

function fetchProductos(){
    return fetch(PRODUCTS_URL)
    .then(r => {
        if(!r.ok) throw new Error('No se pudo cargar productos');
        return r.json();
    })
}

function renderProductos(selector){
    const cont = document.querySelector(selector);
    if(!cont) return;
    cont.innerHTML = '<p>Cargando productos...</p>';
    fetchProductos()
    .then(productos => {
        cont.innerHTML = '';
        productos.forEach(p => {
        const card = document.createElement('article');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}" class="producto-img">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p class="precio">$ ${Number(p.precio).toLocaleString()}</p>
            <div style="margin-top:auto;display:flex;gap:.5rem">
            <button class="btn btn-primary btn-agregar" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}">Agregar</button>
            <button class="btn btn-outline btn-detalle" data-id="${p.id}">Ver</button>
            </div>
        `;
        cont.appendChild(card);
        });
      // delegación eventos
        cont.addEventListener('click', e => {
        if(e.target.matches('.btn-agregar')){
            const id = e.target.dataset.id;
            const nombre = e.target.dataset.nombre;
            const precio = Number(e.target.dataset.precio);
            if(window && typeof window.carritoAdd === 'function'){
            window.carritoAdd({ id, nombre, precio, cantidad: 1 });
            }
        }
        });
    })
    .catch(err => { cont.innerHTML = '<p>Error cargando productos.</p>'; console.error(err); })
}

// Exponer funciones en el scope global para uso desde HTML sin módulos
window.fetchProductos = fetchProductos;
window.renderProductos = renderProductos;
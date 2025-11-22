// js/productos.js
// Maneja la carga de productos desde data/productos.json
const PRODUCTS_URL = 'data/productos.json';
let productosData = [];

function fetchProductos(){
    return fetch(PRODUCTS_URL)
    .then(r => {
        if(!r.ok) throw new Error('No se pudo cargar productos');
        return r.json();
    })
    .then(data => {
        productosData = data; // guardo productos para buscarlos luego
        return data;
    });
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
                    <button class="btn btn-primary btn-agregar"
                        data-id="${p.id}"
                        data-nombre="${p.nombre}"
                        data-precio="${p.precio}">
                        Agregar
                    </button>

                    <button class="btn btn-outline btn-detalle" data-id="${p.id}">
                        Ver
                    </button>
                </div>
            `;
            cont.appendChild(card);
        });

        // Delegación de eventos
        cont.addEventListener('click', e => {

            // Botón Agregar
            if(e.target.matches('.btn-agregar')){
                const id = e.target.dataset.id;
                const nombre = e.target.dataset.nombre;
                const precio = Number(e.target.dataset.precio);
                window.carritoAdd({ id, nombre, precio, cantidad: 1 });
            }

            // Botón Ver (modal)
            if(e.target.matches('.btn-detalle')){
                const id = Number(e.target.dataset.id);
                const prod = productosData.find(x => x.id === id);
                if(prod) abrirModal(prod);
            }

        });
    })
    .catch(err => {
        cont.innerHTML = '<p>Error cargando productos.</p>';
        console.error(err);
    });
}


// ====== MODAL ======= //

function abrirModal(producto){
    document.getElementById("modal-img").src = producto.img;
    document.getElementById("modal-nombre").textContent = producto.nombre;
    document.getElementById("modal-descripcion").textContent = producto.descripcion;
    document.getElementById("modal-precio").textContent = "$ " + producto.precio.toLocaleString();

    const modal = document.getElementById("modal-detalle");
    modal.style.display = "flex";

    // evento para agregar al carrito desde el modal
    document.getElementById("modal-agregar").onclick = () => {
        window.carritoAdd({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    };
}

// Cerrar modal
document.addEventListener("click", e => {
    if(e.target.id === "modal-detalle" || e.target.id === "modal-cerrar"){
        document.getElementById("modal-detalle").style.display = "none";
    }
});

// Exponer funciones
window.fetchProductos = fetchProductos;
window.renderProductos = renderProductos;
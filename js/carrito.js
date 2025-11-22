// js/carrito.js
// Carrito simple con localStorage y render en #mini-carrito
const CARRITO_KEY = 'mi_refugio_carrito_v1';
let carrito = JSON.parse(localStorage.getItem(CARRITO_KEY) || '[]');

function save(){ localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito)); updateCount(); }
function updateCount(){ const count = carrito.reduce((s,i)=> s + Number(i.cantidad),0); const el = document.getElementById('carrito-count'); if(el) el.textContent = count; }

function carritoAdd(item){
    const idx = carrito.findIndex(x => String(x.id) === String(item.id));
    if(idx>=0) carrito[idx].cantidad = Number(carrito[idx].cantidad) + Number(item.cantidad);
    else carrito.push({ ...item, cantidad: Number(item.cantidad) });
    save(); renderMiniCarrito('#mini-carrito');
}

function carritoRemove(id){ carrito = carrito.filter(x=> String(x.id)!==String(id)); save(); renderMiniCarrito('#mini-carrito'); }
function carritoUpdateCantidad(id, qty){ const p = carrito.find(x=>String(x.id)===String(id)); if(!p) return; p.cantidad = Number(qty); if(p.cantidad<=0) carritoRemove(id); save(); renderMiniCarrito('#mini-carrito'); }
function carritoClear(){ carrito = []; save(); renderMiniCarrito('#mini-carrito'); }
function carritoTotal(){ return carrito.reduce((acc,p)=> acc + (Number(p.precio)*Number(p.cantidad)),0); }

// Exponer en window para evitar uso de módulos
window.carritoAdd = carritoAdd; window.carritoRemove = carritoRemove; window.carritoUpdateCantidad = carritoUpdateCantidad; window.carritoClear = carritoClear; window.guardarCarrito = save;

function renderMiniCarrito(selector){
    const cont = document.querySelector(selector);
    if(!cont) return;
    if(!carrito.length){ cont.innerHTML = '<p>Carrito vacío</p>'; updateCount(); return; }
    cont.innerHTML = '';
    carrito.forEach(p => {
        const row = document.createElement('div'); row.className = 'mini-row';
        row.innerHTML = `<div class="mini-nombre">${p.nombre}</div>
        <div class="mini-cant">
            <button class="mini-q" data-action="dec" data-id="${p.id}">-</button>
            <span>${p.cantidad}</span>
            <button class="mini-q" data-action="inc" data-id="${p.id}">+</button>
        </div>
        <div class="mini-precio">$${(p.precio * p.cantidad).toLocaleString()}</div>
        <button class="mini-eliminar" data-id="${p.id}">x</button>`;
        cont.appendChild(row);
    });
    const footer = document.createElement('div'); footer.className = 'mini-total';
    footer.innerHTML = `<div><strong>Total:</strong> $${carritoTotal().toLocaleString()}</div><div><button id="btn-checkout">Pagar</button></div>`;
    cont.appendChild(footer);

    // eventos
    cont.querySelectorAll('.mini-eliminar').forEach(b=> b.addEventListener('click', e=> carritoRemove(e.target.dataset.id)));
    cont.querySelectorAll('.mini-q').forEach(b=> b.addEventListener('click', e=>{
        const id = e.target.dataset.id; const action = e.target.dataset.action; const prod = carrito.find(x=>String(x.id)===String(id)); if(!prod) return;
        if(action==='inc') carritoUpdateCantidad(id, prod.cantidad + 1);
        if(action==='dec') carritoUpdateCantidad(id, prod.cantidad - 1);
    }));

    const checkoutBtn = document.getElementById('btn-checkout');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío');
                return;
            }

            alert('¡Compra realizada con éxito!');
            carrito = [];
            save();
            renderMiniCarrito('#mini-carrito');
        });
    }
    updateCount();
}

// Exponer render en window
window.renderMiniCarrito = renderMiniCarrito;
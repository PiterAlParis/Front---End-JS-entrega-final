// js/utils.js
function formatPeso(numero){
return Number(numero).toLocaleString('es-AR');
}

function qs(selector){ return document.querySelector(selector); }
function qsa(selector){ return Array.from(document.querySelectorAll(selector)); }

// Exponer utilidades globalmente
window.formatPeso = formatPeso;
window.qs = qs;
window.qsa = qsa;
/* =========================================================
   SUPABASE
========================================================= */
const supabaseUrl = "https://czqylvofewjvhqsyjhwl.supabase.co";
const supabaseKey = "sb_publishable_M_pl2tHR3S8zWhN-awxXDQ_LiyDYXWI";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

/* =========================================================
   IDIOMA
========================================================= */
let currentLang = "EN";

/* =========================================================
   TRADUCCIONES (recortado para brevedad, deja el tuyo igual)
========================================================= */
const translations = { /* 👈 DEJA TODO TU BLOQUE ORIGINAL */ };

/* =========================================================
   FUNCIONES BASE
========================================================= */
function parseLocalDate(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

/* =========================================================
   CALCULAR DÍAS
========================================================= */
function calcularDias(fechaInicio, fechaFin) {
    const d1 = parseLocalDate(fechaInicio);
    const d2 = parseLocalDate(fechaFin);

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    return Math.floor((d2 - d1) / milisegundosPorDia) + 1;
}

/* =========================================================
   💰 NUEVA LÓGICA DE PRECIOS (TUYA)
========================================================= */
function obtenerPrecioTotal(dias) {

    const tabla = {
        1: 15, 2: 23, 3: 30, 4: 35, 5: 40, 6: 44,
        7: 47, 8: 49, 9: 50, 10: 51, 11: 53, 12: 55,
        13: 57, 14: 59, 15: 61, 16: 63, 17: 64,
        18: 67, 19: 69, 20: 72, 21: 75, 22: 78,
        23: 82, 24: 85, 25: 88, 26: 91, 27: 95,
        28: 98, 29: 101, 30: 104
    };

    if (dias <= 30) {
        return tabla[dias] || 0;
    }

    // 31+ → sigue +3 por día
    const base30 = tabla[30];
    const extraDias = dias - 30;

    return base30 + (extraDias * 3);
}

/* =========================================================
   VALIDAR EMAIL
========================================================= */
function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* =========================================================
   MINI PRECIO
========================================================= */
function actualizarMiniPrecio(precio) {
    const totalPrice = document.getElementById("totalPrice");
    if (totalPrice) {
        totalPrice.textContent = precio.toFixed(2);
    }
}

/* =========================================================
   CALCULAR PRECIO UI
========================================================= */
function calcularPrecio() {
    const inputInicio = document.getElementById("fecha-inicio");
    const inputFin = document.getElementById("fecha-fin");
    const displayPrecio = document.getElementById("display-precio");
    const contadorDiasSpan = document.getElementById("contador-dias");

    if (!inputInicio.value || !inputFin.value) {
        if (contadorDiasSpan) contadorDiasSpan.textContent = "0";
        actualizarMiniPrecio(0);
        if (displayPrecio) displayPrecio.innerHTML = "";
        return 0;
    }

    const fechaInicio = inputInicio.value;
    const fechaFin = inputFin.value;

    if (parseLocalDate(fechaFin) < parseLocalDate(fechaInicio)) {
        actualizarMiniPrecio(0);
        return 0;
    }

    const dias = calcularDias(fechaInicio, fechaFin);
    const precioTotal = obtenerPrecioTotal(dias);
    const costoPromedio = precioTotal / dias;

    if (contadorDiasSpan) contadorDiasSpan.textContent = dias;

    actualizarMiniPrecio(precioTotal);

    if (displayPrecio) {
        displayPrecio.innerHTML = `
            <div style="font-size: 0.9rem; margin-bottom: 5px; color: white;">
                Duración: <strong>${dias} días</strong>
                <span style="margin-left:10px;">($${costoPromedio.toFixed(2)} por día)</span>
            </div>
            <div style="font-size: 1.5rem; font-weight: 800; color: white;">
                Total: $${precioTotal.toFixed(2)}
            </div>
        `;
    }

    return precioTotal;
}

/* =========================================================
   RESET CHECKOUT
========================================================= */
function resetCheckout() {
    const btn = document.getElementById("btn-validar");
    const paymentArea = document.getElementById("payment-area");

    if (paymentArea) paymentArea.style.display = "none";
    if (btn) btn.style.display = "inline-flex";

    calcularPrecio();
}

/* =========================================================
   PAYPAL
========================================================= */
function initPayPal(monto, contacto) {
    const container = document.getElementById("paypal-button-container");
    if (!container || !window.paypal) return;

    container.innerHTML = "";

    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: monto.toFixed(2) }
                }]
            });
        },

        onApprove: async (data, actions) => {
            await actions.order.capture();
            alert("Pago completado");
        }

    }).render("#paypal-button-container");
}

/* =========================================================
   BOTÓN CHECKOUT
========================================================= */
document.getElementById("btn-validar").addEventListener("click", function () {
    const monto = calcularPrecio();
    const contacto = document.getElementById("contacto-cliente").value.trim();
    const paymentArea = document.getElementById("payment-area");

    if (monto <= 0) {
        alert("Selecciona fechas válidas");
        return;
    }

    if (!contacto || !esEmailValido(contacto)) {
        alert("Correo inválido");
        return;
    }

    this.style.display = "none";
    paymentArea.style.display = "block";

    initPayPal(monto, contacto);
});

/* =========================================================
   EVENTOS
========================================================= */
document.getElementById("fecha-inicio").addEventListener("change", resetCheckout);
document.getElementById("fecha-fin").addEventListener("change", resetCheckout);
document.getElementById("contacto-cliente").addEventListener("input", resetCheckout);

/* =========================================================
   INICIO
========================================================= */
calcularPrecio();

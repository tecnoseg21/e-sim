// --- CONFIGURACIÓN INICIAL ---
const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en'; 

const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorDates: "Please select valid dates", success: "Success! Sending to: " },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorDates: "Por favor selecciona fechas válidas", success: "¡Éxito! Enviando a: " }
};

// --- 1. FUNCIÓN MAESTRA DE IDIOMA ---
function setLanguage(lang) {
    currentLang = lang;
    
    // Actualizamos los textos que ya están en pantalla
    const contactoInput = document.querySelector('#contacto-cliente');
    const btnValidar = document.getElementById('btn-validar');

    if (contactoInput) {
        contactoInput.placeholder = translations[currentLang].errorContact;
    }
    
    // Recalculamos el precio para que el texto "Total: $" cambie de idioma
    calcularPrecio();
    
    console.log("Idioma actualizado a:", currentLang);
}

// --- 2. LÓGICA DE CÁLCULO ---
function calcularPrecio() {
    const inicio = document.querySelector('#fecha-inicio').value;
    const fin = document.querySelector('#fecha-fin').value;
    const displayPrecio = document.querySelector('#display-precio');
    const contadorDiasSpan = document.querySelector('#contador-dias');

    if (inicio && fin) {
        const d1 = new Date(inicio);
        const d2 = new Date(fin);
        if (d2 >= d1) {
            const dias = Math.ceil(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
            if (contadorDiasSpan) contadorDiasSpan.textContent = dias;
            
            let precio = preciosPorDia[dias] || (dias * 7);
            if (displayPrecio) {
                // Aquí se usa la traducción actual
                displayPrecio.textContent = `${translations[currentLang].total}${precio.toFixed(2)}`;
            }
            return precio;
        }
    }
    return 0;
}

// --- 3. EVENTOS AL CARGAR EL DOM ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Escuchar clics en los botones de idioma
    // IMPORTANTE: Tus banderas deben tener la clase 'lang-switch'
    document.querySelectorAll('.lang-switch').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang) setLanguage(lang);
        });
    });

    // Lógica del Botón CHECKOUT
    const btnValidar = document.getElementById('btn-validar');
    if(btnValidar) {
        btnValidar.addEventListener('click', function(e) {
            e.preventDefault(); 
            const monto = calcularPrecio();
            const contacto = document.querySelector('#contacto-cliente').value;
            const paypalContainer = document.getElementById('paypal-button-container');

            if (monto <= 0) return alert(translations[currentLang].errorDates);
            if (!contacto || contacto.trim() === "") return alert(translations[currentLang].errorContact);

            this.style.display = 'none';
            paypalContainer.style.display = 'block';
            
            initPayPal(monto, contacto);
        });
    }
});

// --- 4. INTEGRACIÓN DE PAYPAL ---
function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; 

    if (typeof paypal === 'undefined') {
        alert("PayPal SDK no cargó.");
        return;
    }

    paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: monto.toString() },
                    description: `eSIM Monteverde - Contact: ${contacto}`,
                    custom_id: contacto
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(details => {
                alert(translations[currentLang].success + contacto);
                window.location.reload();
            });
        }
    }).render('#paypal-button-container');
}

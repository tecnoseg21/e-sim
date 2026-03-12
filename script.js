// --- CONFIGURACIÓN INICIAL ---
const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en'; 

const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorDates: "Please select valid dates", success: "Success! Sending to: " },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorDates: "Por favor selecciona fechas válidas", success: "¡Éxito! Enviando a: " }
};

// --- FUNCIÓN PARA CAMBIAR IDIOMA ---
function setLanguage(lang) {
    currentLang = lang;
    calcularPrecio();
    console.log("Idioma cambiado a:", lang);
}

// --- LÓGICA DE CÁLCULO ---
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
                displayPrecio.textContent = `${translations[currentLang].total}${precio.toFixed(2)}`;
            }
            return precio;
        }
    }
    return 0;
}

// --- EVENTOS AL CARGAR EL DOM ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Botón CHECKOUT (Botón de Validar/Total)
    const btnValidar = document.getElementById('btn-validar');
    if(btnValidar) {
        btnValidar.addEventListener('click', function(e) {
            e.preventDefault(); 
            const monto = calcularPrecio();
            const contacto = document.querySelector('#contacto-cliente').value;
            const paypalContainer = document.getElementById('paypal-button-container');

            // Validaciones básicas
            if (monto <= 0) return alert(translations[currentLang].errorDates);
            if (!contacto || contacto.trim() === "") return alert(translations[currentLang].errorContact);

            // OCULTAMOS EL BOTÓN Y MOSTRAMOS LOS BOTONES DE PAGO DIRECTAMENTE
            this.style.display = 'none';
            paypalContainer.style.display = 'block';
            
            // Cargamos PayPal con el monto calculado
            initPayPal(monto, contacto);
        });
    }

    // 2. Manejo de clics en banderas de idioma
    document.querySelectorAll('.lang-switch').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

// --- INTEGRACIÓN DE PAYPAL / APPLE PAY ---
function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; 

    if (typeof paypal === 'undefined') {
        alert("PayPal SDK no cargó.");
        document.getElementById('btn-validar').style.display = 'block';
        return;
    }

    paypal.Buttons({
        style: { 
            layout: 'vertical', 
            color: 'gold', 
            shape: 'rect', 
            label: 'pay' 
        },
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
        },
        onError: function(err) {
            console.error("Error PayPal:", err);
            document.getElementById('btn-validar').style.display = 'block';
            container.style.display = 'none';
        }
    }).render('#paypal-button-container');
}

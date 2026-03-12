// --- CONFIGURACIÓN INICIAL ---
const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en';
let selectedPayment = "";

const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorPay: "Select payment method", errorDates: "Please select valid dates", success: "Success! Sending to: " },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorPay: "Selecciona método de pago", errorDates: "Por favor selecciona fechas válidas", success: "¡Éxito! Enviando a: " }
};

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
            contadorDiasSpan.textContent = dias;
            let precio = preciosPorDia[dias] || (dias * 7);
            displayPrecio.textContent = `${translations[currentLang].total}${precio.toFixed(2)}`;
            return precio;
        }
    }
    return 0;
}

// --- MANEJO DE SELECCIÓN DE PAGO ---
document.querySelectorAll('.pay-method').forEach(m => {
    m.addEventListener('click', function(e) {
        e.preventDefault(); 
        document.querySelectorAll('.pay-method').forEach(x => {
            x.style.border = "1px solid #e9ecef";
            x.style.background = "#f8f9fa";
        });
        this.style.border = "2px solid #1976d2";
        this.style.background = "#e3f2fd";
        selectedPayment = this.getAttribute('data-method');
        console.log("Método seleccionado:", selectedPayment);
    });
});

// --- LÓGICA DEL BOTÓN CHECKOUT ---
document.addEventListener('DOMContentLoaded', () => {
    const btnValidar = document.getElementById('btn-validar');
    
    if(btnValidar) {
        btnValidar.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const monto = calcularPrecio();
            const contacto = document.querySelector('#contacto-cliente').value;
            const paypalContainer = document.getElementById('paypal-button-container');

            if (monto <= 0) return alert(translations[currentLang].errorDates);
            if (!contacto || contacto.trim() === "") return alert(translations[currentLang].errorContact);
            if (!selectedPayment) return alert(translations[currentLang].errorPay);

            // Ocultar validación y mostrar botones de pago
            this.style.display = 'none';
            paypalContainer.style.display = 'block';
            
            initPayPal(monto, contacto);
        });
    }
});

// --- INTEGRACIÓN DE PAYPAL / APPLE PAY ---
function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; 

    if (typeof paypal === 'undefined') {
        alert("PayPal SDK no cargó. Revisa tu Client ID en el HTML.");
        document.getElementById('btn-validar').style.display = 'block';
        return;
    }

    paypal.Buttons({
        // 'layout: vertical' despliega PayPal y Tarjeta por separado
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
            alert("Error en el pago. Reintente.");
            document.getElementById('btn-validar').style.display = 'block';
            container.style.display = 'none';
        }
    }).render('#paypal-button-container');
}

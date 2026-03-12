const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en';
let selectedPayment = "";

const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorPay: "Select payment method", errorDates: "Please select valid dates", success: "Success! Sending to: " },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorPay: "Selecciona método de pago", errorDates: "Por favor selecciona fechas válidas", success: "¡Éxito! Enviando a: " }
};

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

// 1. Escuchar el clic en el botón de Total
document.addEventListener('DOMContentLoaded', () => {
    const btnValidar = document.getElementById('btn-validar');
    
    btnValidar.addEventListener('click', function() {
        console.log("Botón presionado..."); // Mensaje de prueba en consola
        
        const monto = calcularPrecio();
        const contacto = document.querySelector('#contacto-cliente').value;
        const paypalContainer = document.getElementById('paypal-button-container');

        // Validaciones manuales
        if (monto <= 0) {
            alert(translations[currentLang].errorDates);
            return;
        }
        if (!contacto || contacto.trim() === "") {
            alert(translations[currentLang].errorContact);
            return;
        }
        if (!selectedPayment) {
            alert(translations[currentLang].errorPay);
            return;
        }

        console.log("Validación exitosa. Iniciando PayPal para: $" + monto);

        // OCULTAR EL BOTÓN AZUL Y MOSTRAR EL DE PAYPAL
        this.style.display = 'none';
        paypalContainer.style.display = 'block';
        
        // Llamar a PayPal
        initPayPal(monto, contacto);
    });
});

function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; // Limpiar cualquier residuo

    if (typeof paypal === 'undefined') {
        alert("Error: PayPal SDK not loaded. Check your Client ID.");
        document.getElementById('btn-validar').style.display = 'block';
        return;
    }

    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: monto.toString() },
                    description: `eSIM Costa Rica - Contact: ${contacto}`,
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
            console.error("Error de PayPal:", err);
            alert("Payment error. Try again.");
            document.getElementById('btn-validar').style.display = 'block';
            container.style.display = 'none';
        }
    }).render('#paypal-button-container');
}

// Selección de método de pago (Asegúrate de que tus divs tengan la clase .pay-method)
document.querySelectorAll('.pay-method').forEach(m => {
    m.addEventListener('click', () => {
        document.querySelectorAll('.pay-method').forEach(x => {
            x.style.border = "1px solid #e9ecef";
            x.style.background = "#f8f9fa";
        });
        m.style.border = "2px solid #1976d2";
        m.style.background = "#e3f2fd";
        selectedPayment = m.getAttribute('data-method');
    });
});

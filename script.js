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

document.querySelector('#fecha-inicio').addEventListener('change', calcularPrecio);
document.querySelector('#fecha-fin').addEventListener('change', calcularPrecio);

// Selección de pago
document.querySelectorAll('.pay-method').forEach(m => {
    m.addEventListener('click', () => {
        document.querySelectorAll('.pay-method').forEach(x => {
            x.style.borderColor = "#e9ecef";
            x.style.background = "#f8f9fa";
        });
        m.style.borderColor = "#1976d2";
        m.style.background = "#e3f2fd";
        selectedPayment = m.getAttribute('data-method');
    });
});

// EL BOTÓN QUE ESTABA FALLANDO
document.querySelector('#btn-validar').addEventListener('click', function() {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;
    const paypalContainer = document.querySelector('#paypal-button-container');

    // Validaciones
    if (monto <= 0) return alert(translations[currentLang].errorDates);
    if (!contacto || contacto.trim() === "") return alert(translations[currentLang].errorContact);
    if (!selectedPayment) return alert(translations[currentLang].errorPay);

    // PASO CRÍTICO: Ocultamos el botón azul y MOSTRAMOS el contenedor de PayPal
    this.style.display = 'none';
    paypalContainer.style.display = 'block';
    paypalContainer.innerHTML = '<p style="text-align:center; color:#1976d2;">Loading payment methods...</p>';

    // Llamamos a la inicialización
    initPayPal(monto, contacto);
});

function initPayPal(monto, contacto) {
    const container = document.querySelector('#paypal-button-container');
    container.innerHTML = ''; // Limpiamos el mensaje de "Loading"

    paypal.Buttons({
        style: { 
            layout: 'vertical', 
            color: 'blue', 
            shape: 'rect', 
            label: 'pay' 
        },
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
            alert("PayPal Error. Please try again.");
            document.querySelector('#btn-validar').style.display = 'block';
            container.style.display = 'none';
        }
    }).render('#paypal-button-container');
}

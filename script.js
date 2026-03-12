const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en';
let selectedPayment = "";

// Traducciones
const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorPay: "Select payment method", success: "Success! Sending to: " },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorPay: "Selecciona método de pago", success: "¡Éxito! Enviando a: " }
    // ... (puedes añadir fr, de, nl como antes)
};

// Cálculo de precio
function calcularPrecio() {
    const inicio = document.querySelector('#fecha-inicio').value;
    const fin = document.querySelector('#fecha-fin').value;
    if (inicio && fin) {
        const d1 = new Date(inicio);
        const d2 = new Date(fin);
        if (d2 >= d1) {
            const dias = Math.ceil(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
            document.querySelector('#contador-dias').textContent = dias;
            let precio = preciosPorDia[dias] || (dias * 7);
            document.querySelector('#display-precio').textContent = `Total: $${precio.toFixed(2)}`;
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
        document.querySelectorAll('.pay-method').forEach(x => x.classList.remove('selected'));
        m.classList.add('selected'); // Asegúrate de tener .selected en tu CSS
        selectedPayment = m.getAttribute('data-method');
        // Mostrar botón de PayPal si todo está listo
        document.querySelector('#paypal-button-container').style.display = 'block';
        document.querySelector('#btn-validar').style.display = 'none';
        initPayPal();
    });
});

function initPayPal() {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;

    if (!contacto) {
        alert(translations[currentLang].errorContact);
        return;
    }

    // Limpiar contenedor para evitar duplicados
    document.querySelector('#paypal-button-container').innerHTML = '';

    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
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

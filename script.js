const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en';
let selectedPayment = "";

const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorPay: "Select payment method", errorDates: "Please select valid dates", success: "Success! Sending to: " },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorPay: "Selecciona método de pago", errorDates: "Por favor selecciona fechas válidas", success: "¡Éxito! Enviando a: " },
    fr: { total: "Total: $", errorContact: "Saisir WhatsApp/Email", errorPay: "Choisir le mode de paiement", errorDates: "Veuillez choisir des dates valides", success: "Succès! Envoi à: " },
    de: { total: "Gesamt: $", errorContact: "WhatsApp/E-Mail eingeben", errorPay: "Zahlungsmethode wählen", errorDates: "Bitte wählen Sie gültige Daten", success: "Erfolg! Senden an: " },
    nl: { total: "Totaal: $", errorContact: "Voer WhatsApp/E-mail in", errorPay: "Betaalmethode selecteren", errorDates: "Selecteer geldige datums", success: "Succes! Verzenden naar: " }
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
    displayPrecio.textContent = `${translations[currentLang].total}0.00`;
    contadorDiasSpan.textContent = "0";
    return 0;
}

// Eventos para actualizar precio automáticamente
document.querySelector('#fecha-inicio').addEventListener('change', calcularPrecio);
document.querySelector('#fecha-fin').addEventListener('change', calcularPrecio);

// Selección visual del método de pago
document.querySelectorAll('.pay-method').forEach(m => {
    m.addEventListener('click', () => {
        document.querySelectorAll('.pay-method').forEach(x => {
            x.style.borderColor = "#e9ecef";
            x.style.background = "#f8f9fa";
        });
        m.style.borderColor = "#1976d2";
        m.style.background = "#e3f2fd";
        selectedPayment = m.getAttribute('data-method');
        
        // Si el contenedor de PayPal ya estaba abierto, lo actualizamos
        if (document.querySelector('#paypal-button-container').style.display === 'block') {
            initPayPal();
        }
    });
});

// LÓGICA DEL BOTÓN CHECKOUT (El que no te funcionaba)
document.querySelector('#btn-validar').addEventListener('click', () => {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;

    // 1. Validaciones de seguridad
    if (monto <= 0) {
        alert(translations[currentLang].errorDates);
        return;
    }
    if (!contacto || contacto.trim() === "") {
        alert(translations[currentLang].errorContact);
        document.querySelector('#contacto-cliente').focus();
        return;
    }
    if (!selectedPayment) {
        alert(translations[currentLang].errorPay);
        return;
    }

    // 2. Si todo está bien, ocultamos el botón de validación y mostramos PayPal
    document.querySelector('#btn-validar').style.display = 'none';
    document.querySelector('#paypal-button-container').style.display = 'block';
    initPayPal();
});

function initPayPal() {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;

    // Limpiar contenedor para evitar que se dupliquen los botones
    const container = document.querySelector('#paypal-button-container');
    container.innerHTML = '';

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
            console.error("PayPal Error:", err);
            alert("Error al conectar con PayPal.");
            // Si hay error, mostramos el botón de validar otra vez
            document.querySelector('#btn-validar').style.display = 'block';
            container.style.display = 'none';
        }
    }).render('#paypal-button-container');
}

// Lógica de idiomas
document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelector('.lang-opt.active').classList.remove('active');
        opt.classList.add('active');
        currentLang = opt.textContent.toLowerCase();
        // Aquí puedes disparar la función que traduce el resto de la UI
        calcularPrecio(); 
    });
});

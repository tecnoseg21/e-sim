const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'en';
let selectedPayment = "";

const translations = {
    en: { total: "Total: $", errorContact: "Enter WhatsApp/Email", errorPay: "Select payment method", success: "Success! Sending to: ", daysCount: "Total:" },
    es: { total: "Total: $", errorContact: "Ingresa WhatsApp/Correo", errorPay: "Selecciona método de pago", success: "¡Éxito! Enviando a: ", daysCount: "Total:" },
    fr: { total: "Total: $", errorContact: "Saisir WhatsApp/Email", errorPay: "Choisir le mode de paiement", success: "Succès! Envoi à: ", daysCount: "Total:" },
    de: { total: "Gesamt: $", errorContact: "WhatsApp/E-Mail eingeben", errorPay: "Zahlungsmethode wählen", success: "Erfolg! Senden an: ", daysCount: "Gesamt:" },
    nl: { total: "Totaal: $", errorContact: "Voer WhatsApp/E-mail in", errorPay: "Betaalmethode selecteren", success: "Succes! Verzenden naar: ", daysCount: "Totaal:" }
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
            
            // Si el botón de PayPal ya está visible, lo refrescamos con el nuevo precio
            if (selectedPayment) initPayPal(); 
            return precio;
        }
    }
    displayPrecio.textContent = `${translations[currentLang].total}0.00`;
    return 0;
}

// Eventos para actualizar precio
document.querySelector('#fecha-inicio').addEventListener('change', calcularPrecio);
document.querySelector('#fecha-fin').addEventListener('change', calcularPrecio);
document.querySelector('#contacto-cliente').addEventListener('input', () => {
    if (selectedPayment) initPayPal(); // Refresca el botón si cambian el correo
});

// Selección de pago y cambio de idioma
document.querySelectorAll('.pay-method').forEach(m => {
    m.addEventListener('click', () => {
        document.querySelectorAll('.pay-method').forEach(x => {
            x.style.borderColor = "#e9ecef";
            x.style.background = "#f8f9fa";
        });
        m.style.borderColor = "#1976d2";
        m.style.background = "#e3f2fd";
        
        selectedPayment = m.getAttribute('data-method');
        document.querySelector('#paypal-button-container').style.display = 'block';
        document.querySelector('#btn-validar').style.display = 'none';
        initPayPal();
    });
});

function initPayPal() {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;

    if (!contacto || monto <= 0) return;

    document.querySelector('#paypal-button-container').innerHTML = '';

    paypal.Buttons({
        style: { 
            layout: 'vertical', 
            color: 'blue', 
            shape: 'rect', 
            label: 'pay' // Esto activa la detección de Apple/Google Pay
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
        }
    }).render('#paypal-button-container');
}

// Lógica de cambio de idioma para los botones EN, ES, FR...
document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelector('.lang-opt.active').classList.remove('active');
        opt.classList.add('active');
        currentLang = opt.textContent.toLowerCase();
        // Aquí llamarías a tu función updateLanguageUI(currentLang) que definimos antes
        calcularPrecio(); 
    });
});

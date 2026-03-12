// Configuración de precios (puedes ajustarlos aquí fácilmente)
const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'EN';

const translations = {
    EN: { total: "Total to pay: $", errorContact: "Enter WhatsApp/Email", errorDates: "Please select valid dates", duration: "Duration: ", days: " days", checkout: "CHECKOUT", labelDates: "Select your travel dates", labelContact: "WhatsApp or Email (for activation code):", footer1: "Instant Delivery", footer2: "Secure Payment" },
    ES: { total: "Total a pagar: $", errorContact: "Ingresa WhatsApp/Correo", errorDates: "Por favor selecciona fechas válidas", duration: "Duración: ", days: " días", checkout: "FINALIZAR COMPRA", labelDates: "Selecciona las fechas de tu viaje", labelContact: "WhatsApp o Correo (para código de activación):", footer1: "Entrega Instantánea", footer2: "Pago Seguro" },
    FR: { total: "Total à payer: $", errorContact: "Entrez WhatsApp/Email", errorDates: "Veuillez choisir des dates valides", duration: "Durée: ", days: " jours", checkout: "PAYER", labelDates: "Choisissez vos dates de voyage", labelContact: "WhatsApp ou Email (pour le code):", footer1: "Livraison instantanée", footer2: "Paiement sécurisé" },
    DE: { total: "Gesamtbetrag: $", errorContact: "WhatsApp/E-Mail eingeben", errorDates: "Bitte gültige Daten wählen", duration: "Dauer: ", days: " Tage", checkout: "KASSE", labelDates: "Reisedaten auswählen", labelContact: "WhatsApp oder E-Mail (für Code):", footer1: "Sofortige Lieferung", footer2: "Sichere Zahlung" },
    NL: { total: "Totaal te betalen: $", errorContact: "Voer WhatsApp/E-mail in", errorDates: "Selecteer geldige datums", duration: "Duur: ", days: " dagen", checkout: "AFREKENEN", labelDates: "Selecteer reisdata", labelContact: "WhatsApp of e-mail (voor code):", footer1: "Directe levering", footer2: "Veilig betalen" }
};

// --- FUNCIÓN DE REINICIO ---
// Oculta el área de pago si el cliente cambia fechas o contacto
function resetCheckout() {
    const btnValidar = document.getElementById('btn-validar');
    const paymentArea = document.getElementById('payment-area');
    const paypalContainer = document.getElementById('paypal-button-container');

    if (paymentArea && paymentArea.style.display === 'block') {
        paymentArea.style.display = 'none';
        if (paypalContainer) paypalContainer.innerHTML = ''; 
        btnValidar.style.display = 'block';
    }
    calcularPrecio();
}

// --- MANEJO DE IDIOMAS ---
document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', function() {
        document.querySelectorAll('.lang-opt').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        currentLang = this.getAttribute('data-lang');
        updateUI();
    });
});

function updateUI() {
    const lang = translations[currentLang];
    document.getElementById('btn-validar').textContent = lang.checkout;
    document.getElementById('label-dates').textContent = lang.labelDates;
    document.getElementById('label-contacto').textContent = lang.labelContact;
    document.getElementById('footer-1').textContent = lang.footer1;
    document.getElementById('footer-2').textContent = lang.footer2;
    document.getElementById('txt-days-unit').textContent = lang.days.trim();
    document.getElementById('contacto-cliente').placeholder = lang.errorContact;
    calcularPrecio();
}

// --- CÁLCULO DE PRECIO ---
function calcularPrecio() {
    const inicio = document.querySelector('#fecha-inicio').value;
    const fin = document.querySelector('#fecha-fin').value;
    const displayPrecio = document.getElementById('display-precio');
    const contadorDiasSpan = document.getElementById('contador-dias');

    if (inicio && fin) {
        const d1 = new Date(inicio);
        const d2 = new Date(fin);
        if (d2 >= d1) {
            const dias = Math.ceil(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
            if (contadorDiasSpan) contadorDiasSpan.textContent = dias;
            let precio = preciosPorDia[dias] || (dias * 7);
            const lang = translations[currentLang];
            displayPrecio.innerHTML = `<small style="font-size:0.8rem; display:block; opacity:0.8;">${lang.duration}${dias}${lang.days}</small> ${lang.total}${precio.toFixed(2)}`;
            return precio;
        }
    }
    if (contadorDiasSpan) contadorDiasSpan.textContent = "0";
    return 0;
}

// --- BOTÓN CHECKOUT ---
document.getElementById('btn-validar').addEventListener('click', function(e) {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;
    const paymentArea = document.getElementById('payment-area');
    const lang = translations[currentLang];

    if (monto <= 0) return alert(lang.errorDates);
    if (!contacto || contacto.trim() === "") return alert(lang.errorContact);

    this.style.display = 'none';
    paymentArea.style.display = 'block';
    initPayPal(monto, contacto);
});

// --- INTEGRACIÓN PAYPAL ---
function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; 
    paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{ amount: { value: monto.toString() }, description: `eSIM Costa Rica - ${contacto}` }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(() => { window.location.reload(); });
        }
    }).render('#paypal-button-container');
}

// --- ESCUCHADORES DE EVENTOS ---
document.getElementById('fecha-inicio').addEventListener('change', resetCheckout);
document.getElementById('fecha-fin').addEventListener('change', resetCheckout);
document.getElementById('contacto-cliente').addEventListener('input', resetCheckout);

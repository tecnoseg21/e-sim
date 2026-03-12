// Configuración de escala de precios (más días = menor costo diario)
const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'EN';

const translations = {
    EN: { total: "Total to pay: $", perDay: "per day", duration: "Duration: ", days: " days", checkout: "CHECKOUT", errorDates: "Please select valid dates", errorContact: "Enter WhatsApp/Email", compTitle: "Is my phone compatible?", compP1: "Dial *#06# on your phone.", compP2: "If an EID code appears, you're ready." },
    ES: { total: "Total a pagar: $", perDay: "por día", duration: "Duración: ", days: " días", checkout: "FINALIZAR COMPRA", errorDates: "Por favor selecciona fechas válidas", errorContact: "Ingresa WhatsApp/Correo", compTitle: "¿Es mi teléfono compatible?", compP1: "Marca *#06# en tu teléfono.", compP2: "Si aparece un código EID, estás listo." },
    FR: { total: "Total à payer: $", perDay: "par jour", duration: "Durée: ", days: " jours", checkout: "PAYER", errorDates: "Veuillez choisir des dates valides", errorContact: "Entrez WhatsApp/Email", compTitle: "Mon téléphone est-il compatible?", compP1: "Composez *#06# sur votre téléphone.", compP2: "Si un code EID apparaît, vous êtes prêt." },
    DE: { total: "Gesamtbetrag: $", perDay: "pro Tag", duration: "Dauer: ", days: " Tage", checkout: "KASSE", errorDates: "Bitte gültige Daten wählen", errorContact: "WhatsApp/E-Mail eingeben", compTitle: "Ist mein Handy kompatibel?", compP1: "Wählen Sie *#06# auf Ihrem Handy.", compP2: "Wenn ein EID-Code erscheint, sind Sie bereit." },
    NL: { total: "Totaal te betalen: $", perDay: "per dag", duration: "Duur: ", days: " dagen", checkout: "AFREKENEN", errorDates: "Selecteer geldige datums", errorContact: "Voer WhatsApp/E-mail in", compTitle: "Is mijn telefoon compatibel?", compP1: "Bel *#06# op je telefoon.", compP2: "Als er een EID-code verschijnt, ben je er klaar voor." }
};

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
    document.getElementById('label-dates').textContent = lang.labelDates || "Travel Dates";
    document.getElementById('label-contacto').textContent = lang.labelContact || "Contact";
    document.getElementById('txt-days-unit').textContent = lang.days.trim();
    document.getElementById('contacto-cliente').placeholder = lang.errorContact;
    document.getElementById('label-comp').textContent = lang.compTitle;
    document.getElementById('comp-p1').innerHTML = lang.compP1.replace('*#06#', '<strong>*#06#</strong>');
    document.getElementById('comp-p2').innerHTML = lang.compP2.replace('EID', '<strong>EID</strong>');
    calcularPrecio();
}

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
            
            // Lógica de escala: si no está en la tabla, usa $7 base
            let precioTotal = preciosPorDia[dias] || (dias * 7);
            let costoDiario = (precioTotal / dias).toFixed(2);
            
            const lang = translations[currentLang];
            
            displayPrecio.innerHTML = `
                <div style="font-size: 0.9rem; opacity: 0.95; margin-bottom: 5px;">
                    ${lang.duration} <strong>${dias} ${lang.days}</strong>
                    <span style="margin-left:10px; font-weight:normal;">($${costoDiario} ${lang.perDay})</span>
                </div>
                <div style="font-size: 1.5rem; font-weight: 800; letter-spacing: 0.5px;">
                    ${lang.total}${precioTotal.toFixed(2)}
                </div>
            `;
            return precioTotal;
        }
    }
    if (contadorDiasSpan) contadorDiasSpan.textContent = "0";
    return 0;
}

document.getElementById('btn-validar').addEventListener('click', function() {
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

function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; 
    paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{ amount: { value: monto.toString() }, description: `eSIM Costa Rica - ${contacto}` }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(() => { window.location.reload(); });
        }
    }).render('#paypal-button-container');
}

document.getElementById('fecha-inicio').addEventListener('change', resetCheckout);
document.getElementById('fecha-fin').addEventListener('change', resetCheckout);
document.getElementById('contacto-cliente').addEventListener('input', resetCheckout);

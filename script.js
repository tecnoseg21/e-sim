const supabaseUrl = "https://czqylvofewjvhqsyjhwl.supabase.co";
const supabaseKey = "sb_publishable_M_pl2tHR3S8zWhN-awxXDQ_LiyDYXWI";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

function parseLocalDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

async function guardarPedido({
    contacto,
    fechaInicio,
    fechaFin,
    dias,
    monto,
    idioma,
    paypalOrderId,
    paypalCaptureId,
    status,
    installationMethod
}) {
    const { data, error } = await supabaseClient
        .from('orders')
        .insert([
            {
                customer_contact: contacto,
                start_date: fechaInicio,
                end_date: fechaFin,
                days: dias,
                amount: monto,
                currency: 'USD',
                paypal_order_id: paypalOrderId || null,
                paypal_capture_id: paypalCaptureId || null,
                status: status || 'pending',
                language: idioma || 'EN',
                installation_method: installationMethod || 'self'
            }
        ])
        .select();

    if (error) {
        console.error('Error guardando pedido:', error);
        throw error;
    }

    return data;
}

let currentLang = 'EN';

const translations = {
    EN: {
        total: "Total to pay: $",
        perDay: "per day",
        duration: "Duration: ",
        days: " days",
        checkout: "CHECKOUT",
        errorDates: "Please select valid dates",
        errorContact: "Enter WhatsApp/Email",
        compTitle: "Is my phone compatible?",
        compP1: "Dial *#06# on your phone.",
        compP2: "If an EID code appears, you're ready.",
        activation: "Activation method",
        selfInstall: "I will install the eSIM myself",
        storeInstall: "Install for me at the store (technical support)"
    },
    ES: {
        total: "Total a pagar: $",
        perDay: "por día",
        duration: "Duración: ",
        days: " días",
        checkout: "FINALIZAR COMPRA",
        errorDates: "Por favor selecciona fechas válidas",
        errorContact: "Ingresa WhatsApp/Correo",
        compTitle: "¿Es mi teléfono compatible?",
        compP1: "Marca *#06# en tu teléfono.",
        compP2: "Si aparece un código EID, estás listo.",
        activation: "Método de activación",
        selfInstall: "Instalaré la eSIM yo mismo",
        storeInstall: "Instalar en la tienda (soporte técnico)"
    },
    FR: {
        total: "Total à payer: $",
        perDay: "par jour",
        duration: "Durée: ",
        days: " jours",
        checkout: "PAYER",
        errorDates: "Veuillez choisir des dates valides",
        errorContact: "Entrez WhatsApp/Email",
        compTitle: "Mon téléphone est-il compatible?",
        compP1: "Composez *#06# sur votre téléphone.",
        compP2: "Si un code EID apparaît, vous êtes prêt.",
        activation: "Méthode d'activation",
        selfInstall: "Je vais installer l'eSIM moi-même",
        storeInstall: "Installer en magasin (support technique)"
    },
    DE: {
        total: "Gesamtbetrag: $",
        perDay: "pro Tag",
        duration: "Dauer: ",
        days: " Tage",
        checkout: "KASSE",
        errorDates: "Bitte gültige Daten wählen",
        errorContact: "WhatsApp/E-Mail eingeben",
        compTitle: "Ist mein Handy kompatibel?",
        compP1: "Wählen Sie *#06# auf Ihrem Handy.",
        compP2: "Wenn ein EID-Code erscheint, sind Sie bereit.",
        activation: "Aktivierungsmethode",
        selfInstall: "Ich installiere die eSIM selbst",
        storeInstall: "Installation im Geschäft (technischer Support)"
    },
    NL: {
        total: "Totaal te betalen: $",
        perDay: "per dag",
        duration: "Duur: ",
        days: " dagen",
        checkout: "AFREKENEN",
        errorDates: "Selecteer geldige datums",
        errorContact: "Voer WhatsApp/E-mail in",
        compTitle: "Is mijn telefoon compatibel?",
        compP1: "Bel *#06# op je telefoon.",
        compP2: "Als er een EID-code verschijnt, ben je er klaar voor.",
        activation: "Activatiemethode",
        selfInstall: "Ik installeer de eSIM zelf",
        storeInstall: "Installatie in de winkel (technische ondersteuning)"
    }
};

function resetCheckout() {
    const btnValidar = document.getElementById('btn-validar');
    const paymentArea = document.getElementById('payment-area');
    const paypalContainer = document.getElementById('paypal-button-container');

    if (paymentArea && paymentArea.style.display === 'block') {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        paymentArea.style.display = 'none';
        if (paypalContainer) paypalContainer.innerHTML = '';
        btnValidar.style.display = 'block';
        window.scrollTo(0, scrollPos);
    }

    calcularPrecio();
}

document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', function () {
        document.querySelectorAll('.lang-opt').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        currentLang = this.getAttribute('data-lang');
        updateUI();
    });
});

function updateUI() {
    const lang = translations[currentLang];
    document.getElementById('btn-validar').textContent = lang.checkout;

    const labelDates = document.getElementById('label-dates');
    if (labelDates) labelDates.textContent = "Travel Dates";

    document.getElementById('txt-days-unit').textContent = lang.days.trim();
    document.getElementById('contacto-cliente').placeholder = lang.errorContact;
    document.getElementById('label-comp').textContent = lang.compTitle;
    document.getElementById('comp-p1').innerHTML = lang.compP1.replace('*#06#', '<strong>*#06#</strong>');
    document.getElementById('comp-p2').innerHTML = lang.compP2.replace('EID', '<strong>EID</strong>');

    const labelActivation = document.getElementById('label-activation');
    const optSelf = document.getElementById('opt-self');
    const optStore = document.getElementById('opt-store');

    if (labelActivation) labelActivation.textContent = lang.activation;
    if (optSelf) optSelf.textContent = lang.selfInstall;
    if (optStore) optStore.textContent = lang.storeInstall;

    calcularPrecio();
}

function calcularPrecio() {
    const inputInicio = document.getElementById('fecha-inicio');
    const inputFin = document.getElementById('fecha-fin');
    const displayPrecio = document.getElementById('display-precio');
    const contadorDiasSpan = document.getElementById('contador-dias');

    if (inputInicio.value && inputFin.value) {
        const d1 = new Date(inputInicio.value);
        const d2 = new Date(inputFin.value);

        if (d2 >= d1) {
            const milisegundosPorDia = 1000 * 60 * 60 * 24;
            const dias = Math.ceil(Math.abs(d2 - d1) / milisegundosPorDia) + 1;

            if (contadorDiasSpan) contadorDiasSpan.textContent = dias;

            let costoDiario;
            if (dias >= 30) costoDiario = 89 / 30;
            else if (dias >= 15) costoDiario = 65 / 15;
            else if (dias >= 7) costoDiario = 49 / 7;
            else if (dias >= 3) costoDiario = 25 / 3;
            else costoDiario = 15;

            const precioTotal = dias * costoDiario;
            const lang = translations[currentLang];

            displayPrecio.innerHTML = `
                <div style="font-size: 0.9rem; opacity: 0.95; margin-bottom: 5px; color: white;">
                    ${lang.duration} <strong>${dias} ${lang.days}</strong>
                    <span style="margin-left:10px; font-weight:normal;">($${costoDiario.toFixed(2)} ${lang.perDay})</span>
                </div>
                <div style="font-size: 1.5rem; font-weight: 800; color: white;">
                    ${lang.total}${precioTotal.toFixed(2)}
                </div>
            `;
            return precioTotal;
        }
    }

    return 0;
}

document.getElementById('btn-validar').addEventListener('click', function () {
    const monto = calcularPrecio();
    const contacto = document.getElementById('contacto-cliente').value;
    const paymentArea = document.getElementById('payment-area');
    const lang = translations[currentLang];

    if (monto <= 0) {
        alert(lang.errorDates);
        return;
    }

    if (!contacto || contacto.trim() === "") {
        alert(lang.errorContact);
        return;
    }

    const currentPos = window.pageYOffset;
    this.style.display = 'none';
    paymentArea.style.display = 'block';
    window.scrollTo(0, currentPos);

    initPayPal(monto, contacto);
});

function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = '';

    setTimeout(() => {
        paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },

            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: monto.toFixed(2) },
                        description: `eSIM Costa Rica - ${contacto}`
                    }]
                });
            },

            onApprove: async (data, actions) => {
                try {
                    const details = await actions.order.capture();

                    const fechaInicio = document.getElementById('fecha-inicio').value;
                    const fechaFin = document.getElementById('fecha-fin').value;
                    const contactoActual = document.getElementById('contacto-cliente').value.trim();

                    const opcionSeleccionada = document.querySelector('input[name="instalacion"]:checked');
                    const metodoInstalacion = opcionSeleccionada ? opcionSeleccionada.value : 'self';

                    const d1 = parseLocalDate(fechaInicio);
                    const d2 = parseLocalDate(fechaFin);
                    const milisegundosPorDia = 1000 * 60 * 60 * 24;
                    const dias = Math.floor((d2 - d1) / milisegundosPorDia) + 1;

                    const montoCalculado = calcularPrecio();

                    const captureId =
                        details?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

                    await guardarPedido({
                        contacto: contactoActual,
                        fechaInicio,
                        fechaFin,
                        dias,
                        monto: montoCalculado,
                        idioma: currentLang,
                        paypalOrderId: data.orderID,
                        paypalCaptureId: captureId,
                        status: 'paid',
                        installationMethod: metodoInstalacion
                    });

                    alert('Pago aprobado y pedido guardado correctamente.');
                    window.location.href = "gracias.html";

                } catch (error) {
                    console.error('Error al capturar o guardar el pedido:', error);
                    alert('El pago se aprobó, pero hubo un problema guardando el pedido.');
                }
            }
        }).render('#paypal-button-container').then(() => {
            document.getElementById('payment-area').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        });
    }, 100);
}

document.getElementById('fecha-inicio').addEventListener('change', resetCheckout);
document.getElementById('fecha-fin').addEventListener('change', resetCheckout);
document.getElementById('contacto-cliente').addEventListener('change', resetCheckout);

updateUI();

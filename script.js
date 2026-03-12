// 1. PRECIOS Y TRADUCCIONES
const preciosPorDia = { 1: 15.0, 3: 25.0, 7: 49.0, 15: 65.0, 30: 89.0 };

const translations = {
    en: {
        title: "eSIM Costa Rica",
        subtitle: "Unlimited internet nationwide",
        selectDays: "Select your travel dates",
        compatibilityTitle: "Is my phone compatible?",
        compatibilityText: "Dial <strong>*#06#</strong> on your phone (as if making a call).",
        compatibilityStep: "If an <strong>EID</strong> code appears, your device supports eSIM.",
        noSignal: "No signal or internet required to check.",
        setupQuestion: "How do you want to set up your eSIM?",
        selfService: "24/7 Self-Service",
        selfServiceSub: "I'll do it myself (Digital)",
        techAssist: "Technician Assistance",
        techAssistSub: "In-store setup",
        paymentMethod: "Payment Method",
        contactLabel: "WhatsApp or Email (to send activation code):",
        total: "Total: $",
        activateBtn: "ACTIVATE NOW",
        instantDelivery: "Instant Delivery",
        securePayment: "Secure Payment",
        daysCount: "Total:",
        errorContact: "Please enter your WhatsApp or Email.",
        errorPay: "Please select a payment method."
    },
    es: {
        title: "eSIM Costa Rica",
        subtitle: "Internet ilimitado en todo el país",
        selectDays: "Seleccione sus fechas de viaje",
        compatibilityTitle: "¿Es compatible mi celular?",
        compatibilityText: "Marca <strong>*#06#</strong> en tu teléfono (como si fueras a llamar).",
        compatibilityStep: "Si aparece un código llamado <strong>EID</strong>, tu equipo soporta eSIM.",
        noSignal: "No requiere señal ni internet para verificarlo.",
        setupQuestion: "¿Cómo desea configurar su eSIM?",
        selfService: "Autoservicio 24/7",
        selfServiceSub: "Lo hago yo mismo (Digital)",
        techAssist: "Ayuda del Técnico",
        techAssistSub: "Configuración en tienda",
        paymentMethod: "Método de Pago",
        contactLabel: "WhatsApp o Correo (para enviar código de activación):",
        total: "Total: $",
        activateBtn: "ACTIVAR AHORA",
        instantDelivery: "Entrega Inmediata",
        securePayment: "Pago Seguro",
        daysCount: "Total:",
        errorContact: "Por favor ingresa tu WhatsApp o Correo.",
        errorPay: "Por favor selecciona un método de pago."
    },
    fr: {
        title: "eSIM Costa Rica",
        subtitle: "Internet illimité dans tout le pays",
        selectDays: "Choisissez vos dates de voyage",
        compatibilityTitle: "Mon téléphone est-il compatible?",
        compatibilityText: "Composez le <strong>*#06#</strong> (comme pour un appel).",
        compatibilityStep: "Si un code <strong>EID</strong> s'affiche, votre appareil supporte l'eSIM.",
        noSignal: "Aucun signal ou internet requis pour vérifier.",
        setupQuestion: "Comment voulez-vous configurer votre eSIM?",
        selfService: "Libre-service 24/7",
        selfServiceSub: "Je le fais moi-même (Digital)",
        techAssist: "Assistance technique",
        techAssistSub: "Configuration en magasin",
        paymentMethod: "Mode de paiement",
        contactLabel: "WhatsApp ou Email (pour envoyer le code d'activation):",
        total: "Total: $",
        activateBtn: "ACTIVER MAINTENANT",
        instantDelivery: "Livraison instantanée",
        securePayment: "Paiement sécurisé",
        daysCount: "Total:",
        errorContact: "Veuillez saisir votre WhatsApp ou votre e-mail.",
        errorPay: "Veuillez sélectionner un mode de paiement."
    },
    de: {
        title: "eSIM Costa Rica",
        subtitle: "Unbegrenztes Internet landesweit",
        selectDays: "Wählen Sie Ihre Reisedaten",
        compatibilityTitle: "Ist mein Handy kompatibel?",
        compatibilityText: "Wählen Sie <strong>*#06#</strong> (wie bei einem Anruf).",
        compatibilityStep: "Wenn ein <strong>EID</strong>-Code erscheint, unterstützt Ihr Gerät eSIM.",
        noSignal: "Kein Signal oder Internet zum Prüfen erforderlich.",
        setupQuestion: "Wie möchten Sie Ihre eSIM einrichten?",
        selfService: "24/7 Selbstbedienung",
        selfServiceSub: "Ich mache es selbst (Digital)",
        techAssist: "Technische Hilfe",
        techAssistSub: "Einrichtung im Laden",
        paymentMethod: "Zahlungsmethode",
        contactLabel: "WhatsApp oder E-Mail (für den Aktivierungscode):",
        total: "Gesamt: $",
        activateBtn: "JETZT AKTIVIEREN",
        instantDelivery: "Sofortige Lieferung",
        securePayment: "Sichere Zahlung",
        daysCount: "Gesamt:",
        errorContact: "Bitte geben Sie Ihre WhatsApp oder E-Mail ein.",
        errorPay: "Bitte wählen Sie eine Zahlungsmethode."
    },
    nl: {
        title: "eSIM Costa Rica",
        subtitle: "Onbeperkt internet landelijk",
        selectDays: "Selecteer uw reisdata",
        compatibilityTitle: "Is mijn telefoon compatibel?",
        compatibilityText: "Toets <strong>*#06#</strong> in (net als bij een oproep).",
        compatibilityStep: "Als er een <strong>EID</strong>-code verschijnt, ondersteunt uw apparaat eSIM.",
        noSignal: "Geen signaal of internet nodig om te controleren.",
        setupQuestion: "Hoe wilt u uw eSIM instellen?",
        selfService: "24/7 Zelfservice",
        selfServiceSub: "Ik doe het zelf (Digitaal)",
        techAssist: "Technische assistentie",
        techAssistSub: "Configuratie in de winkel",
        paymentMethod: "Betalingsmethode",
        contactLabel: "WhatsApp of E-mail (om activeringscode te sturen):",
        total: "Totaal: $",
        activateBtn: "NU ACTIVEREN",
        instantDelivery: "Directe levering",
        securePayment: "Veilige betaling",
        daysCount: "Totaal:",
        errorContact: "Voer uw WhatsApp of e-mailadres in.",
        errorPay: "Selecteer een betaalmethode."
    }
};

let currentLang = 'en';
let selectedPayment = "";

// 2. ELEMENTOS
const fechaInicio = document.querySelector('#fecha-inicio');
const fechaFin = document.querySelector('#fecha-fin');
const contadorDiasSpan = document.querySelector('#contador-dias');
const displayPrecio = document.querySelector('#display-precio');

// Fecha mínima hoy
const hoy = new Date().toISOString().split('T')[0];
if(fechaInicio) fechaInicio.min = hoy;

// 3. LÓGICA DE PRECIO Y FECHAS
function calcularPrecio() {
    if (fechaInicio.value && fechaFin.value) {
        const inicio = new Date(fechaInicio.value);
        const fin = new Date(fechaFin.value);
        if (fin >= inicio) {
            const diffDays = Math.ceil(Math.abs(fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
            contadorDiasSpan.textContent = diffDays;
            let precio = preciosPorDia[diffDays] || (diffDays * 7);
            displayPrecio.textContent = `${translations[currentLang].total}${precio.toFixed(2)}`;
            return;
        }
    }
    contadorDiasSpan.textContent = "0";
    displayPrecio.textContent = `${translations[currentLang].total}0.00`;
}

fechaInicio.addEventListener('change', () => { fechaFin.min = fechaInicio.value; calcularPrecio(); });
fechaFin.addEventListener('change', calcularPrecio);

// 4. MÉTODOS DE PAGO
document.querySelectorAll('.pay-method').forEach(method => {
    method.addEventListener('click', () => {
        document.querySelectorAll('.pay-method').forEach(m => {
            m.style.borderColor = "#e9ecef";
            m.style.background = "#f8f9fa";
        });
        method.style.borderColor = "#1976d2";
        method.style.background = "#e3f2fd";
        selectedPayment = method.getAttribute('data-method');
    });
});

// 5. CAMBIO DE IDIOMA
document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelector('.lang-opt.active').classList.remove('active');
        opt.classList.add('active');
        currentLang = opt.textContent.toLowerCase();
        updateUI();
        calcularPrecio();
    });
});

function updateUI() {
    const t = translations[currentLang];
    document.querySelector('h1').textContent = t.title;
    document.querySelector('.badge-unlimited span').textContent = t.subtitle;
    document.querySelectorAll('.section-group label')[0].textContent = t.selectDays;
    document.querySelector('.comp-header label').textContent = t.compatibilityTitle;
    document.querySelector('.compatibility-box p:nth-of-type(1)').innerHTML = t.compatibilityText;
    document.querySelector('.comp-step').innerHTML = t.compatibilityStep;
    document.querySelector('.no-signal-badge').textContent = t.noSignal;
    document.querySelectorAll('.section-group label')[1].textContent = t.setupQuestion;
    
    const options = document.querySelectorAll('.option-content div');
    options[0].querySelector('strong').textContent = t.selfService;
    options[0].querySelector('span').textContent = t.selfServiceSub;
    options[1].querySelector('strong').textContent = t.techAssist;
    options[1].querySelector('span').textContent = t.techAssistSub;

    document.querySelectorAll('.section-group label')[2].textContent = t.paymentMethod;
    document.querySelector('#label-contacto').textContent = t.contactLabel;
    document.querySelector('.btn-activar').textContent = t.activateBtn;
    document.querySelector('#resumen-dias').firstChild.textContent = `${t.daysCount} `;
    
    const footers = document.querySelectorAll('.service-item span');
    footers[0].textContent = t.instantDelivery;
    footers[1].textContent = t.securePayment;
}

// 6. BOTÓN ACTIVAR
document.querySelector('.btn-activar').addEventListener('click', () => {
    const contacto = document.querySelector('#contacto-cliente').value;
    if (!contacto) return alert(translations[currentLang].errorContact);
    if (!selectedPayment) return alert(translations[currentLang].errorPay);
    
    alert(`${currentLang === 'es' ? 'Redirigiendo a' : 'Redirecting to'} ${selectedPayment}...`);
});

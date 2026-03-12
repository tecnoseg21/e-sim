// 1. CONFIGURACIÓN DE PRECIOS POR DÍA
const preciosPorDia = {
    1: 15.00,
    3: 25.00,
    7: 49.00,
    15: 65.00,
    30: 89.00
};

// 2. DICCIONARIO DE TRADUCCIONES
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
        daysCount: "Total:"
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
        daysCount: "Total:"
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
        daysCount: "Total:"
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
        daysCount: "Gesamt:"
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
        daysCount: "Totaal:"
    }
};
let currentLang = 'en';

// 3. ELEMENTOS DEL DOM
const fechaInicio = document.querySelector('#fecha-inicio');
const fechaFin = document.querySelector('#fecha-fin');
const contadorDiasSpan = document.querySelector('#contador-dias');
const displayPrecio = document.querySelector('#display-precio');

// Establecer fecha mínima como "hoy" para evitar errores
const hoy = new Date().toISOString().split('T')[0];
if(fechaInicio) fechaInicio.min = hoy;
if(fechaFin) fechaFin.min = hoy;

// 4. LÓGICA DE CÁLCULO
function calcularPrecioFinal() {
    const inicio = new Date(fechaInicio.value);
    const fin = new Date(fechaFin.value);

    if (fechaInicio.value && fechaFin.value && fin >= inicio) {
        // Cálculo de diferencia de días
        const diffTime = Math.abs(fin - inicio);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir ambos días
        
        contadorDiasSpan.textContent = diffDays;

        // Buscar precio en la tabla o usar el fallback de $7 por día extra
        let precio = preciosPorDia[diffDays] || (diffDays * 7);
        
        displayPrecio.textContent = `${translations[currentLang].total}${precio.toFixed(2)}`;
    } else {
        contadorDiasSpan.textContent = "0";
        displayPrecio.textContent = `${translations[currentLang].total}0.00`;
    }
}

// 5. CAMBIO DE IDIOMA
document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelector('.lang-opt.active').classList.remove('active');
        opt.classList.add('active');

        currentLang = opt.textContent.toLowerCase();
        if (translations[currentLang]) {
            updateLanguageUI(currentLang);
            calcularPrecioFinal();
        }
    });
});

function updateLanguageUI(lang) {
    const t = translations[lang];
    
    document.querySelector('h1').textContent = t.title;
    document.querySelector('.badge-unlimited span').textContent = t.subtitle;
    document.querySelector('.section-group label').textContent = t.selectDays;
    document.querySelector('.comp-header label').textContent = t.compatibilityTitle;
    document.querySelector('.compatibility-box p:nth-of-type(1)').innerHTML = t.compatibilityText;
    document.querySelector('.comp-step').innerHTML = t.compatibilityStep;
    document.querySelector('.no-signal-badge').textContent = t.noSignal;
    document.querySelector('.section-group:nth-of-type(3) > label').textContent = t.setupQuestion;
    
    const options = document.querySelectorAll('.option-content div');
    options[0].querySelector('strong').textContent = t.selfService;
    options[0].querySelector('span').textContent = t.selfServiceSub;
    options[1].querySelector('strong').textContent = t.techAssist;
    options[1].querySelector('span').textContent = t.techAssistSub;

    document.querySelector('.section-group:nth-of-type(4) label').textContent = t.paymentMethod;
    document.querySelector('.section-group:nth-of-type(5) label').textContent = t.contactLabel;
    document.querySelector('.btn-activar').textContent = t.activateBtn;
    
    // Texto del contador de días
    document.querySelector('#resumen-dias').firstChild.textContent = `${t.daysCount} `;

    const footerItems = document.querySelectorAll('.service-item span');
    footerItems[0].textContent = t.instantDelivery;
    footerItems[1].textContent = t.securePayment;
}

// Eventos para detectar cambios en las fechas
fechaInicio.addEventListener('change', () => {
    fechaFin.min = fechaInicio.value; // El fin no puede ser antes del inicio
    calcularPrecioFinal();
});
fechaFin.addEventListener('change', calcularPrecioFinal);

// Inicializar
calcularPrecioFinal();

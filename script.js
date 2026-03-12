const translations = {
    en: {
        title: "eSIM Costa Rica",
        subtitle: "Unlimited internet nationwide",
        selectDays: "Select your days",
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
        contactLabel: "WhatsApp or Email (to send code):",
        activateBtn: "ACTIVATE NOW",
        instantDelivery: "Instant Delivery",
        securePayment: "Secure Payment"
    },
    es: {
        title: "eSIM Costa Rica",
        subtitle: "Internet ilimitado en todo el país",
        selectDays: "Seleccione sus días",
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
        contactLabel: "WhatsApp o Correo (para enviar código):",
        activateBtn: "ACTIVAR AHORA",
        instantDelivery: "Entrega Inmediata",
        securePayment: "Pago Seguro"
    }
    // Puedes agregar fr, de, nl siguiendo el mismo formato
};

document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        // Cambiar clase activa visualmente
        document.querySelector('.lang-opt.active').classList.remove('active');
        opt.classList.add('active');

        const lang = opt.textContent.toLowerCase();
        if (translations[lang]) {
            updateLanguage(lang);
        }
    });
});

function updateLanguage(lang) {
    const t = translations[lang];
    
    // Actualizar textos por clase o tag
    document.querySelector('h1').textContent = t.title;
    document.querySelector('.badge-unlimited span').textContent = t.subtitle;
    document.querySelector('.section-group label').textContent = t.selectDays;
    document.querySelector('.comp-header label').textContent = t.compatibilityTitle;
    document.querySelector('.compatibility-box p:nth-of-type(1)').innerHTML = t.compatibilityText;
    document.querySelector('.comp-step').innerHTML = t.compatibilityStep;
    document.querySelector('.no-signal-badge').textContent = t.noSignal;
    document.querySelector('.section-group:nth-of-type(3) > label').textContent = t.setupQuestion;
    
    // Tarjetas de opción
    const options = document.querySelectorAll('.option-content div');
    options[0].querySelector('strong').textContent = t.selfService;
    options[0].querySelector('span').textContent = t.selfServiceSub;
    options[1].querySelector('strong').textContent = t.techAssist;
    options[1].querySelector('span').textContent = t.techAssistSub;

    document.querySelector('.section-group:nth-of-type(4) label').textContent = t.paymentMethod;
    document.querySelector('.section-group:nth-of-type(5) label').textContent = t.contactLabel;
    document.querySelector('.btn-activar').textContent = t.activateBtn;
    
    const footerItems = document.querySelectorAll('.service-item span');
    footerItems[0].textContent = t.instantDelivery;
    footerItems[1].textContent = t.securePayment;
}

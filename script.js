/* =========================================================
   SUPABASE
   - Conexión al proyecto Supabase
   - Se usa para guardar los pedidos en la tabla "orders"
========================================================= */
const supabaseUrl = "https://czqylvofewjvhqsyjhwl.supabase.co";
const supabaseKey = "sb_publishable_M_pl2tHR3S8zWhN-awxXDQ_LiyDYXWI";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

/* =========================================================
   IDIOMA ACTUAL
   - Por defecto inicia en inglés
========================================================= */
let currentLang = "EN";

/* =========================================================
   TRADUCCIONES
   - Todos los textos del checkout
========================================================= */
const translations = {
    EN: {
        travelDates: "Travel Dates",
        startDate: "Start Date",
        endDate: "End Date",
        totalDays: "Total:",
        daysUnit: "days",

        contactLabel: "Email (for activation code):",
        contactPlaceholder: "email@test.com",
        errorContact: "Enter your email",
        errorInvalidEmail: "Enter a valid email address",

        compatibleTitle: "Is my phone compatible?",
        compatibleP1: "Dial *#06# on your phone.",
        compatibleP2: "If an EID code appears, you're ready.",

        activation: "Activation method",

        selfInstall: "I will install the eSIM myself",
        selfInstallSub: "Fast setup with simple instructions",
        selfInstallExtra: "Ideal for travelers who want a quick and simple setup.",
        selfBadge1: "⚡ Fast",
        selfBadge2: "📱 Easy",
        selfBadge3: "🌐 Online",

        storeInstall: "Install for me at the store (technical support)",
        storeInstallSub: "Personal assistance at our physical store",
        storeInstallExtra: "You can pay by card or cash at the store with no additional cost.",
        storeBadge1: "💳 Card",
        storeBadge2: "💵 Cash",
        storeBadge3: "✔ No extra cost",
        storeLocation: "View store location",

        miniPriceLabel: "Estimated total",
        miniPriceNote: "Secure payment and fast activation",

        total: "Total to pay: $",
        perDay: "per day",
        duration: "Duration:",
        daysText: "days",

        checkout: "CHECKOUT",
        errorDates: "Please select valid dates",

        paymentApproved: "Payment approved and order saved successfully.",
        paymentSaveError: "The payment was approved, but there was a problem saving the order.",
        paymentError: "There was a problem with PayPal. Please try again.",

        footer1: "Instant Delivery",
        footer2: "Secure Payment",
        footer3: "eSIM Ready",

        badgeText: "Unlimited internet nationwide",

        alertInvalidDatesTitle: "Invalid dates",
        alertMissingContactTitle: "Missing contact",
        alertSuccessTitle: "Success",
        alertWarningTitle: "Warning",
        alertPaymentErrorTitle: "Payment error",
        alertButton: "OK"
    },

    ES: {
        travelDates: "Fechas de viaje",
        startDate: "Fecha de inicio",
        endDate: "Fecha de fin",
        totalDays: "Total:",
        daysUnit: "días",

        contactLabel: "Correo electrónico (para código de activación):",
        contactPlaceholder: "correo@test.com",
        errorContact: "Ingresa tu correo electrónico",
        errorInvalidEmail: "Ingresa un correo electrónico válido",

        compatibleTitle: "¿Es mi teléfono compatible?",
        compatibleP1: "Marca *#06# en tu teléfono.",
        compatibleP2: "Si aparece un código EID, estás listo.",

        activation: "Método de activación",

        selfInstall: "Instalaré la eSIM yo mismo",
        selfInstallSub: "Configuración rápida con instrucciones simples",
        selfInstallExtra: "Ideal para viajeros que desean una instalación rápida y sencilla.",
        selfBadge1: "⚡ Rápido",
        selfBadge2: "📱 Fácil",
        selfBadge3: "🌐 En línea",

        storeInstall: "Instalar en la tienda (soporte técnico)",
        storeInstallSub: "Asistencia personal en nuestra tienda física",
        storeInstallExtra: "Puede pagar con tarjeta o efectivo en la tienda sin costo adicional.",
        storeBadge1: "💳 Tarjeta",
        storeBadge2: "💵 Efectivo",
        storeBadge3: "✔ Sin costo adicional",
        storeLocation: "Ver ubicación de la tienda",

        miniPriceLabel: "Total estimado",
        miniPriceNote: "Pago seguro y activación rápida",

        total: "Total a pagar: $",
        perDay: "por día",
        duration: "Duración:",
        daysText: "días",

        checkout: "FINALIZAR COMPRA",
        errorDates: "Por favor selecciona fechas válidas",

        paymentApproved: "Pago aprobado y pedido guardado correctamente.",
        paymentSaveError: "El pago se aprobó, pero hubo un problema guardando el pedido.",
        paymentError: "Hubo un problema con PayPal. Inténtalo de nuevo.",

        footer1: "Entrega inmediata",
        footer2: "Pago seguro",
        footer3: "Listo para eSIM",

        badgeText: "Internet ilimitado en todo el país",

        alertInvalidDatesTitle: "Fechas inválidas",
        alertMissingContactTitle: "Falta contacto",
        alertSuccessTitle: "Éxito",
        alertWarningTitle: "Advertencia",
        alertPaymentErrorTitle: "Error de pago",
        alertButton: "Aceptar"
    },

    FR: {
        travelDates: "Dates de voyage",
        startDate: "Date de début",
        endDate: "Date de fin",
        totalDays: "Total :",
        daysUnit: "jours",

        contactLabel: "Email (pour le code d'activation) :",
        contactPlaceholder: "email@test.com",
        errorContact: "Entrez votre email",
        errorInvalidEmail: "Entrez une adresse email valide",

        compatibleTitle: "Mon téléphone est-il compatible ?",
        compatibleP1: "Composez *#06# sur votre téléphone.",
        compatibleP2: "Si un code EID apparaît, vous êtes prêt.",

        activation: "Méthode d'activation",

        selfInstall: "Je vais installer l'eSIM moi-même",
        selfInstallSub: "Configuration rapide avec instructions simples",
        selfInstallExtra: "Idéal pour les voyageurs qui veulent une installation rapide et simple.",
        selfBadge1: "⚡ Rapide",
        selfBadge2: "📱 Facile",
        selfBadge3: "🌐 En ligne",

        storeInstall: "Installer en magasin (support technique)",
        storeInstallSub: "Assistance personnelle dans notre magasin",
        storeInstallExtra: "Vous pouvez payer par carte ou en espèces au magasin sans frais supplémentaires.",
        storeBadge1: "💳 Carte",
        storeBadge2: "💵 Espèces",
        storeBadge3: "✔ Sans frais supplémentaires",
        storeLocation: "Voir l'emplacement du magasin",

        miniPriceLabel: "Total estimé",
        miniPriceNote: "Paiement sécurisé et activation rapide",

        total: "Total à payer : $",
        perDay: "par jour",
        duration: "Durée :",
        daysText: "jours",

        checkout: "PAYER",
        errorDates: "Veuillez choisir des dates valides",

        paymentApproved: "Paiement approuvé et commande enregistrée avec succès.",
        paymentSaveError: "Le paiement a été approuvé, mais un problème est survenu lors de l'enregistrement de la commande.",
        paymentError: "Un problème est survenu avec PayPal. Veuillez réessayer.",

        footer1: "Livraison instantanée",
        footer2: "Paiement sécurisé",
        footer3: "Prêt pour eSIM",

        badgeText: "Internet illimité dans tout le pays",

        alertInvalidDatesTitle: "Dates invalides",
        alertMissingContactTitle: "Contact manquant",
        alertSuccessTitle: "Succès",
        alertWarningTitle: "Avertissement",
        alertPaymentErrorTitle: "Erreur de paiement",
        alertButton: "OK"
    },

    DE: {
        travelDates: "Reisedaten",
        startDate: "Startdatum",
        endDate: "Enddatum",
        totalDays: "Gesamt:",
        daysUnit: "Tage",

        contactLabel: "E-Mail (für den Aktivierungscode):",
        contactPlaceholder: "email@test.com",
        errorContact: "Geben Sie Ihre E-Mail ein",
        errorInvalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein",

        compatibleTitle: "Ist mein Handy kompatibel?",
        compatibleP1: "Wählen Sie *#06# auf Ihrem Handy.",
        compatibleP2: "Wenn ein EID-Code erscheint, sind Sie bereit.",

        activation: "Aktivierungsmethode",

        selfInstall: "Ich installiere die eSIM selbst",
        selfInstallSub: "Schnelle Einrichtung mit einfachen Anweisungen",
        selfInstallExtra: "Ideal für Reisende, die eine schnelle und einfache Einrichtung möchten.",
        selfBadge1: "⚡ Schnell",
        selfBadge2: "📱 Einfach",
        selfBadge3: "🌐 Online",

        storeInstall: "Installation im Geschäft (technischer Support)",
        storeInstallSub: "Persönliche Unterstützung in unserem Geschäft",
        storeInstallExtra: "Sie können im Geschäft per Karte oder bar ohne zusätzliche Kosten bezahlen.",
        storeBadge1: "💳 Karte",
        storeBadge2: "💵 Bargeld",
        storeBadge3: "✔ Keine Zusatzkosten",
        storeLocation: "Standort des Geschäfts ansehen",

        miniPriceLabel: "Geschätzter Gesamtbetrag",
        miniPriceNote: "Sichere Zahlung und schnelle Aktivierung",

        total: "Gesamtbetrag: $",
        perDay: "pro Tag",
        duration: "Dauer:",
        daysText: "Tage",

        checkout: "KASSE",
        errorDates: "Bitte gültige Daten wählen",

        paymentApproved: "Zahlung genehmigt und Bestellung erfolgreich gespeichert.",
        paymentSaveError: "Die Zahlung wurde genehmigt, aber beim Speichern der Bestellung ist ein Problem aufgetreten.",
        paymentError: "Es gab ein Problem mit PayPal. Bitte versuchen Sie es erneut.",

        footer1: "Sofortige Lieferung",
        footer2: "Sichere Zahlung",
        footer3: "eSIM bereit",

        badgeText: "Unbegrenztes Internet im ganzen Land",

        alertInvalidDatesTitle: "Ungültige Daten",
        alertMissingContactTitle: "Kontakt fehlt",
        alertSuccessTitle: "Erfolg",
        alertWarningTitle: "Warnung",
        alertPaymentErrorTitle: "Zahlungsfehler",
        alertButton: "OK"
    },

    NL: {
        travelDates: "Reisdata",
        startDate: "Startdatum",
        endDate: "Einddatum",
        totalDays: "Totaal:",
        daysUnit: "dagen",

        contactLabel: "E-mail (voor activatiecode):",
        contactPlaceholder: "email@test.com",
        errorContact: "Voer je e-mailadres in",
        errorInvalidEmail: "Voer een geldig e-mailadres in",

        compatibleTitle: "Is mijn telefoon compatibel?",
        compatibleP1: "Toets *#06# op je telefoon.",
        compatibleP2: "Als er een EID-code verschijnt, ben je klaar.",

        activation: "Activatiemethode",

        selfInstall: "Ik installeer de eSIM zelf",
        selfInstallSub: "Snelle installatie met eenvoudige instructies",
        selfInstallExtra: "Ideaal voor reizigers die een snelle en eenvoudige installatie willen.",
        selfBadge1: "⚡ Snel",
        selfBadge2: "📱 Eenvoudig",
        selfBadge3: "🌐 Online",

        storeInstall: "Installatie in de winkel (technische ondersteuning)",
        storeInstallSub: "Persoonlijke hulp in onze winkel",
        storeInstallExtra: "Je kunt in de winkel met kaart of contant betalen zonder extra kosten.",
        storeBadge1: "💳 Kaart",
        storeBadge2: "💵 Contant",
        storeBadge3: "✔ Geen extra kosten",
        storeLocation: "Bekijk winkellocatie",

        miniPriceLabel: "Geschatte totaalprijs",
        miniPriceNote: "Veilige betaling en snelle activatie",

        total: "Totaal te betalen: $",
        perDay: "per dag",
        duration: "Duur:",
        daysText: "dagen",

        checkout: "AFREKENEN",
        errorDates: "Selecteer geldige datums",

        paymentApproved: "Betaling goedgekeurd en bestelling succesvol opgeslagen.",
        paymentSaveError: "De betaling is goedgekeurd, maar er was een probleem bij het opslaan van de bestelling.",
        paymentError: "Er was een probleem met PayPal. Probeer het opnieuw.",

        footer1: "Directe levering",
        footer2: "Veilige betaling",
        footer3: "eSIM gereed",

        badgeText: "Onbeperkt internet in het hele land",

        alertInvalidDatesTitle: "Ongeldige datums",
        alertMissingContactTitle: "Contact ontbreekt",
        alertSuccessTitle: "Succes",
        alertWarningTitle: "Waarschuwing",
        alertPaymentErrorTitle: "Betalingsfout",
        alertButton: "OK"
    }
};

/* =========================================================
   FUNCIÓN AUXILIAR
   - Convierte fecha tipo YYYY-MM-DD a objeto Date local
========================================================= */
function parseLocalDate(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

/* =========================================================
   GUARDAR PEDIDO EN SUPABASE
========================================================= */
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
        .from("orders")
        .insert([
            {
                customer_contact: contacto,
                start_date: fechaInicio,
                end_date: fechaFin,
                days: dias,
                amount: monto,
                currency: "USD",
                paypal_order_id: paypalOrderId || null,
                paypal_capture_id: paypalCaptureId || null,
                status: status || "pending",
                language: idioma || "EN",
                installation_method: installationMethod || "self"
            }
        ])
        .select();

    if (error) {
        console.error("Error guardando pedido:", error);
        throw error;
    }

    return data;
}

/* =========================================================
   OBTENER TEXTO SEGÚN IDIOMA ACTUAL
========================================================= */
function getLang() {
    return translations[currentLang] || translations.EN;
}

/* =========================================================
   ALERTA PERSONALIZADA
========================================================= */
function showCustomAlert(message, title) {
    const overlay = document.getElementById("custom-alert");
    const titleEl = document.getElementById("custom-alert-title");
    const messageEl = document.getElementById("custom-alert-message");
    const btn = document.getElementById("custom-alert-btn");
    const lang = getLang();

    if (!overlay || !titleEl || !messageEl || !btn) {
        window.alert(message);
        return;
    }

    titleEl.textContent = title || "Notice";
    messageEl.textContent = message;
    btn.textContent = lang.alertButton || "OK";

    overlay.classList.remove("hidden");

    btn.onclick = () => {
        overlay.classList.add("hidden");
    };

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.classList.add("hidden");
        }
    };
}

/* =========================================================
   GOOGLE PAY
   - Intenta mostrar el botón si el entorno es elegible
========================================================= */
async function initGooglePayButton() {
    const container = document.getElementById("google-pay-container");
    if (!container) {
        console.log("No existe #google-pay-container");
        return;
    }

    container.innerHTML = "";
    container.style.display = "none";

    console.log("window.paypal:", !!window.paypal);
    console.log("paypal.Googlepay:", !!(window.paypal && paypal.Googlepay));
    console.log("window.google:", !!window.google);
    console.log("google.payments:", !!(window.google && window.google.payments));

    if (!window.paypal || !paypal.Googlepay || !window.google || !window.google.payments) {
        console.warn("Google Pay o PayPal Googlepay no están disponibles todavía.");
        return;
    }

    try {
        googlePayConfig = await paypal.Googlepay().config();
        console.log("googlePayConfig:", googlePayConfig);

        if (!googlePayConfig || !googlePayConfig.allowedPaymentMethods) {
            console.warn("No se recibió configuración válida de Google Pay desde PayPal.");
            return;
        }

        const paymentsClient = getGooglePayClient();
        if (!paymentsClient) {
            console.warn("No se pudo crear el cliente de Google Pay.");
            return;
        }

        const isReadyToPayRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: googlePayConfig.allowedPaymentMethods
        };

        console.log("isReadyToPayRequest:", isReadyToPayRequest);

        const isReadyToPayResponse = await paymentsClient.isReadyToPay(isReadyToPayRequest);
        console.log("isReadyToPayResponse:", isReadyToPayResponse);

        if (!isReadyToPayResponse.result) {
            console.warn("Google Pay no está listo en este navegador/dispositivo/cuenta.");
            return;
        }

        const googlePayButton = paymentsClient.createButton({
            onClick: onGooglePayButtonClicked,
            buttonType: "plain",
            buttonColor: "black"
        });

        container.appendChild(googlePayButton);
        container.style.display = "block";

        console.log("Botón de Google Pay renderizado correctamente.");
    } catch (error) {
        console.error("Error inicializando Google Pay:", error);
    }
}
/* =========================================================
   CALCULAR DÍAS ENTRE FECHAS
========================================================= */
function calcularDias(fechaInicio, fechaFin) {
    const d1 = parseLocalDate(fechaInicio);
    const d2 = parseLocalDate(fechaFin);

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    return Math.floor((d2 - d1) / milisegundosPorDia) + 1;
}

/* =========================================================
   CALCULAR COSTO DIARIO SEGÚN CANTIDAD DE DÍAS
========================================================= */
function obtenerCostoDiario(dias) {
    if (dias >= 30) return 89 / 30;
    if (dias >= 15) return 65 / 15;
    if (dias >= 7) return 49 / 7;
    if (dias >= 3) return 25 / 3;
    return 15;
}

/* =========================================================
   OBTENER MÉTODO DE INSTALACIÓN SELECCIONADO
========================================================= */
function obtenerMetodoInstalacion() {
    const opcionSeleccionada = document.querySelector('input[name="instalacion"]:checked');
    return opcionSeleccionada ? opcionSeleccionada.value : "self";
}

/* =========================================================
   VALIDAR EMAIL
========================================================= */
function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* =========================================================
   ACTUALIZAR MINI TARJETA DE PRECIO
========================================================= */
function actualizarMiniPrecio(precio) {
    const totalPrice = document.getElementById("totalPrice");
    if (totalPrice) {
        totalPrice.textContent = precio.toFixed(2);
    }
}

/* =========================================================
   LIMPIAR / RESETEAR CHECKOUT
========================================================= */
function resetCheckout() {
    const btnValidar = document.getElementById("btn-validar");
    const paymentArea = document.getElementById("payment-area");
    const paypalContainer = document.getElementById("paypal-button-container");

    if (paymentArea && paymentArea.style.display === "block") {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        paymentArea.style.display = "none";

        if (paypalContainer) {
            paypalContainer.innerHTML = "";
        }

        limpiarGooglePay();

        if (btnValidar) {
            btnValidar.style.display = "inline-flex";
        }

        window.scrollTo(0, scrollPos);
    }

    calcularPrecio();
}

/* =========================================================
   ACTUALIZAR TODA LA INTERFAZ AL CAMBIAR IDIOMA
========================================================= */
function updateUI() {
    const lang = getLang();

    const badgeText = document.getElementById("badge-text");
    if (badgeText) badgeText.textContent = lang.badgeText;

    const labelDates = document.getElementById("label-dates");
    const labelStart = document.getElementById("label-start");
    const labelEnd = document.getElementById("label-end");
    const txtTotalDays = document.getElementById("txt-total-days");
    const txtDaysUnit = document.getElementById("txt-days-unit");

    if (labelDates) labelDates.textContent = lang.travelDates;
    if (labelStart) labelStart.textContent = lang.startDate;
    if (labelEnd) labelEnd.textContent = lang.endDate;
    if (txtTotalDays) txtTotalDays.textContent = lang.totalDays;
    if (txtDaysUnit) txtDaysUnit.textContent = lang.daysUnit;

    const labelComp = document.getElementById("label-comp");
    const compP1 = document.getElementById("comp-p1");
    const compP2 = document.getElementById("comp-p2");

    if (labelComp) labelComp.textContent = lang.compatibleTitle;
    if (compP1) compP1.innerHTML = lang.compatibleP1.replace("*#06#", "<strong>*#06#</strong>");
    if (compP2) compP2.innerHTML = lang.compatibleP2.replace("EID", "<strong>EID</strong>");

    const labelActivation = document.getElementById("label-activation");
    const optSelf = document.getElementById("opt-self");
    const optSelfSub = document.getElementById("opt-self-sub");
    const optSelfExtra = document.getElementById("opt-self-extra");
    const selfBadge1 = document.getElementById("self-badge-1");
    const selfBadge2 = document.getElementById("self-badge-2");
    const selfBadge3 = document.getElementById("self-badge-3");

    const optStore = document.getElementById("opt-store");
    const optStoreSub = document.getElementById("opt-store-sub");
    const optStoreExtra = document.getElementById("opt-store-extra");
    const storeBadge1 = document.getElementById("store-badge-1");
    const storeBadge2 = document.getElementById("store-badge-2");
    const storeBadge3 = document.getElementById("store-badge-3");
    const storeLocationText = document.getElementById("store-location-text");

    if (labelActivation) labelActivation.textContent = lang.activation;

    if (optSelf) optSelf.textContent = lang.selfInstall;
    if (optSelfSub) optSelfSub.textContent = lang.selfInstallSub;
    if (optSelfExtra) optSelfExtra.textContent = lang.selfInstallExtra;
    if (selfBadge1) selfBadge1.textContent = lang.selfBadge1;
    if (selfBadge2) selfBadge2.textContent = lang.selfBadge2;
    if (selfBadge3) selfBadge3.textContent = lang.selfBadge3;

    if (optStore) optStore.textContent = lang.storeInstall;
    if (optStoreSub) optStoreSub.textContent = lang.storeInstallSub;
    if (optStoreExtra) optStoreExtra.textContent = lang.storeInstallExtra;
    if (storeBadge1) storeBadge1.textContent = lang.storeBadge1;
    if (storeBadge2) storeBadge2.textContent = lang.storeBadge2;
    if (storeBadge3) storeBadge3.textContent = lang.storeBadge3;
    if (storeLocationText) storeLocationText.textContent = lang.storeLocation;

    const labelContacto = document.getElementById("label-contacto");
    const inputContacto = document.getElementById("contacto-cliente");

    if (labelContacto) labelContacto.textContent = lang.contactLabel;
    if (inputContacto) inputContacto.placeholder = lang.contactPlaceholder;

    const miniPriceLabel = document.getElementById("mini-price-label");
    const miniPriceNote = document.getElementById("mini-price-note");

    if (miniPriceLabel) miniPriceLabel.textContent = lang.miniPriceLabel;
    if (miniPriceNote) miniPriceNote.textContent = lang.miniPriceNote;

    const btnCheckoutText = document.getElementById("btn-checkout-text");
    if (btnCheckoutText) btnCheckoutText.textContent = lang.checkout;

    const footer1 = document.getElementById("footer-1");
    const footer2 = document.getElementById("footer-2");
    const footer3 = document.getElementById("footer-3");

    if (footer1) footer1.textContent = lang.footer1;
    if (footer2) footer2.textContent = lang.footer2;
    if (footer3) footer3.textContent = lang.footer3;

    const customAlertBtn = document.getElementById("custom-alert-btn");
    if (customAlertBtn) customAlertBtn.textContent = lang.alertButton;

    calcularPrecio();
}

/* =========================================================
   CALCULAR PRECIO
========================================================= */
function calcularPrecio() {
    const inputInicio = document.getElementById("fecha-inicio");
    const inputFin = document.getElementById("fecha-fin");
    const displayPrecio = document.getElementById("display-precio");
    const contadorDiasSpan = document.getElementById("contador-dias");
    const lang = getLang();

    if (!inputInicio.value || !inputFin.value) {
        if (contadorDiasSpan) contadorDiasSpan.textContent = "0";
        actualizarMiniPrecio(0);

        if (displayPrecio) {
            displayPrecio.innerHTML = "";
        }

        return 0;
    }

    const fechaInicio = inputInicio.value;
    const fechaFin = inputFin.value;

    if (parseLocalDate(fechaFin) < parseLocalDate(fechaInicio)) {
        if (contadorDiasSpan) contadorDiasSpan.textContent = "0";
        actualizarMiniPrecio(0);

        if (displayPrecio) {
            displayPrecio.innerHTML = "";
        }

        return 0;
    }

    const dias = calcularDias(fechaInicio, fechaFin);
    const costoDiario = obtenerCostoDiario(dias);
    const precioTotal = dias * costoDiario;

    if (contadorDiasSpan) {
        contadorDiasSpan.textContent = dias;
    }

    actualizarMiniPrecio(precioTotal);

    if (displayPrecio) {
        displayPrecio.innerHTML = `
            <div style="font-size: 0.9rem; opacity: 0.95; margin-bottom: 5px; color: white;">
                ${lang.duration} <strong>${dias} ${lang.daysText}</strong>
                <span style="margin-left:10px; font-weight:normal;">($${costoDiario.toFixed(2)} ${lang.perDay})</span>
            </div>
            <div style="font-size: 1.5rem; font-weight: 800; color: white;">
                ${lang.total}${precioTotal.toFixed(2)}
            </div>
        `;
    }

    return precioTotal;
}

/* =========================================================
   INICIALIZAR PAYPAL
========================================================= */
function initPayPal(monto, contacto) {
    const container = document.getElementById("paypal-button-container");
    if (!container) return;

    container.innerHTML = "";
    limpiarGooglePay();

    setTimeout(() => {
        paypal.Buttons({
            style: {
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "pay"
            },

            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: monto.toFixed(2)
                            },
                            description: `eSIM Costa Rica - ${contacto}`
                        }
                    ]
                });
            },

            onApprove: async (data, actions) => {
                try {
                    const details = await actions.order.capture();

                    const fechaInicio = document.getElementById("fecha-inicio").value;
                    const fechaFin = document.getElementById("fecha-fin").value;
                    const contactoActual = document.getElementById("contacto-cliente").value.trim();
                    const metodoInstalacion = obtenerMetodoInstalacion();

                    const dias = calcularDias(fechaInicio, fechaFin);
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
                        status: "paid",
                        installationMethod: metodoInstalacion
                    });

                    showCustomAlert(
                        getLang().paymentApproved,
                        getLang().alertSuccessTitle
                    );

                    setTimeout(() => {
                        window.location.href = "gracias.html";
                    }, 1200);
                } catch (error) {
                    console.error("Error al capturar o guardar el pedido:", error);
                    showCustomAlert(
                        getLang().paymentSaveError,
                        getLang().alertWarningTitle
                    );
                }
            },

            onError: (err) => {
                console.error("Error en PayPal:", err);
                showCustomAlert(
                    getLang().paymentError,
                    getLang().alertPaymentErrorTitle
                );
            }
        })
            .render("#paypal-button-container")
            .then(async () => {
                await initGooglePayButton();

                const paymentArea = document.getElementById("payment-area");
                if (paymentArea) {
                    paymentArea.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }
            });
    }, 100);
}

/* =========================================================
   EVENTO: CAMBIO DE IDIOMA
========================================================= */
document.querySelectorAll(".lang-opt").forEach((opt) => {
    opt.addEventListener("click", function () {
        document.querySelectorAll(".lang-opt").forEach((el) => el.classList.remove("active"));
        this.classList.add("active");

        currentLang = this.getAttribute("data-lang");
        updateUI();
    });
});

/* =========================================================
   EVENTO: BOTÓN PRINCIPAL CHECKOUT
========================================================= */
document.getElementById("btn-validar").addEventListener("click", function () {
    const monto = calcularPrecio();
    const contacto = document.getElementById("contacto-cliente").value.trim();
    const paymentArea = document.getElementById("payment-area");
    const lang = getLang();

    if (monto <= 0) {
        showCustomAlert(lang.errorDates, lang.alertInvalidDatesTitle);
        return;
    }

    if (!contacto) {
        showCustomAlert(lang.errorContact, lang.alertMissingContactTitle);
        return;
    }

    if (!esEmailValido(contacto)) {
        showCustomAlert(lang.errorInvalidEmail, lang.alertMissingContactTitle);
        return;
    }

    const currentPos = window.pageYOffset || document.documentElement.scrollTop;

    this.style.display = "none";
    paymentArea.style.display = "block";

    window.scrollTo(0, currentPos);

    initPayPal(monto, contacto);
});

/* =========================================================
   EVENTOS: SI CAMBIA ALGO, SE RESETEA EL CHECKOUT
========================================================= */
document.getElementById("fecha-inicio").addEventListener("change", resetCheckout);
document.getElementById("fecha-fin").addEventListener("change", resetCheckout);
document.getElementById("contacto-cliente").addEventListener("input", resetCheckout);

document.querySelectorAll('input[name="instalacion"]').forEach((radio) => {
    radio.addEventListener("change", resetCheckout);
});

/* =========================================================
   INICIO
========================================================= */
updateUI();
calcularPrecio();

const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'EN';

const translations = {
    EN: { total: "Total to pay: $", errorContact: "Enter WhatsApp/Email", errorDates: "Please select valid dates", duration: "Duration: ", days: " days" },
    ES: { total: "Total a pagar: $", errorContact: "Ingresa WhatsApp/Correo", errorDates: "Por favor selecciona fechas válidas", duration: "Duración: ", days: " días" }
};

// 1. MANEJO DE IDIOMAS
document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', function() {
        // Quitar clase activa de todos y ponerla al seleccionado
        document.querySelectorAll('.lang-opt').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        
        currentLang = this.textContent.trim();
        console.log("Idioma cambiado a:", currentLang);
        
        // Si ya hay un precio calculado, lo actualizamos al idioma nuevo
        calcularPrecio();
    });
});

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
            
            // Actualizar el contador de días pequeño (arriba)
            if (contadorDiasSpan) contadorDiasSpan.textContent = dias;
            
            let precio = preciosPorDia[dias] || (dias * 7);
            
            // Actualizar el precio grande (el que se muestra al final)
            // Agregamos la duración en días dentro del mismo cuadro
            const textoDias = translations[currentLang === 'ES' ? 'ES' : 'EN'].duration + dias + translations[currentLang === 'ES' ? 'ES' : 'EN'].days;
            const textoTotal = translations[currentLang === 'ES' ? 'ES' : 'EN'].total + precio.toFixed(2);
            
            displayPrecio.innerHTML = `<small style="font-size:0.8rem; display:block; opacity:0.8;">${textoDias}</small> ${textoTotal}`;
            
            return precio;
        }
    }
    return 0;
}

// 2. LÓGICA DEL BOTÓN CHECKOUT
document.getElementById('btn-validar').addEventListener('click', function(e) {
    const monto = calcularPrecio();
    const contacto = document.querySelector('#contacto-cliente').value;
    const paypalContainer = document.getElementById('paypal-button-container');
    const displayPrecio = document.getElementById('display-precio');

    // Validaciones
    const langKey = currentLang === 'ES' ? 'ES' : 'EN';
    if (monto <= 0) return alert(translations[langKey].errorDates);
    if (!contacto || contacto.trim() === "") return alert(translations[langKey].errorContact);

    // PASO FINAL: Ocultar botón CHECKOUT, mostrar PRECIO y BOTONES PAYPAL
    this.style.display = 'none';
    displayPrecio.style.display = 'block';
    paypalContainer.style.display = 'block';
    
    initPayPal(monto, contacto);
});

function initPayPal(monto, contacto) {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; 

    paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: monto.toString() },
                    description: `eSIM Costa Rica - ${contacto}`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(details => {
                alert("¡Gracias! Procesando tu eSIM...");
                window.location.reload();
            });
        }
    }).render('#paypal-button-container');
}

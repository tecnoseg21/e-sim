// Configuración de escala de precios
const preciosPorDia = { 1: 15, 3: 25, 7: 49, 15: 65, 30: 89 };
let currentLang = 'EN';

// ... (objeto translations se mantiene igual) ...

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
            
            // --- NUEVA LÓGICA DE ESCALA DINÁMICA ---
            let precioTotal = 0;

            if (preciosPorDia[dias]) {
                // Si el día exacto existe en la tabla (1, 3, 7, 15, 30)
                precioTotal = preciosPorDia[dias];
            } else {
                // Si no es un día exacto, buscamos el rango anterior
                if (dias < 3) precioTotal = dias * 15;
                else if (dias < 7) precioTotal = dias * (25 / 3); // Aprox $8.33/día
                else if (dias < 15) precioTotal = dias * (49 / 7); // $7/día
                else if (dias < 30) precioTotal = dias * (65 / 15); // Aprox $4.33/día
                else precioTotal = dias * (89 / 30); // Aprox $2.96/día
            }
            
            let costoDiario = (precioTotal / dias).toFixed(2);
            const lang = translations[currentLang];
            
            displayPrecio.innerHTML = `
                <div style="font-size: 0.9rem; opacity: 0.95; margin-bottom: 5px;">
                    ${lang.duration} <strong>${dias} ${lang.days}</strong>
                    <span style="margin-left:10px; font-weight:normal;">($${costoDiario} ${lang.perDay})</span>
                </div>
                <div style="font-size: 1.5rem; font-weight: 800;">
                    ${lang.total}${precioTotal.toFixed(2)}
                </div>
            `;
            return precioTotal;
        }
    }
    if (contadorDiasSpan) contadorDiasSpan.textContent = "0";
    return 0;
}

// ... (resto de las funciones se mantienen igual) ...

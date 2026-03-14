/* =========================================================
   INICIALIZAR PAYPAL
   - Protegido para que Google Pay no rompa PayPal
========================================================= */
function initPayPal(monto, contacto) {
    const container = document.getElementById("paypal-button-container");
    if (!container || !window.paypal || !paypal.Buttons) {
        console.error("PayPal SDK no está disponible.");
        return;
    }

    container.innerHTML = "";
    limpiarGooglePay();

    setTimeout(() => {
        const buttons = paypal.Buttons({
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

                    /* Guardar compra en Supabase */
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

                    /* Enviar notificación por Formspree */
                    await notificarCompraFormspree({
                        contacto: contactoActual,
                        fechaInicio,
                        fechaFin,
                        dias,
                        monto: montoCalculado,
                        idioma: currentLang,
                        installationMethod: metodoInstalacion,
                        paypalOrderId: data.orderID,
                        paypalCaptureId: captureId
                    });

                    showCustomAlert(
                        getLang().paymentApproved,
                        getLang().alertSuccessTitle
                    );

                    setTimeout(() => {
                        window.location.href = "gracias.html";
                    }, 1200);

                } catch (error) {
                    console.error("Error al capturar, guardar o notificar:", error);
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
        });

        if (!buttons || !buttons.isEligible || !buttons.isEligible()) {
            console.error("paypal.Buttons() no es elegible en este entorno.");
            return;
        }

        buttons
            .render("#paypal-button-container")
            .then(() => {
                console.log("Botones de PayPal renderizados correctamente.");

                initGooglePayButton().catch((error) => {
                    console.error("Falló initGooglePayButton:", error);
                });

                const paymentArea = document.getElementById("payment-area");
                if (paymentArea) {
                    paymentArea.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }
            })
            .catch((error) => {
                console.error("Error renderizando paypal.Buttons():", error);
            });
    }, 100);
}

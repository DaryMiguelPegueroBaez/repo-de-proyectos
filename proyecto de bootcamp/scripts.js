 // Función para calcular la retención mensual

function calcularRetencionMensual(salarioAnual) {

    // Umbrales salariales y tasas impositivas

    const umbrales = [416220, 624329, 867123];
    const tasas = [0, 0.15, 0.20, 0.25];
    const montosFijos = [0, 31216, 79776];

    // Encontrar el índice del umbral correspondiente

    let indice = 0;
    while (indice < umbrales.length && salarioAnual > umbrales[indice]) {
        indice++;
    }

    // Calcular el exceso sobre el umbral

    const exceso = salarioAnual - (indice > 0 ? umbrales[indice - 1] : 0);

    // Calcular la retención mensual

    const retencion = ((exceso * tasas[indice]) + (indice > 0 ? montosFijos[indice - 1] : 0)) / 12;
    
    return retencion;
}

// Función para mostrar el resultado en pantalla

function calcularRetencion() {
    const nombre = document.getElementById('nombre').value.trim();
    const salarioMensual = parseFloat(document.getElementById('salarioMensual').value);
    
    // Validar campos

    if (nombre === "" || isNaN(salarioMensual) || salarioMensual <= 0) {
        alert('Por favor, ingresa un nombre válido y un salario mensual mayor que 0.');
        return;
    }

    const salarioAnual = salarioMensual * 12;
    const retencionMensual = calcularRetencionMensual(salarioAnual);

    const resultado = document.getElementById('resultado');
    resultado.textContent = `Hola, ${nombre}. Para un salario mensual de $${salarioMensual.toFixed(2)}, la retención mensual sería de $${retencionMensual.toFixed(2)}.`;
}
const fs = require('fs');

function esSeguro(niveles) {   // esto verigfica si un nivel es seguro 

    const creciente = niveles.every((_, i) => i === 0 || niveles[i] > niveles[i - 1]);   // determina si todos son crecientes o decrecientes
    const decreciente = niveles.every((_, i) => i === 0 || niveles[i] < niveles[i - 1]);

    if (!creciente && !decreciente) {
        return false;    // devuelve que no todos son crecientes o decrecientes
    }

    for (let i = 1; i < niveles.length; i++) {
        const diferencia = Math.abs(niveles[i] - niveles[i - 1]);  // verifica que la diferencia adyacente sea solamente de 1 y 3
        if (diferencia < 1 || diferencia > 3) {
            return false;
        }
    }

    return true;
}

function esSeguroSiOSi(niveles) {  // verifica si un informe es seguro si o si :D

    if (esSeguro(niveles)) {    // si el informe es seguro sin hacer ninguna eliminacion se asume que es completamente seguro
        return true;
    }

    for (let i = 0; i < niveles.length; i++) {
        const nivelesModificados = [...niveles.slice(0, i), ...niveles.slice(i + 1)];  // se intenta eliminar un solo nivel y se verifiva si el informe se convierte en seguro
        if (esSeguro(nivelesModificados)) {
            return true;
        }
    }

    return false;    // Si no se convierte en seguro con una sola eliminacion se asume que es inseguro
}

function procesarInformes(rutaArchivo) {          // funcion que lee el archivo txt y procesa los informes
    try {

        const contenido = fs.readFileSync(rutaArchivo, 'utf-8');

        const lineas = contenido.split('\n').filter(linea => linea.trim() !== '');       // divide el contenido por lineas

        let seguros = 0;
        let inseguros = 0;

        const resultados = lineas.map((linea, index) => {      // procesa todas las lineas libres que hay en el txt

            const niveles = linea.split(' ').map(valor => {               // convierte los valores de la linea a numeros y verifica si son validos
                const numero = Number(valor);
                if (isNaN(numero)) {
                    console.log(`Valor no numérico encontrado en el informe ${index + 1}: ${valor}`);
                }
                return numero;
            });

            const seguro = niveles.every(numero => !isNaN(numero)) && esSeguroSiOSi(niveles);    // si algun valor no es numerico, lo va a marcar como inseguro
            if (seguro) {
                seguros++;
            } else {
                inseguros++;
            }
            return `Informe ${index + 1}: ${seguro ? 'Seguro' : 'Inseguro'}`;
        });

        resultados.forEach(resultado => console.log(resultado));                // muestra todo en la consola

        console.log(`\nTotal de informes seguros: ${seguros}`);                 // esto muestra cuales son seguros y cuales
        console.log(`Total de informes inseguros: ${inseguros}`);
    } catch (error) {
        console.error('Error al leer o procesar el archivo:', error);
    }
}

const rutaArchivo = __dirname + '/numeros.txt';

procesarInformes(rutaArchivo);

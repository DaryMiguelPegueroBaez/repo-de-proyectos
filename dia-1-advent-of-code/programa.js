const fs = require("fs");

function calcularDistanciaTotal(listaIzquierda, listaDerecha) {

    listaIzquierda.sort((a, b) => a - b);    // Ordena las dos listas de menor a mayor
    listaDerecha.sort((a, b) => a - b);

    let distanciaTotal = 0;  // Calcula las distancias y suma los resultados de la distancia 

    for (let i = 0; i < Math.min(listaIzquierda.length, listaDerecha.length); i++) {
        const distancia = Math.abs(listaIzquierda[i] - listaDerecha[i]);
        distanciaTotal += distancia;
    }

    return distanciaTotal;
}

function calcularPuntajeSimilitud(listaIzquierda, listaDerecha) {
    
    const mapaDerecha = new Map();   // Crea un mapa para contar las ocurrencias en la lista derecha

    for (const num of listaDerecha) {
        mapaDerecha.set(num, (mapaDerecha.get(num) || 0) + 1);
    }

    let puntajeSimilitud = 0;    // Calcula el puntaje de similitud entre las columnas

    for (const num of listaIzquierda) {
        const ocurrencias = mapaDerecha.get(num) || 0;
        puntajeSimilitud += num * ocurrencias;
    }

    return puntajeSimilitud;
}

function leerArchivoYCalcularDistancia(rutaArchivo) {
    try {

        const data = fs.readFileSync(rutaArchivo, { encoding: "utf-8" });   // lector del archivo de texto
        
        const lineas = data.split("\n").filter(linea => linea.trim() !== "");   // Divide el contenido en líneas no vacías

        
        const listaIzquierda = [];
        const listaDerecha = [];

        for (const linea of lineas) {
            const [num1, num2] = linea.split(/\s+/).map(Number);  // Separa las columnas en dos listas pero de menor a mayor
            if (!isNaN(num1) && !isNaN(num2)) {
                listaIzquierda.push(num1);
                listaDerecha.push(num2);
            }
        }
        
        const distanciaTotal = calcularDistanciaTotal(listaIzquierda, listaDerecha);  // Calcula la distancia total entre columnas
        console.log("La distancia total es:", distanciaTotal);

        const puntajeSimilitud = calcularPuntajeSimilitud(listaIzquierda, listaDerecha);   // Calcula el puntaje de similitud entre columnas
        console.log("El puntaje de similitud es:", puntajeSimilitud);

    } catch (error) {
        console.error("Error al leer el archivo:", error.message);
    }
}

const rutaArchivo = __dirname + "/numeros.txt";

leerArchivoYCalcularDistancia(rutaArchivo);


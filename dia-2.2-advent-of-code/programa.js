const fs = require('fs');    // requerimiento del node.js para que el codigo funcione

function countValidPassword(filepath) {      // funcion que lee el archivo y procesa el archivo .txt

    const data = fs.readFileSync(filepath, 'utf-8');  // lector del archivo .txt
    
    const lines= data.split('\n').filter(line => line.trim() !== '')      // separa las lineas que tiene le archivo

    let validPaswordCount = 0;

lines.forEach(line => {   // procesa el codigo 

        const [policy, letterWithColon, password] = line.split(' ');     // divide la linea en partes 
        const [pos1, pos2] = policy.split('-').map(Number);
        const letter = letterWithColon[0];


        const firstPositionMatch = password[pos1 - 1] === letter;    // verifica las posiciones de la contraseña y convierte su indice a 0
        const secondPositionMatch = password[pos2 - 1] === letter;

        if (firstPositionMatch !== secondPositionMatch) {      // exactamente una de las posiciones debe contener la letra
            validPaswordCount++;
        }
    });
        return validPaswordCount;    // retorna la cantidad de contraseñas validas
}

const filepath = __dirname + '/codigo.txt';  // ruta del archivo a leer 


try {
    const result = countValidPassword(filepath);
    console.log(`numero de contraseñas validas ${result}`);
} catch (error) {
    console.error('error al leer o procesar el archivo', error)
};
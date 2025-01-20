import * as fs from 'fs';

function encontrarXmas(sopa: string[][]): number {
    const n = sopa.length;
    const m = sopa[0].length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i + 2 < n && j + 2 < m) {
                if (
                    sopa[i][j] === 'M' && sopa[i + 1][j + 1] === 'A' && sopa[i + 2][j + 2] === 'S' &&
                    sopa[i + 2][j] === 'S' && sopa[i + 1][j - 1] === 'A' && sopa[i][j - 2] === 'M'
                ) {
                    count++;
                }
            }
            if (i + 2 < n && j - 2 >= 0) {
                if (
                    sopa[i][j] === 'M' && sopa[i + 1][j - 1] === 'A' && sopa[i + 2][j - 2] === 'S' &&
                    sopa[i + 2][j] === 'S' && sopa[i + 1][j + 1] === 'A' && sopa[i][j + 2] === 'M'
                ) {
                    count++;
                }
            }
        }
    }

    return count;
}

fs.readFile('codigo.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    
    const sopa: string[][] = data.trim().split('\n').map(line => line.split(''));
    console.log('Número de X-MAS encontrados:', encontrarXmas(sopa));
});

const fs = require('fs');
const path = require('path');

function scanAndMultiply(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');

        if (!data.trim()) {
            throw new Error('El archivo está vacío o no contiene datos válidos.');
        }

        const instructions = [...data.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)];

        let totalSum = 0;
        let enabledMul = true;

        for (const instruction of instructions) {
            const cmd = instruction[0];

            if (cmd === 'do()') {
                enabledMul = true;
            } else if (cmd === "don't()") {
                enabledMul = false;
            } else if (cmd.startsWith('mul(')) {
                const match = /mul\((\d+),(\d+)\)/.exec(cmd);
                if (match && enabledMul) {
                    const num1 = parseInt(match[1], 10);
                    const num2 = parseInt(match[2], 10);
                    totalSum += num1 * num2;
                }
            }
        }

        return totalSum;

    } catch (error) {
        console.error('Error al procesar el archivo:', error.message);
        return 0;
    }
}

const filePath = path.join(__dirname, 'codigo.txt');

try {
    const result = scanAndMultiply(filePath);
    console.log(`Suma total de multiplicaciones habilitadas: ${result}`);
} catch (error) {
    console.error('Error general:', error.message);
}

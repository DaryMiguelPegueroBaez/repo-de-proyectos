const fs = require('fs');

function parseInput(rulesData, updatesData) {
    let rules = [];
    let updates = [];

    rulesData.forEach(line => {
        const [x, y] = line.split('|').map(val => parseInt(val, 10));
        if (!isNaN(x) && !isNaN(y)) {
            rules.push([x, y]);
        }
    });

    updatesData.forEach(line => {
        const update = line.split(',').map(val => parseInt(val, 10));
        if (update.every(val => !isNaN(val))) {
            updates.push(update);
        }
    });

    return { rules, updates };
}

function checkOrder(rules, update) {
    const indexMap = new Map();
    update.forEach((value, idx) => {
        indexMap.set(value, idx);
    });

    for (let [x, y] of rules) {
        if (indexMap.has(x) && indexMap.has(y)) {
            if (indexMap.get(x) > indexMap.get(y)) {
                return false;
            }
        }
    }
    return true;
}

function reorderUpdate(rules, update) {
    const comparator = (a, b) => {
        for (let [x, y] of rules) {
            if (a === x && b === y) return -1;
            if (a === y && b === x) return 1;
        }
        return 0;
    };
    return update.slice().sort(comparator);
}

function getMiddleNumber(update) {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

function calculateSumOfMiddleNumbers(rulesFilePath, updatesFilePath) {
    fs.readFile(rulesFilePath, 'utf8', (err, rulesData) => {
        if (err) {
            console.error('Error reading rules file:', err);
            return;
        }

        fs.readFile(updatesFilePath, 'utf8', (err, updatesData) => {
            if (err) {
                console.error('Error reading updates file:', err);
                return;
            }

            const { rules, updates } = parseInput(rulesData.split('\n'), updatesData.split('\n'));

            const incorrectlyOrderedUpdates = updates.filter(update => !checkOrder(rules, update));

            if (incorrectlyOrderedUpdates.length === 0) {
                console.log("No incorrectly ordered updates.");
                return;
            }

            const reorderedUpdates = incorrectlyOrderedUpdates.map(update => reorderUpdate(rules, update));

            const middleNumbers = reorderedUpdates.map(update => getMiddleNumber(update));
            const sum = middleNumbers.reduce((acc, num) => acc + num, 0);

            console.log("Final result:", sum);
        });
    });
}

const rulesFilePath = 'rules.txt';
const updatesFilePath = 'updates.txt';

calculateSumOfMiddleNumbers(rulesFilePath, updatesFilePath);

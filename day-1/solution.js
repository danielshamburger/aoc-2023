const fs = require('node:fs');

const INPUT_PATH = 'input.txt';
// const INPUT_PATH = 'part-2-test-input.txt';

const wordsToNumbers = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};

// only works if every line contains at least one number
const partOne = (input) => { 
    const calibrationValues = input.map((line) => {
        const numbers = line.split('').filter((char) => !Number.isNaN(Number(char)));
        return numbers[0] + numbers[numbers.length - 1];
    });

    return calibrationValues.reduce((acc, curr) => acc + Number(curr), 0);
};

const getNumbersFromString = (input) => {
    const matchString = `(?=(${Object.keys(wordsToNumbers).concat(Object.values(wordsToNumbers)).join('|')}))`;
    const regExp = new RegExp(matchString, 'g');

    const matches = input.matchAll(regExp);
    const values = [];

    for(const match of matches) {
        // reg exp is matching empty strings and I ran out of time fiddling with,
        // so just grabbing the second match, which is the one we care about
        const value = match[1];

        if (Number.isNaN(Number(value))) {
            values.push(wordsToNumbers[value]);
        } else {
            values.push(value);
        }
    }

    return values;
};

const partTwo = (input) => {
    const calibrationValues = [];
    input.forEach((line) => {
        const valuesInLine = getNumbersFromString(line);

        calibrationValues.push(valuesInLine[0] + valuesInLine[valuesInLine.length - 1]);
    });

    return calibrationValues.reduce((acc, curr) => acc + Number(curr), 0);
};

const input = fs.readFileSync(INPUT_PATH, 'utf8').split('\n');

console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
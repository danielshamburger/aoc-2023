const fs = require('node:fs');

// const INPUT_PATH = 'input.txt';
const INPUT_PATH = 'part-2-test-input.txt';

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

const numberStrings = [
    '1', 
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
];

// only works if every line contains at least one number
const partOne = (input) => { 
    const calibrationValues = input.map((line) => {
        const numbers = line.split('').filter((char) => !Number.isNaN(Number(char)));
        return numbers[0] + numbers[numbers.length - 1];
    });

    return calibrationValues.reduce((acc, curr) => acc + Number(curr), 0);
};

const replaceSpelledOutNumbers = (input) => {
    const regex = new RegExp(Object.keys(wordsToNumbers).concat(numberStrings).join('|'), 'g');

    console.log('regex', regex);
    const numericValues = [];
    const matches = input.matchAll(`/(?=(${Object.keys(wordsToNumbers).concat(numberStrings).join('|')})/g`);

    for(const match of matches) {
        console.log('match', match);
    }

    return numericValues;
};

const partTwo = (input) => {
    const calibrationValues = [];
    input.forEach((line) => {
        console.log(line);
        // let replaced = line;

        // const validNumberStrings = Object.keys(wordsToNumbers);
        // validNumberStrings.forEach((number) => {
        //     // keep the original number
        //     replaced = replaced.replaceAll(number, wordsToNumbers[number] + number);
        // });
        const replaced = replaceSpelledOutNumbers(line);
        console.log('replaced: ', replaced);

        // const numbers = replaced.split('').filter((char) => !Number.isNaN(Number(char)));
        // console.log('numbers: ', numbers);
        // console.log('first: ', numbers[0]);
        // console.log('last: ', numbers[numbers.length - 1]);
        // console.log('pushing', numbers[0] + numbers[numbers.length - 1]);
        console.log("===========");
        // calibrationValues.push(numbers[0] + numbers[numbers.length - 1]);
    });

    return calibrationValues.reduce((acc, curr) => acc + Number(curr), 0);
};

const input = fs.readFileSync(INPUT_PATH, 'utf8').split('\n');

console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
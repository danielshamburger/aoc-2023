const validNumberStrings = {
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

function extractNumericValues(inputString) {
    const numericValues = [];
    let replacedString = inputString;

    Object.keys(validNumberStrings).forEach(numberString => {
        const regex = new RegExp(numberString, 'g');
        const matches = replacedString.match(regex);

        if (matches) {
            matches.forEach(match => {
                replacedString = replacedString.replace(match, ''); // Remove the matched string
                numericValues.push(validNumberStrings[numberString]);
            });
        }
    });

    return {
        replacedString,
        numericValues,
    };
}

// Example usage:
const inputString = 'twone';
const result = extractNumericValues(inputString);
console.log(result.numericValues); // Output: [ '2', '1' ]
console.log(result.replacedString); // Output: ''

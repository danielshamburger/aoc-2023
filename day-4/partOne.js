const fs = require("node:fs");

const INPUT_PATH = "i.txt";

/**
 * Get the numbers in a line as an array
 * @param {string} line 
 * @returns {array}
 */
const getNumbersFromLine = (line) => {
    return line
        .split(" ")
        .filter((n) => !isNaN(n) && n.length > 0)
        .map((n) => parseInt(n));
};

/**
 * Solve part 1
 * @param {array} input - lines of input
 */
const solution = (input) => {
    let points = 0;

    input.forEach((line) => {
        let lineScore = 0;

        const [card, cardNumbers] = line.split(":");
        const [winningLine, yourLine] = cardNumbers.split("|");

        const winningNumbers = getNumbersFromLine(winningLine);
        const yourNumbers = getNumbersFromLine(yourLine);

        yourNumbers.forEach((number) => {
            if (winningNumbers.includes(number)) {
                lineScore = lineScore > 0 ? lineScore * 2 : 1;
            }
        });

        points += lineScore;
    });

    return points;
};

const inputLines = fs.readFileSync(INPUT_PATH, "utf8").split("\n");

console.log(solution(inputLines));
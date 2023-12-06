const fs = require("node:fs");

const INPUT_PATH = "i.txt";

const inputLines = fs.readFileSync(INPUT_PATH, "utf8").split("\n");

/**
 * Get the numbers in a line as an array
 * @param {string} line 
 * @returns {array} array of numbers contained by the line
 */
const getNumbersFromLine = (line) => {
    return line
        .split(" ")
        .filter((n) => !isNaN(n) && n.length > 0)
        .map((n) => parseInt(n));
};

/**
 * Parse lines of input into card objects
 * @param {array} input - lines of input
 * @returns {object[]} array of card objects
 */
const initializeCards = (input) => {
    const cards = [];

    input.forEach((line) => {
        const [cardLabel, cardNumbers] = line.split(":");
        const cardInfo = cardLabel.split(" ");
        const cardNumber = parseInt(cardInfo[cardInfo.length - 1]);
        const [winningLine, yourLine] = cardNumbers.split("|");
        const winningNumbers = getNumbersFromLine(winningLine);
        const yourNumbers = getNumbersFromLine(yourLine);

        cards.push({
            cardNumber,
            winningNumbers,
            yourNumbers,
        });
    });

    return cards;
};

/**
 * Calculate the score for an array of cards
 * @param {object[]} cards 
 */
const scoreCards = (cards) => {
    const cardCopies = [];

    cards.forEach((card) => {
        let cardScore = 0;

        card.yourNumbers.forEach((number) => {
            if (card.winningNumbers.includes(number)) {
                cardScore++;
            }
        });

        const instances = cardCopies[card.cardNumber] || 1;

        cardCopies[card.cardNumber] = {
            instances,
            cardScore,
        };

        if (cardScore > 0) {
            for (i = 1; i <= cardScore; i++) {
                const cardNumber = card.cardNumber + i;
                const newIstances = cardCopies[cardNumber] || 1;
                cardCopies[cardNumber] = newIstances + instances;
            }
        }
    });

    return cardCopies.reduce((sum, card) => sum + Number(card?.instances), 0);


};

/**
 * Solve part 2
 * @param {array} input - lines of input
 */
const solution = (input) => {
    const cards = initializeCards(input);
    return scoreCards(cards);
};

console.log(solution(inputLines));
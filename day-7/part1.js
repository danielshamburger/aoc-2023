const fs = require("node:fs");

const INPUT_PATH = "i.txt";

const CARD_STRENGTHS = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
};

const HAND_SIZE = 5;

const getHandStrength = (hand) => {
    const kinds = {};
    for (const card of hand) {
        kinds[card] = kinds[card] ? kinds[card] + 1 : 1;
    }

    const kindCounts = Object.values(kinds);
    
    // since there are 7 types, just calling the strength of the 
    // highest 7 and decrementing from there
    if (kindCounts.filter((kind) => kind === 5).length === 1) {
        // five of a kind
        return 7;
    } else if (kindCounts.filter((kind) => kind === 4).length === 1) {
        // four of a kind
        return 6;
    } else if (
        kindCounts.filter((kind) => kind === 3).length === 1 &&
        kindCounts.filter((kind) => kind === 2).length === 1
    ) {
        // full house
        return 5;
    } else if (
        kindCounts.filter((kind) => kind === 3).length === 1 &&
        kindCounts.filter((kind) => kind === 2).length === 0
    ) {
        // three of a kind
        return 4;
    } else if (
        kindCounts.filter((kind) => kind === 2).length === 2
    ) {
        // two pair
        return 3;
    } else if (
        kindCounts.filter((kind) => kind === 2).length === 1
    ) {
        // one pair
        return 2;
    }

    // high card
    return 1;
};

const solution = (input) => {
    const hands = input.split("\n");
    const scoredHands = hands.map((hand) => {
        const [cards, bid] = hand.split(" ");
        const handStrength = getHandStrength(cards);

        return {
            cards,
            bid: parseInt(bid),
            handStrength,
        }
    });

    scoredHands.sort((a, b) => {
        if (a.handStrength !== b.handStrength) {
            // if strengths are different, sort by strength
            return a.handStrength - b.handStrength;
        }

        // if strengths are the same, sort by card strength
        // starting from the left and moving right until they're not equal
        for (let i = 0; i <= HAND_SIZE; i++) {
            const cardA = a.cards[i];
            const cardB = b.cards[i];
            if (a.cards === "KK677" || b.cards === "KK677") {
                console.log('comparing', a.cards, b.cards);
            }
            if (CARD_STRENGTHS[cardB] !== CARD_STRENGTHS[cardA]) {
                return CARD_STRENGTHS[cardA] - CARD_STRENGTHS[cardB];
            }
        }
    });

    const winnings = [];

    for (let rank = 1; rank <= scoredHands.length; rank++) {
        // subtract 1 from rank to get the index of the hand
        const hand = scoredHands[rank - 1];
        winnings.push(hand.bid * rank);
    }

    console.log('winnings', winnings)

    // return total winnings
    return winnings.reduce((total, current) => total + current, 0);
};

const input = fs.readFileSync(INPUT_PATH, "utf8");

console.log(solution(input));
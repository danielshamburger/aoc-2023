const fs = require("node:fs");

const INPUT_PATH = "i.txt";

/**
 * Get the number value from a string.
 * "Time:  7  15  30" --> 71530
 * @param {string} row 
 * @returns {number}
 */
const getValueFromRow = (row) => {
    return parseInt(
        row
            .split(":")
            .pop()
            .split(" ")
            .filter((n) => !isNaN(n) && n.length > 0)
            .reduce((sum, current) => sum + current, 0)
    );
};

const solution = (input) => {
    const [times, distances] = input.split("\n");
    const raceTime = getValueFromRow(times);
    const raceDistance = getValueFromRow(distances);
    const waysToWin = [];

    const validHoldTimes = [];

    // not the most efficient algorithm but it does the trick and thankfully the inputs are small enough 😅
    for(let holdTime = 1; holdTime < raceTime; holdTime++) {
        const distanceTraveled = holdTime * (raceTime - holdTime);
        // according to the sample input descriptions, traveling >= the distance does not count, must be >
        if (distanceTraveled > raceDistance) {
            validHoldTimes.push(holdTime);
        }
    }
    waysToWin.push(validHoldTimes.length);

    // return product of ways to win
    return waysToWin.reduce((product, current) => product * current, 1);
};


const input = fs.readFileSync(INPUT_PATH, "utf8");

console.log(solution(input));
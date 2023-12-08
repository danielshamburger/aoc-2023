const fs = require("node:fs");

const INPUT_PATH = "i.txt";

/**
 * Get an array of number values from a string.
 * "Time:  7  15  30" --> [7, 15, 30]
 * @param {string} row 
 * @returns {number[]}
 */
const getValuesFromRow = (row) => {
    return row
        .split(":")
        .pop()
        .split(" ")
        .filter((n) => !isNaN(n) && n.length > 0)
        .map((n) => parseInt(n));
};

const solution = (input) => {
    const [times, distances] = input.split("\n");
    const timeValues = getValuesFromRow(times);
    const distanceValues = getValuesFromRow(distances);
    const waysToWin = [];

    for(let raceIndex = 0; raceIndex < timeValues.length; raceIndex++) {
        const raceTime = timeValues[raceIndex];
        const raceDistance = distanceValues[raceIndex];

        const validHoldTimes = [];

        for(let holdTime = 1; holdTime < raceTime; holdTime++) {
            const distanceTraveled = holdTime * (raceTime - holdTime);
            // according to the sample input descriptions, traveling >= the distance does not count, must be >
            if (distanceTraveled > raceDistance) {
                validHoldTimes.push(holdTime);
            }
        }
        waysToWin.push(validHoldTimes.length);
    }

    // return product of ways to win
    return waysToWin.reduce((product, current) => product * current, 1);
};


const input = fs.readFileSync(INPUT_PATH, "utf8");

console.log(solution(input));
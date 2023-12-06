const fs = require("node:fs");

const INPUT_PATH = "i.txt";

const solution = (input) => {
    const sections = input.split("\n\n");

    // get the seeds, then the rest of the sections contain the maps
    const seedLine = sections.shift().split(":");
    const seeds = seedLine[1]
        .split(" ")
        .filter((n) => !isNaN(n) && n.length > 0)
        .map((n) => parseInt(n));

    const mappings = sections.map((section) => {
        // first item is the label, the rest are the mappings
        const transitionMap = section.split("\n");
        const mappingLabel = transitionMap.shift().split(" ").shift();
        return transitionMap.map((row) => {
            const rowMap = row
                .split(" ")
                .map((n) => parseInt(n));

            // mappings should always be length 3
            const destinationStart = rowMap.shift();
            const sourceStart = rowMap.shift();
            const range = rowMap.shift();

            const map = destinationStart - sourceStart;
            return {
                sourceStart,
                map,
                range
            }
        });
    });

    const locations = seeds.map((seed) => {
        let value = seed;
        mappings.forEach((mapping) => {
            const applyMapping = mapping
                .find((map) => (
                    value >= map.sourceStart
                    && value <= map.sourceStart + map.range
                ));
            if(applyMapping) {
                value = value + applyMapping.map;
            }
        });
        return value;
    });
    
    // return lowest location
    return Math.min(...locations);
};

const input = fs.readFileSync(INPUT_PATH, "utf8");

console.log(solution(input));
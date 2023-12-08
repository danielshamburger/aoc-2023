const fs = require("node:fs");

const INPUT_PATH = "i.txt";

const solution = (input) => {
    const sections = input.split("\n\n");

    // get the seeds, then the rest of the sections contain the maps
    const seedLine = sections.shift().split(":");

    const seeds = [];
    seedLine[1]
        .split(" ")
        .filter((n) => !isNaN(n) && n.length > 0)
        .forEach((n, index) => {
            if (index % 2 === 0) {
                seeds.push({
                    startValue: parseInt(n)
                });
            } else {
                seeds[seeds.length - 1].endValue = seeds[seeds.length - 1].startValue + parseInt(n);
                // seeds[seeds.length - 1].range = parseInt(n);
            }
        });

    // console.log('seeds', seeds);

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
            const sourceMin = rowMap.shift();
            const range = rowMap.shift();

            const map = destinationStart - sourceMin;
            return {
                sourceMin,
                sourceMax: sourceMin + range,
                map,
                // range
            }
        });
    });

    // console.log('mappings', mappings);

    // for(let i = mappings.length - 1; i >= 0; i--) {
    //     const mappingStage = mappings[i];
    //     console.log('considering mapping stage', mappingStage);

    //     const lowestMapping = mappingStage.reduce((min, current) => {
    //         return current.map + current.sourceMin < min.map + min.sourceMin ? current : min;
    //     }, mappingStage[0]);

    //     console.log('lowestMapping', lowestMapping);
    //     console.log("--------");
    // }

    // const lowestMappings = [];
    // // get lowest combined start value + mapping
    // mappings.forEach((mappingStage) => {
    //     const lowestMapping = mappingStage.reduce((min, current) => {
    //         return current.map + current.startValue < min.map + min.startValue ? current : min;
    //     }, mappingStage[0]);
    //     lowestMappings.push(lowestMapping);
    // });

    // const sortedMappings = mappings.map((mappingStage) => {
    //     return mappingStage.sort((a, b) => {
    //         return a.map + a.startValue - (b.map + b.startValue);
    //     });
    // });

    // console.log('sortedMappings', sortedMappings);

    const allSeeds = [];

    seeds.forEach((seed) => {
        for(let value = seed.startValue; value <= seed.endValue; value++) {
            allSeeds.push(value);
        }
    });

    // console.log('allSeeds', allSeeds);

    // const locations = seeds.map((seed) => {
    //     let startValue = seed.startValue;

        
    // });

    const locations = allSeeds.map((seed) => {
        let value = seed;
        mappings.forEach((mapping) => {
            const applyMapping = mapping
                .find((map) => (
                    value >= map.sourceMin
                    && value <= map.sourceMax
                ));
            if(applyMapping) {
                value = value + applyMapping.map;
            }
        });
        return value;
    });

    // console.log('locations', locations);
    
    // return lowest location
    return Math.min(...locations);
};

const input = fs.readFileSync(INPUT_PATH, "utf8");

console.log(solution(input));
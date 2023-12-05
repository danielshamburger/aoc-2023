/*
 * This is a bit of a dumpster fire. Probably should use some better data structures and unit testing on upcoming days.
*/

const fs = require("node:fs");

const INPUT_PATH = "i.txt";
const GEAR = "*";

// for a given row contents and column index, return the full part number
const getPartNumberIndices = (fullRow, row, col) => {
    let partNumber = fullRow[col];

    let partNumberindices = [{row, index: col}];
    
    // check left
    for (let i = col - 1; i >= 0; i--) {
        if (Number.isNaN(Number(fullRow[i]))) {
            break;
        }
        partNumber = fullRow[i] + partNumber;
        partNumberindices.unshift({row, index: i});
    }

    // check right
    for (let i = col + 1; i < fullRow.length; i++) {
        if (Number.isNaN(Number(fullRow[i]))) {
            break;
        }
        partNumber = partNumber + fullRow[i];
        partNumberindices.push({row, index: i});
    }

    if(row === 138) {
        console.log('partNumber', partNumber);
    }

    return {
        partNumber,
        indices: partNumberindices
    };
};

const partNumberIndicesAreEqual = (arr1, arr2) => arr1.every((value, i) => value.row === arr2[i]?.row && value.index === arr2[i]?.index)

const duplicatePartNumber = (partNumber, adjacentParts) => {
    console.log('checking if', partNumber);
    console.log('is in', adjacentParts);
    return adjacentParts.some((part) => partNumberIndicesAreEqual(part.indices, partNumber.indices));
};

const solve = (input) => {
  let gearRatioProducts = 0;

  // loop over rows
  for (let row = 0; row < input.length; row++) {
    console.log('============= row =============', row + 1);

    // loop over columns
    for (let col = 0; col < input[row].length + 1; col++) {
        const current = input[row][col];

        if (current === GEAR) {
            // for each gear, check for adjacent part numbers
            const adjacentParts = [];

            // if not first row, check top
            if(row > 0) {
                const adjacent = input[row-1][col];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row-1], row-1, col);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not last row, check bottom
            if(row < input.length - 1) {
                const adjacent = input[row+1][col];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row+1], row+1, col);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not first column, check left
            if (col > 0) {
                const adjacent = input[row][col-1];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row], row, col-1);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not last column, check right
            if (col < input[row].length - 1) {
                const adjacent = input[row][col+1];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row], row, col+1);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not first row and not first column, check top left
            if (row > 0 && col > 0) {
                const adjacent = input[row-1][col-1];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row-1], row-1, col-1);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not first row and not last column, check top right
            if (row > 0 && col < input[row].length - 1) {
                const adjacent = input[row-1][col+1];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row-1], row-1, col+1);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not last row and not first column, check bottom left
            if (row < input.length - 1 && col > 0) {
                const adjacent = input[row+1][col-1];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row+1], row+1, col-1);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }

            // if not last row and not last column, check bottom right
            if (row < input.length - 1 && col < input[row].length - 1) {
                const adjacent = input[row+1][col+1];
                if (!Number.isNaN(Number(adjacent))) {
                    // console.log('adjacent number', adjacent);
                    const partNumber = getPartNumberIndices(input[row+1], row+1, col+1);
                    if (!duplicatePartNumber(partNumber, adjacentParts)) {
                        // console.log('pushing', partNumber.partNumber);
                        adjacentParts.push(partNumber);
                    }
                }
            }


            for (adjacentPart of adjacentParts) {
                console.log('adjacentPart', adjacentPart.partNumber);
            }
            if (adjacentParts.length === 2) {
                gearRatioProducts += Number(adjacentParts[0].partNumber) * Number(adjacentParts[1].partNumber);
            }

            console.log('adjacentParts', adjacentParts);
        }
    }
  }

  return gearRatioProducts;
};

const inputLines = fs.readFileSync(INPUT_PATH, "utf8").split("\n");

console.log(solve(inputLines));

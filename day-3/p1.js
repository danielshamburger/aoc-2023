/*
 * This is a bit of a dumpster fire. Probably should use some better data structures and unit testing on upcoming days.
*/

const fs = require("node:fs");

const INPUT_PATH = "i.txt";

const solve = (input) => {
  let validPartNumbers = [];

  // loop over rows
  for (let row = 0; row < input.length; row++) {
    let partNumberBuffer = [];

    // loop over columns
    for (let col = 0; col < input[row].length + 1; col++) {
      const curr = input[row][col];
      if (!Number.isNaN(Number(curr))) {
        partNumberBuffer.push({ index: col, value: curr});
      } else if (partNumberBuffer.length > 0) {
        let isValidPartNumber = false;

        // for each digit, check all of the surrounding characters
        for(const digit of partNumberBuffer) {
          const surrounding = [];

          // if not first row, check top
          if(row > 0) {
            surrounding.push(
              input[row-1][digit.index], // top
            );
          }

          // if not last row, check bottom
          if(row < input.length - 1) {
            surrounding.push(
              input[row+1][digit.index], // bottom
            );
          }

          // if not first column, check left
          if (digit.index > 0) {
            surrounding.push(
              input[row][digit.index-1], // left
            );
          }

          // if not last column, check right
          if (digit.index < input[row].length - 1) {
            surrounding.push(
              input[row][digit.index+1], // right
            );
          }

          // if not first row and not first column, check top left
          if (row > 0 && digit.index > 0) {
            surrounding.push(
              input[row-1][digit.index-1], // top left
            );
          }

          // if not first row and not last column, check top right
          if (row > 0 && digit.index < input[row].length - 1) {
            surrounding.push(
              input[row-1][digit.index+1], // top right
            );
          }

          // if not last row and not first column, check bottom left
          if (row < input.length - 1 && digit.index > 0) {
            surrounding.push(
              input[row+1][digit.index-1], // bottom left
            );
          }
          
          // if not last row and not last column, check bottom right
          if (row < input.length - 1 && digit.index < input[row].length - 1) {
            surrounding.push(
              input[row+1][digit.index+1], // bottom right
            );
          }

          const foundAdjacentSymbol = surrounding.some((s) => Number.isNaN(Number(s)) && s !== '.');
          if (foundAdjacentSymbol) {
            isValidPartNumber = true;
          }
        }

        if (isValidPartNumber) {
          const validPartNumber = partNumberBuffer.reduce((acc, curr) => {
            return acc + curr.value;
          }, "");
          validPartNumbers.push(validPartNumber);
        }
        partNumberBuffer = [];
        isValidPartNumber = false;
      }
    }
  }

  // return the sum of the valid part numbers
  return validPartNumbers.reduce((acc, curr) => {
    return Number(acc) + Number(curr);
  });
};

const inputLines = fs.readFileSync(INPUT_PATH, "utf8").split("\n");

console.log(solve(inputLines));

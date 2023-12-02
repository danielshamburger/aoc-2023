const fs = require("node:fs");

// const INPUT_PATH = 'test-input.txt';
const INPUT_PATH = "input.txt";

const solve = (input) => {
  // total number of cubes available in each color
  const bagContents = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let possibleGameSum = 0;

  input.forEach((game) => {
    const [gameLabel, gameValue] = game.split(":");
    const [_, gameId] = gameLabel.split(" ");
    const cubeSets = gameValue.split(";");

    // assume game is possible until proven otherwise
    let gamePossible = true;

    cubeSets.forEach((set) => {
      const colorCubes = set.split(",");

      colorCubes.forEach((colorSet) => {
        const [cubeCount, cubeColor] = colorSet.trim().split(" ");

        // if there are more cubes of a color than are available, game is not possible
        if (cubeCount > bagContents[cubeColor]) {
          gamePossible = false;
        }
      });
    });

    if (gamePossible) {
      possibleGameSum += Number(gameId);
    }
  });

  return possibleGameSum;
};

const inputLines = fs.readFileSync(INPUT_PATH, "utf8").split("\n");

console.log(solve(inputLines));

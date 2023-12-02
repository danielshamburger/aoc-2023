const fs = require("node:fs");

// const INPUT_PATH = "test-input.txt";
const INPUT_PATH = 'input.txt';

const solve = (input) => {
  let requiredPowerSum = 0;

  input.forEach((game) => {
    const [gameLabel, gameValue] = game.split(":");
    const [_, gameId] = gameLabel.split(" ");
    const cubeSets = gameValue.split(";");

    const requiredCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    cubeSets.forEach((set) => {
      const colorCubes = set.split(",");

      colorCubes.forEach((colorSet) => {
        const [cubeCount, cubeColor] = colorSet.trim().split(" ");

        if (Number(cubeCount) > requiredCubes[cubeColor]) {
          requiredCubes[cubeColor] = Number(cubeCount);
        }
      });
    });

    const requiredPower = requiredCubes.red * requiredCubes.green * requiredCubes.blue;
    requiredPowerSum += requiredPower;
  });

  return requiredPowerSum;
};

const inputLines = fs.readFileSync(INPUT_PATH, "utf8").split("\n");

console.log(solve(inputLines));

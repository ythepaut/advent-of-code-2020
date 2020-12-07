/**
 * Advent of code 2020 - https://adventofcode.com/2020
 * @author Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
 */


/**
 * Gets input from file
 * 
 * @param {string}         file         Input file
 * 
 * @return {string[]}      Array of string from file lines
 */
function getInputs(file) {
    const fs = require('fs');
    return fs.readFileSync(file, 'utf8').toString().split("\n");
}


/**
 * Gets the number of trees in the forest for the given steps
 * 
 * @param {string[]}        inputs      Tree locations
 * @param {number}          stepX       X step
 * @param {number}          stepY       Y step
 * 
 * @return {number}         Number of trees encountered
 */
function getTreeCount(inputs, stepX, stepY) {

    // Input size
    const w = inputs[0].length,
          h = inputs.length;
    
    // Current position
    let x = 0,
        y = 0;
    
    let treeCount = 0;
    while (y < h) {
        if (inputs[y][x % w] == '#')
            treeCount++;
        x += stepX;
        y += stepY;
    }

    return treeCount;
}


function main() {

    // Getting inputs
    let inputs = getInputs("./input.txt");
    
    const steps = [[1,1], [3,1], [5,1], [7,1], [1,2]];

    part2Result = 1;
    for (let i in steps) {
        const treeCount = getTreeCount(inputs, steps[i][0], steps[i][1]);
        part2Result *= treeCount;
        console.log("Tree count with step = " + steps[i] + " is : " + treeCount);
    }

    console.log("Part 2 result = " + part2Result);
}


main();

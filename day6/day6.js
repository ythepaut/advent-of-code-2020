/**
 * Advent of code 2020 - https://adventofcode.com/2020
 * @author Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
 */


/**
 * Gets input from file
 * 
 * @param {string}          file            Input file
 * 
 * @return {string[]}       Array of string from file lines
 */
function getInputs(file) {
    const fs = require('fs');
    return fs.readFileSync(file, 'utf8').toString();
}


/**
 * Part 1 : Get the number of yes answers for each group
 * 
 * @param {string}          input           Input file
 * 
 * @return {number}         Sum of yes answers
 */
function yesAnswerCount(input) {

    const groups = input.split("\n\n");
    
    let yesCount = 0;
    for (let group of groups)
        yesCount += new Set(group.replace(/[^a-z]/g, "")).size; // Gets unique answers and return its size
    
    return yesCount;
}


/**
 * Part 2 : Get the number of yes answers in common in each group
 * 
 * @param {string}          input           Input file
 * 
 * @return {number}         Sum of answers from all groups where each person from
 *                          a group answered yes to the same question
 */
function commonYesAnswerCount(input) {

    const groups = input.split("\n\n");

    let commonYesCount = 0;
    for (let group of groups) {

        const responses = group.split("\n");
        
        const yesAnswers = new Set(group.replace(/[^a-z]/g, ""));
        const commonAnswers = Array.from(yesAnswers).filter((p) => 
            responses.every((r) => r.includes(p)) // Check that all members of group answered yes to the question
        );

        commonYesCount += commonAnswers.length;
    }

    return commonYesCount;
}


function main() {
    const input = getInputs("./inputs.txt");
    console.log("Part 1 : Yes count = " + yesAnswerCount(input));
    console.log("Part 2 : Common yes count = " + commonYesAnswerCount(input));
}


main();

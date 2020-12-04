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
function getInputs(file, callback) {
    const fs = require('fs');
    return fs.readFileSync(file, 'utf8').toString();
}


/**
 * Formats the passports from input.
 * 
 * @param {string}          inputs      Array of string (inputs)
 * 
 * @return {Object[]}       JSON Object (passport) array  
 */
function getPassports(inputs) {
    
    let passports = [];

    rawPassports = inputs.split("\n\n");
    for (let i in rawPassports) {
        
        passports[i] = {};

        rawFields = rawPassports[i].split(/[ \n]/);
        for (let j in rawFields) {
            let field = rawFields[j].split(":")[0];
            let value = rawFields[j].split(":")[1];
            passports[i][field] = value;
        }
    }

    return passports;
}


/**
 * Checks if passport is valid (Part 1)
 * 
 * @param {Object}          passport    Passport to check
 * 
 * @return {boolean}        True if passport is valid, else if not.
 */
function isValidPassport1(passport) {
    return  passport.ecl != undefined &&
            passport.pid != undefined &&
            passport.eyr != undefined &&
            passport.hcl != undefined &&
            passport.byr != undefined &&
            passport.iyr != undefined &&
            passport.hgt != undefined;
}


/**
 * Returns true if year is valid and in bound.
 * 
 * @param {string}          value       Field value 
 * @param {number}          min         Minimum 
 * @param {number}          max         Maximum
 * 
 * @return {boolean}        True if valid, false if not.
 */
function isValidYear(value, min, max) {
    return value.match(/[0-9]{4}/) && value >= min && value <= max;
}


/**
 * Returns true if height is valid.
 * 
 * @param {string}          value       Field value
 * 
 * @return {boolean}        True if valid, false if not.
 */
function isValidHeight(value) {
    const match = value.match(/([0-9]+)(in|cm)/);
    return match != null && (match[2] == "cm" && match[1] >= 150 && match[1] <= 193 ||
                             match[2] == "in" && match[1] >= 59 && match[1] <= 76);
}


/**
 * Checks if passport is valid (Part 2)
 * 
 * @param {Object}          passport    Passport to check
 * 
 * @return {boolean}        True if passport is valid, false if not.
 */
function isValidPassport2(passport) {
    return isValidPassport1(passport) &&
            isValidYear(passport.byr, 1920, 2002) &&
            isValidYear(passport.iyr, 2010, 2020) &&
            isValidYear(passport.eyr, 2020, 2030) &&
            isValidHeight(passport.hgt) &&
            passport.hcl.match(/#[0-9a-f]{6}/) &&
            passport.ecl.match(/(amb|blu|brn|gry|grn|hzl|oth)/) &&
            passport.pid.match(/[0-9]{9}/);
}


function main() {

    const passports = getPassports(getInputs("./inputs.txt"));

    let validCount1 = 0;
    let validCount2 = 0;
    for (i in passports) {
        if (isValidPassport1(passports[i]))
            validCount1++;
        if (isValidPassport2(passports[i]))
            validCount2++;
    }   


    console.log("Part 1 : Valid passport count = " + validCount1);
    console.log("Part 2 : Valid passport count = " + validCount2);
}


main()

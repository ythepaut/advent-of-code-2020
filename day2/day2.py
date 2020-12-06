#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Advent of code 2020 - https://adventofcode.com/2020
Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
"""


def get_inputs(path):
    """Gets inputs from files and return them as a list."""
    f = open(path, "r")
    inputs = f.readlines()
    for i in range(0, len(inputs)):
        inputs[i] = inputs[i][:len(inputs[i])-1]
    f.close()
    return inputs


def get_policy(entry):
    """Gets minimum, maximum, and the letter of the password policy, with the password"""
    minimum = int(entry[:entry.index("-")])
    maximum = int(entry[entry.index("-")+1:entry.index(" ")])
    letter = entry[entry.index(" ")+1:entry.index(":")]
    password = entry[entry.index(":")+2:]
    return minimum, maximum, letter, password


def part1(inputs):
    count = 0
    for i in inputs:
        minimum, maximum, letter, password = get_policy(i)
        if password.count(letter) in range(minimum, maximum+1):
            count += 1
    print("Part 1 result : " + str(count))


def part2(inputs):
    count = 0
    for i in inputs:
        j, k, letter, password = get_policy(i)
        if bool(password[j-1] == letter) != bool(password[k-1] == letter): # xor
            count += 1
    print("Part 2 result : " + str(count))


def main():
    inputs = get_inputs("./input.txt")
    part1(inputs)
    part2(inputs)

if (__name__ == "__main__"):
    main()

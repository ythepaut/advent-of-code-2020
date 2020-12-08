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
        inputs[i] = inputs[i].replace("\n", "")
    f.close()
    return inputs


def find_first_inifinite_loop(instructions, i, executed, acc):
    """Finds the first infinite loop in the instructions
    and returns the accumulator value and the index of instruction causing the loop"""
    if (i == len(instructions)):
        return i, acc
    elif (i in executed):
        return i, acc
    else:
        executed.append(i)
        if (instructions[i].split(" ")[0] == "acc"):
            acc += int(instructions[i].split(" ")[1])
        if (instructions[i].split(" ")[0] == "jmp"):
            i += int(instructions[i].split(" ")[1])
        else:
            i += 1
        return find_first_inifinite_loop(instructions, i, executed, acc)


def swap_nop_jmp(instructions, i):
    """Replace nop by jmp and vice versa"""
    if (instructions[i].split(" ")[0] == "nop"):
        instructions[i] = "jmp " + instructions[i].split(" ")[1]
    elif (instructions[i].split(" ")[0] == "jmp"):
        instructions[i] = "nop " + instructions[i].split(" ")[1]


def fix_instruction(instructions, last_replace):
    """Tries to replace all jmp by nop instructions and vice versa
    to fix the boot program."""
    for i in range(0, len(instructions)):
        if (instructions[i].split(" ")[0] in ["nop", "jmp"]):
            new_instructions = instructions.copy()
            swap_nop_jmp(new_instructions, i)
            if (find_first_inifinite_loop(new_instructions, 0, [], 0)[0] == len(instructions)):
                return find_first_inifinite_loop(new_instructions, 0, [], 0)[1]


def main():
    inputs = get_inputs("./input.txt")
    print("Part 1 : Acc = " + str(find_first_inifinite_loop(inputs, 0, [], 0)[1]))
    print("Part 2 : Acc = " + str(fix_instruction(inputs, 0)))


if (__name__ == "__main__"):
    main()

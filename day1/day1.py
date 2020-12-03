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
        inputs[i] = int(inputs[i][:len(inputs[i])-1])
    f.close()
    return inputs


def main():
    inputs = get_inputs("inputs.txt")
    
    # A better method would be to only compare relevant inputs between them
    # but it requires the inputs to be sorted.
    for input1 in inputs:
        for input2 in inputs:
            for input3 in inputs:
                if (input1 != input2 and input2 != input3 and input1 != input3):
                    if input1+input2+input3 == 2020:
                        print(str(input1) + " + " + str(input2) + " + " + str(input3) + " = 2020")
                        print(str(input1) + " * " + str(input2) + " + " + str(input3) + " = " + str(input1*input2*input3))
                        print("---")
                        return
    # I realised that this method is very ugly.


if (__name__ == "__main__"):
    main()
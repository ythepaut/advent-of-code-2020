<?php
/**
 * Advent of code 2020 - https://adventofcode.com/2020
 * @author Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
 */


/**
 * Gets input from file
 * 
 * @param int           $path           Input file path
 * 
 * @return array        Array of string from file lines
 */
function getInputs(string $path) : array {
    return explode("\n", file_get_contents($path));
}


/**
 * Recursive function to resturn seat number
 * 
 * @param string        $seat           Seat string (binary space partitioning)
 * @param int           $min            Minimum seat row/column
 * @param int           $max            Maximum seat row/column
 * 
 * @return int          Seat coordinate
 */
function getCoordinate(string $seat, int $min, int $max) {
    if (strlen($seat) == 0) {
        return $min;
    } else {
        if ($seat[0] == "B" || $seat[0] == "R") {
            return getCoordinate(substr($seat, 1, strlen($seat)), ($min + $max) / 2 + 1, $max);
        } else {
            return getCoordinate(substr($seat, 1, strlen($seat)), $min, ($min + $max) / 2);
        }
    }
}


/**
 * Get seat position
 * 
 * @param string        $seat           Seat string
 * 
 * @return array        Seat coordinates
 */
function position(string $seat) : array {
    return [
        getCoordinate(substr($seat, 0, 7), 0, 127),
        getCoordinate(substr($seat, 7, 9), 0, 7)
    ];
}


/**
 * Get seat ID
 * 
 * @param string        $coordinates    Seat coordinates
 * 
 * @return int          Seat ID
 */
function getSeatID(array $coordinates) : int {
    return $coordinates[0] * 8 + $coordinates[1];
}


/**
 * Part 1 : Get the highest seat ID from input
 * 
 * @param array         $seats          Input seats
 * 
 * @return int          Highest seat id
 */
function highestSeatID(array $seats) : int {
    $maxID = 0;
    foreach ($seats as $seat)
        if (getSeatID(position($seat)) > $maxID)
            $maxID = getSeatID(position($seat));
    return $maxID;
}


/**
 * Part 2 : Get the the seat that isn't used with seat ID±1 used.
 * 
 * @param array         $seats          Input seats
 * 
 * @return int          My seat id
 */
function getMySeat(array $seats) {

    // Getting all used seats IDs
    $seatIDs = [];
    foreach ($seats as $seat)
        array_push($seatIDs, getSeatID(position($seat)));
    
    // Comparing used seats from plane seats
    $seatDiff = [];
    foreach (range(1, 126) as $row) {
        foreach (range(0, 7) as $column) {
            $inArray = false;
            foreach ($seatIDs as $seatID) {
                if ($seatID == getSeatID([$row, $column])) {
                    $inArray = true;
                }
            }
            if (!$inArray) {
                array_push($seatDiff, getSeatID([$row, $column]));
            }
        }
    }

    // Checking if remaining seats have both ID - 1 and ID + 1 used
    foreach ($seatDiff as $seatID)
        if (in_array($seatID - 1, $seatIDs) && in_array($seatID + 1, $seatIDs))
            return $seatID;

    return 0;
}


function main() {
    $seats = getInputs("./inputs.txt");
    echo("Part 1, max seat ID : " . highestSeatID($seats) . "\n");
    echo("Part 2, my seat ID is : " . getMySeat($seats) . "\n");
}


main();

?>

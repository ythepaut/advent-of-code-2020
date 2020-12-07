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
    return fs.readFileSync(file, 'utf8').toString().split("\n");
}


/**
 * Formats a input to return container / contained bags. (i.e. input rule). 
 * 
 * @param {string}          rule            Rule from inputs
 * 
 * @return {Object}         Processed rule
 */
function formatInput(input) {

    const regexNodeSeparator = /([a-z ]+)( bags contain )([0-9a-z, ]+)\./;
    
    let formattedRule = {};
    formattedRule.container = input.match(regexNodeSeparator)[1];
    const containedNodes = input.match(regexNodeSeparator)[3].split(/, /);

    formattedRule.containing = [];
    if (containedNodes[0] != "no other bags") {
        for (const containedNode of containedNodes) {
            const nodeFields = containedNode.match(/([0-9]+)( )([a-z ]+)( bag[s]?)/);
            formattedRule.containing.push({
                bag : nodeFields[3],
                count : parseInt(nodeFields[1])
            });
        }
    }

    return formattedRule;
}


/**
 * Creates a graph data structure where bags are nodes,
 * and "contain" relations are edges 
 * 
 * @param {string[]}        inputs          Array of string with bag rules
 * 
 * @return {Object}         Graph data structure
 */
function getGraphFromInputs(inputs) {

    let graph = [];

    for (const input of inputs) {

        const rule = formatInput(input);
        
        // Adding containing bag if not in graph
        let found = false;
        for (const node of graph) {
            if (node.bag == rule.container) {
                found = true;
                break;
            }
        }
        if (!found) {
            graph.push({
                bag : rule.container,
                containedBy : []
            });
        }

        // Adding contained bags with container
        for (const contained of rule.containing) {      
            found = false;
            for (const node of graph) {
                if (node.bag == contained.bag) {
                    node.containedBy.push({
                        bag : rule.container,
                        count : contained.count
                    });
                    found = true;
                    break;
                }
            }
            if (!found) {
                graph.push({
                    bag : contained.bag,
                    containedBy : [{
                        bag : rule.container,
                        count : contained.count
                    }]
                });
            }
        }

    }

    return graph;
}


/**
 * Finds a bag in graph (as a node)
 * 
 * @param {Object[]}        graph           Graph from inputs
 * @param {string}          bag             Bag to find
 * 
 * @return {Object|null}    Bag object in graph
 */
function findBag(graph, bag) {
    for (const node of graph)
        if (node.bag === bag)
            return node;
    return null;
}


/**
 * Part 1 : Finds all bags that can contain the a specific bag
 * 
 * @param {Object[]}        graph           Graph from inputs
 * @param {string}          bag             Bag from which we want to find all containers
 * 
 * @return {string[]}       Bag colors
 */
function findAllContainers(graph, bag) {
    
    let bags = [];

    for (const container of findBag(graph, bag).containedBy) {
        bags.push(container.bag);
        for (const containerOfContainer of findAllContainers(graph, container.bag)) {
            bags.push(containerOfContainer);
        }
    }

    // Returns distinct bags
    return bags.filter((value, index, self) => self.indexOf(value) === index);
}


/**
 * Finds all bags contained in a specific bag
 * 
 * @param {Object[]}        graph           Graph from inputs
 * @param {string}          bag             Bag from which we want to get all contained bags
 * 
 * @return {string[]}       Bags contained in a bag
 */
function getContainedBags(graph, bag) {
    let bags = [];
    for (const node of graph)
        for (const container of node.containedBy)
            if (container.bag == bag)
                bags.push(node.bag);
    return bags;
}


/**
 * Part 2 : Counts the amount of bags carried in a specific bag
 * 
 * @param {Object[]}        graph           Graph from inputs
 * @param {string}          bag             Bag from which we want to count all contained bags
 * 
 * @return {number}         Number of contained bags
 */
function countContained(graph, bag) {
    let count = 0;
    for (const contained of getContainedBags(graph, bag))
        for (const container of findBag(graph, contained).containedBy)
            if (container.bag == bag)
                count += container.count + container.count * countContained(graph, contained);
    return count;
}


function main() {
    const inputs = getInputs("./input.txt");
    const graph = getGraphFromInputs(inputs);
    console.log("Part 1 : Number of containers for \"shiny gold\" = " + findAllContainers(graph, "shiny gold").length);
    console.log("Part 2 : Number of bags contained in \"shiny gold\" = " + countContained(graph, "shiny gold"));
}


main();

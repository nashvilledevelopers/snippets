/// ES6 goodness with spread operator & Set object
/// Set object only stores unique values from the array passed into it
/// Spread Operator extracts unique values from new Set object

// test:
let numArr = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6];
let strArr = ["bork", "bork", "pupper", "woofer", "pupper", "such", "wow", "heck", "bork", "bamboozled"];

const getUniqueValues = (arr) => [...new Set(arr)];

// console.log(getUniqueValues(numArr));
// console.log(getUniqueValues(strArr));
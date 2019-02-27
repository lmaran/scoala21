// convert an array to an object by specified key
// https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
exports.arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});

// object must have a key-value format
// input: {"1": {age:23}, "2": {age:31}}
// output: [{age:23},{age:31}]
exports.objectToArray = object => Object.keys(object).map(key => object[key]);
// or:
// object => Object.keys(object).reduce((acc, key) => {
//     acc.push(object[key]);
//     return acc;
// }, []);

var redux = require('redux');

console.log('starting redux example');

// This is a pure function
// always returns the same result given the same input
// no side affects, doesn't rely on variables defined outside of function scope
// doesn't change any values outside of the function scope
// can't update the values that are passed into the function
// can't have any asynchronous requests - no promises or callbacks
function add (a, b) {
  return a + b;
}

// Unpure function examples
// relies on data outside of the function scope
// give the same inputs the result will not always be the same
var a = 3;

function add (b) {
  return a + b;
}

// updates value outside of function scope
var result;

function add (a, b) {
  result = a + b;
  return result;
}

// given the same input the output won't always be the same
function add (a, b) {
  return a + b + new Date().getSeconds();
}

// 
function changeProp (obj) {
  // ES6 way to return results without changing the object
  return { 
    ...obj,
    name: 'Fuzzy'
  }

  // none ES6 way that changes obj property
  // obj.name = 'Fuzzy'
  // return obj;
}

var originalObject = {
  name: 'Riana',
  age: 25
};
var mutatedObject = changeProp(originalObject);

console.log(originalObject);
console.log(mutatedObject);
console.log(originalObject);
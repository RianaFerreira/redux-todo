var redux = require('redux');

// The reducer pure function takes existing state and action that was taken then computes the new state
var reducer = (state = { name: 'Anonymous' }, action) => {
  // default state for application when there is no action
  // ES5 way state = state || { name: 'Anonymous' };
  return state;
};

// Use one store to represent state of entire application
// createStore accepts a pure function as an argument it is named a reducer
var store = redux.createStore(reducer);

// returns the new state object
var currentState = store.getState();

console.log('currentState', currentState);
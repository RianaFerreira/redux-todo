var redux = require('redux');

console.log('starting redux todo example');

var stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: []
  };

// Anonymous pure function assigned to the reducer variable
var reducer = (state = stateDefault, action) => {
  return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('currentState', currentState);
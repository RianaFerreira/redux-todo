var redux = require('redux');
var thunk = require('redux-thunk').default;

var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index');

export var configure = () => {
  var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });

  // Use one store to represent state of entire application
  // createStore accepts a pure function as an argument it is named a reducer
  var store = redux.createStore(reducer, redux.compose(
    // thunk teaches redux how to work with actions that aren't objects
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => {
      return f;
    }
  ));

  return store;
}
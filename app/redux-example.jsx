var redux = require('redux');

var stateDefault = { 
  name: 'Anonymous', 
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

// The reducer pure function takes existing state and action that was taken then computes the new state
var reducer = (state = stateDefault, action) => {
  // default state for application when there is no action
  // ES5 way state = state || { name: 'Anonymous' };
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies, 
          { 
            id: nextHobbyId++, 
            hobby: action.hobby
          }
        ]
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      }
    default:
      return state;
  }
};

// Use one store to represent state of entire application
// createStore accepts a pure function as an argument it is named a reducer
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => {
    return f;
  }
));

// returns the new state object
var unsubscribe = store.subscribe(() => { 
  var state = store.getState();
  document.getElementById('app').innerHTML = state.name;
  console.log('New state', store.getState());
});
// unsubscribe();

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Fuzzy'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'photography'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'skateboarding'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Jaws', 
  genre: 'Horror'
});

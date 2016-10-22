var redux = require('redux');

var stateDefault = { 
  name: 'Anonymous', 
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

// The reducer pure function takes existing state and action that was taken then computes the new state
var oldReducer = (state = stateDefault, action) => {
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
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => {
          // if you return true the item is kept if you return false the item is removed from the array
          return hobby.id !== action.id
        })
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
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
      }
    default:
      return state;
  }
};

// state is no longer an object, this is handled by combineReducers
var nameReducer = (state = {name: 'Anonymous'}, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name
    default:
      return state;
  };
};

var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id)
    default:
      return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id)
    default:
      return state;
  }
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

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

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Finding Nemo', 
  genre: 'Animation'
});

store.dispatch({type: 'REMOVE_HOBBY', id: 1});
store.dispatch({type: 'REMOVE_MOVIE', id: 1});
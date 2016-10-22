var redux = require('redux');

// ****************** ORIGINAL REDUCER LOGIC ********************
// var nextHobbyId = 1;
// var nextMovieId = 1;

// var stateDefault = { 
//   name: 'Anonymous', 
//   hobbies: [],
//   movies: []
// };

// The reducer pure function takes existing state and action that was taken then computes the new state
// var oldReducer = (state = stateDefault, action) => {
//   // default state for application when there is no action
//   // ES5 way state = state || { name: 'Anonymous' };
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.name
//       }
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies, 
//           { 
//             id: nextHobbyId++, 
//             hobby: action.hobby
//           }
//         ]
//       }
//     case 'REMOVE_HOBBY':
//       return {
//         ...state,
//         hobbies: state.hobbies.filter((hobby) => {
//           // if you return true the item is kept if you return false the item is removed from the array
//           return hobby.id !== action.id
//         })
//       }
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies: [
//           ...state.movies,
//           {
//             id: nextMovieId++,
//             title: action.title,
//             genre: action.genre
//           }
//         ]
//       }
//     case 'REMOVE_MOVIE':
//       return {
//         ...state,
//         movies: state.movies.filter((movie) => movie.id !== action.id)
//       }
//     default:
//       return state;
//   }
// };

// Dispatch actions to the reducer to update the state
// store.dispatch({ type: 'CHANGE_NAME', name: 'Fuzzy' });
// store.dispatch({ type: 'ADD_HOBBY', hobby: 'photography' });
// store.dispatch({ type: 'ADD_HOBBY', hobby: 'skateboarding' });
// store.dispatch({ type: 'ADD_MOVIE', title: 'Jaws', genre: 'Horror' });
// store.dispatch({ type: 'ADD_MOVIE', title: 'Finding Nemo', genre: 'Animation' });
// store.dispatch({ type: 'REMOVE_HOBBY', id: 1 });
// store.dispatch({ type: 'REMOVE_MOVIE', id: 1 });

// ******************** REVISED REDUCER LOGIC *********************
// state is no longer an object, this is handled by combineReducers

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// returns the new state object 
// along with the unsubscribe function
var unsubscribe = store.subscribe(() => { 
  var state = store.getState();
  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading ...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a target="_blank", href="' + state.map.url + '">View Your Location</a>';
  }

  console.log('Current state: ', state);
});

store.dispatch(actions.changeName('Fuzzy'));

store.dispatch(actions.addHobby('Cycling'));
store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.removeHobby(1));

store.dispatch(actions.addMovie('Sin City', 'Action'));
store.dispatch(actions.addMovie('Batman Returns', 'Action'));
store.dispatch(actions.removeMovie(1));

// Thunk taught Redux how to work with functions instead of action objects
// pass action function into dispatch
store.dispatch(actions.fetchLocation());

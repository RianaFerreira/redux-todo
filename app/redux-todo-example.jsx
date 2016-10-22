var redux = require('redux');

var stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: []
  };

// Anonymous pure function assigned to the reducer variable
var reducer = (state = stateDefault, action) => {
  // console.log('new action', action);
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state, 
        searchText: action.searchText
      }
    case 'CHANGE_SHOW_COMPLETED':
      return {
        ...state, 
        showCompleted: action.showCompleted
      }
    case 'CHANGE_TODOS':
      return {
        ...state,
        todos: action.todos
      }
    default:
      return state;
  }
};

var store = redux.createStore(reducer, redux.compose(
  // Load in the redux developer tools
  window.devToolsExtension ? window.devToolsExtension() : (f) => {
    return f;
  }
));

// subscribe to changes
// returns a function to unsubscribe from the callback
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  document.getElementById('app').innerHTML = state.searchText;
});
// unsubscribe();

// dispatch action to reducer
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Fuzzy'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Mojo'
});
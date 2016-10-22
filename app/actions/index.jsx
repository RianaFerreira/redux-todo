var axios = require('axios');

// ****************************** ACTION GENERATORS ****************************
// Takes all the parameters needed to generate an action and returns an object
// This object is then dispatched to the combinedReducer

// ============================= NAME ACTIONS ==================================
export var changeName = (name) => {
  return { type: 'CHANGE_NAME', name };
};

// ============================= HOBBY ACTIONS =================================
export var addHobby = (hobby) => {
  return { type: 'ADD_HOBBY', hobby };
};

export var removeHobby = (id) => {
  return { type: 'REMOVE_HOBBY', id };
};

// ============================= MOVIE ACTIONS =================================
export var addMovie = (title, genre) => {
  return { type: 'ADD_MOVIE', title, genre };
};

export var removeMovie = (id) => {
  return { type: 'REMOVE_MOVIE', id };
};

// ============================= MAP ACTIONS ===================================
export var startLocationFetch = () => {
  return { type: 'START_LOCATION_FETCH' };
};

export var completeLocationFetch = (url) => {
  return { type: 'COMPLETE_LOCATION_FETCH', url };
};

// all the other actions are objects
// this variable returns a function that needs to access the application state
// allows this generator to dispatch it's own action
export var fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());
  
    axios.get('http://ipinfo.io').then(function (response) {
      var loc = response.data.loc;
      var baseUrl = 'http://maps.google.com?q=';

      dispatch(completeLocationFetch(baseUrl + loc));
    })

  };
};
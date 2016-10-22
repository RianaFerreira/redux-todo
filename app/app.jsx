var React = require('react');
var ReactDOM = require('react-dom');

// ES6 destructuring syntax
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load foundation with the css-loader installed
// config sassLoader in webpack instead
// require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// Custom css styles
require('style!css!sass!applicationStyles')

ReactDOM.render(
  // router component setup
  <h1 className="text-center">React Project Template</h1>,
  document.getElementById('app')
);

require('./redux-todo-example.jsx');
// require('./redux-example.jsx');
// require('./redux-pure-function-examples.jsx');
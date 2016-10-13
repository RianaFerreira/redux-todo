var express = require('express');

// create the app
var app = express();

// tell it which folder name to server
app.use(express.static('public'));

// start the server
app.listen(3030, function () {
  console.log('Express server is up and running on port 3030');
});
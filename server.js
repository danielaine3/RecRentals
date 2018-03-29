// Dependencies
//=====================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// Express Configuration
//======================
var app = express();
var PORT = process.env.PORT || 8080;
// Body Parser
//======================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Access public files
//======================
app.use('/public', express.static(path.join(__dirname, 'public')));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Router
// ========================
var routes = require('./controllers/rental_controller.js');
app.use(routes);
// Listener
// =======================
  app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
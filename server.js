require("dotenv").config();
var express = require("express");
var socket = require('socket.io')
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/chat-api-route")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  let server = app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  //socket connection established
  let io = socket(server);
  io.on('connection', (socket) =>{
    // db.sequelize.sync(syncOptions).then(function() {
    console.log('made socket connection', socket.id);
    
    socket.on('chat', function(data){
      io.sockets.emit('chat', data);
      console.log('chat data: ' + data.message)
    });

    socket.on('typing', function(data){
      socket.broadcast.emit('typing', data)
      // console.log('working')
    })
    socket.on('user image', function (msg) {
      //Received an image: broadcast to all
      socket.broadcast.emit('user image', socket.nickname, msg);
  });

  })
});

module.exports = app;

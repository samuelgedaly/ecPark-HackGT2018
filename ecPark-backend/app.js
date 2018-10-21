//require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


var clarifaiRouter = require("./routes/clarifai");

//const config = require('./config/database');
//const mongoose = require('mongoose');
//var admin = require("firebase-admin");
const port = process.env.PORT || 8000;

const app = express();

app.use("/clarifai", clarifaiRouter);


app.use(bodyParser.urlencoded({ extended: false }));
app.get('/testConnection', function(req, res) {
  console.log('hello');
  res.send(
    {
        message: 'Hello from server!',
    });
});

/*
mongoose.connect(config.database);
let db = mongoose.connection;

 //Check connection
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

//Check for DB errors
db.on('error', (err) => {
  console.log(err);
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Route Files
const posts = require('./routes/posts');
app.use('/posts', posts);
*/

app.listen(port, function(){
  console.log('Server started!');
});

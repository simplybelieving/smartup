var express= require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');


var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api' ,appRoutes);

//connect to db
//mongoose.connect('mongodb://test:test@ds129723.mlab.com:29723/productcatalogue', function (err){
mongoose.connect('mongodb://test:test@cluster0-shard-00-00-q1sdx.mongodb.net:27017,cluster0-shard-00-01-q1sdx.mongodb.net:27017,cluster0-shard-00-02-q1sdx.mongodb.net:27017/productcatalogue?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', function (err){
  if(err){
    console.log('Not connected to the database: '+ err);
  }
  else{
    console.log('Successfully connected to db');
  }

});


app.get('*', function(req, res){
  res.sendFile(path.join(__dirname +  '/public/app/views/index.html'));
});



app.listen(process.env.PORT || 8080, function(){
  console.log('Running the server' + port);
});

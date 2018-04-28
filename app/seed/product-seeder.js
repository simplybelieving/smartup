

var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var seedFunction =function(){

var products = [
  new Product({
    productname:'Sept 31, 2017',
    description:'Australia',
    producttype: 'Pen',
    imagePath:'https://68.media.tumblr.com/ba37f1ba428ab8e403d82ab03ed0ce91/tumblr_ni4yl9JuUQ1qm6fcqo2_500.png'
  }),
  new Product({
    productname:'Sept 13, 2017',
    description:'Isaac',
    producttype: 'Pen',
    imagePath:'https://68.media.tumblr.com/ba37f1ba428ab8e403d82ab03ed0ce91/tumblr_ni4yl9JuUQ1qm6fcqo2_500.png'
  }),
  new Product({
    productname:'Sept 32, 2017',
    description:'Should i learn login',
    producttype: 'Pen',
    imagePath:'https://68.media.tumblr.com/ba37f1ba428ab8e403d82ab03ed0ce91/tumblr_ni4yl9JuUQ1qm6fcqo2_500.png'
  })
];

var done=0;
for(var i=0; i< products.length; i++){
  products[i].save(function(err, result){
    done++;
    if(done===products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}

}//end of seed function

module.exports = seedFunction;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


mongoose.Promise = require('bluebird');


var UserSchema = new Schema({
  username: {type: String, required: true, unique: true, lowecase:true},
  password: {type: String, required: true}
});

UserSchema.pre('save', function(next){
var user = this;
bcrypt.hash(user.password, null, null, function(err, hash){
  user.password=hash;
  next();
  });

});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};


var ProductSchema = new Schema({
  productname: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  producttype: {type: String, required: true},
  imagePath: {type: String, required: true},
  imagePath1: {type: String, required: true},
  imagePath2: {type: String, required: true},
  price: {type: String, required: false},
  quantity: {type: Number, required: false},
  unit: {type: String, required: false},
  commentArray : [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
});

var FeedbackSchema = new Schema({
  _productname: { type: String , ref: 'Product' },
  words: {type: String, required: false}
});


var OrderSchema = new Schema({

  productname: { type: String, require: false },
  unit:{type: String, required: false},
  price: {type: String, required: false},
  quantity: {type: Number, required: false},
  _email: { type: String , ref:'Customer' }
  //_email: { type: String , required: false }
});

var CustomerSchema = new Schema({
  orderArray : [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  name: {type:String, required: true},
  email: {type: String, required: true},
  contact: {type: String, required: true},
  address: {type: String, required: true},
  status: { type: String , required: true },
  month: {type: String , required: true },
  day:{type: String , required: true },
  year:{type: String , required: true }

});

var User = mongoose.model('User', UserSchema);
var Order = mongoose.model('Order', OrderSchema);
var Customer = mongoose.model('Customer', CustomerSchema);
var Product = mongoose.model('Product', ProductSchema);
var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = {
    User: User,
    Order: Order,
    Customer: Customer,
    Product:  Product,
    Feedback: Feedback
};

//module.exports = mongoose.model('Product', ProductSchema);
//module.exports = mongoose.model('Feedback', FeedbackSchema);

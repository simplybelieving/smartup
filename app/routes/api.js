var model= require('../models/product');
var seedFunction =require('../seed/product-seeder');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var jwt = require('jsonwebtoken');
var secret = 'secret';

module.exports = function(router){



  router.post('/feedbackSection', function(req, res){
  var feedback = new model.Feedback();
  var words =req.body.words;
  feedback.words = req.body.words;
  feedback._productname = req.body._productname;
  var idcheck=req.body._productname;



       model.Product.findOne({productname:{$regex: idcheck ,$options:"$i"}}).populate('commentArray').exec(function (err, product) {

         feedback.save(function(err) {
         product.commentArray.push(feedback);
         product.save(function(err) {
         });
         });
       res.json({ product: product });
         });


});


  router.post('/products', function(req, res){

  var product = new model.Product();
  product.unit= req.body.unit;
  product.productname = req.body.productname;
  product.description = req.body.description;
  product.producttype = req.body.producttype;
  product.imagePath = req.body.imagePath;  product.imagePath1 = req.body.imagePath1;  product.imagePath2 = req.body.imagePath2;
  product.price = req.body.price;
  if( req.body.productname==null || req.body.description==null ||  req.body.producttype==null || req.body.imagePath==null){
    res.json({ success:false, message: 'Ensure these items are provided...'});
  }
  else{
    product.save(function(err){
     if(err){
      res.json({ success: false, message:'Item already exist!'});
    }else{
      res.json({ success: true, message:'Created!'});
    }

    });

  }
});


router.post('/users', function(req, res){

var user = new model.User();

user.username = req.body.username;
user.password = req.body.password;
if( req.body.username==null ||  req.body.password==null ){
  res.json({ success:false, message: 'Ensure these items are provided...'});
}
else{
user.save(function(err){
   if(err){
    res.json({ success: false, message:'Item already exist!'});
  }else{
    res.json({ success: true, message:'Created!'});
  }

  });

}
});



router.post('/editStatus', function(req, res){

  model.Customer.update({_id:req.body._id}, {$set:{status:"DELIVERED"}}, function(err, message) {
      if (err)
            res.json({ success:false, message: 'Ensure these items are provided...'});
      else
            res.json({ success:true, message: 'Read the array elements YEAH BITCH'});
  });

});



router.post('/editPrice', function(req, res){

  model.Product.update({_id:req.body.product_id}, {$set:{price:req.body.newPrice}}, function(err, message) {
      if (err)
            res.json({ success:false, message: 'Ensure these items are provided...'});
      else
            res.json({ success:true, message: 'Read the array elements YEAH BITCH'});
  });

});



router.post('/sendEmail', function(req, res){

  var customer = new model.Customer();
  var today = new Date();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }


  var string= req.body.cartstring;
  var objs = JSON.parse(string); //parse string of orders into objects

  var idemail =req.body.customer.email;

customer.month=mm;
customer.day=dd;
customer.year=yyyy;
customer.name =req.body.customer.name;
customer.email =req.body.customer.email;
customer.contact =req.body.customer.contact;
customer.address =req.body.customer.address;
customer.status="PENDING";


for(var ctr=objs.length-1; ctr>=0; ctr--){
  var order = new model.Order();
  order._email= idemail;
  order.productname=objs[ctr].productname;
  order.price=objs[ctr].price
  order.unit=objs[ctr].unit;
  order.quantity=objs[ctr].quantity;



  order.save();
  customer.orderArray.push(order);
  customer.save();

}


 res.json({ success: true, message:'This is your reference number: '+ customer._id});


});




router.get('/pending', function(req, res){
      var stat = "PENDING";

      model.Customer.find({"status": stat},{}).exec(function(err, items){

       res.json({ items: items });
     });
});



router.get('/', function(req, res){
    var type = "Home";
      model.Product.find({"producttype": type},{}).exec(function(err, items){
       res.json({ items: items });
     });

});


router.get('/morecatalogue/:currentPage/:type', function(req, res){
      var type = req.params.type;
       var varskip = 12 * (parseInt(req.params.currentPage)-1);
      model.Product.find({"producttype": type},{}, {limit: 13, skip: varskip}).exec(function(err, items){
       res.json({ items: items });
     });
});

 router.get('/catalogues', function(req, res){
    model.Product.find({}, function(err, items){
    res.json({ items: items });
  });
});




  router.get('/searchlist/:id', function(req, res) {
       var checkspace = "true";
       var idcheck = req.params.id; // Assign the _id from parameters to variable

       if (/^[0-9A-Za-z]+$/.test(idcheck))
     { checkspace = "false";
         //there are only alphanumeric characters; check if there's spacebar or no. if none, checspace==false
     }

       if(mongoose.Types.ObjectId.isValid(idcheck) && checkspace=="false") {
                 model.Product.find( { _id : idcheck }, function(err, product) {

                    res.json({ product: product }); }
               )} else{

   decodeURI(idcheck);
   model.Product.find({productname:{$regex: idcheck ,$options:"$i"}}, function(err, product){
      res.json({ product: product });
    });
  }

       });





       router.get('/orderdetails/:id', function(req, res) {

            var idcheck = req.params.id; // Assign the _id from parameters to variable


           if(mongoose.Types.ObjectId.isValid(idcheck)) {
                      model.Customer.findOne( { _id : idcheck }).populate('orderArray').exec(function (err, customer){
                      //   console.log("Heyoooooooo"+ product.productname + idcheck);
                         res.json({ customer: customer }); }
                    )}


            });




router.post('/authenticate', function(req, res){
  model.User.findOne({ username: req.body.username}).select('password').exec(function(err, user){
    if(err) throw err;

    if(!user){
      res.json({ success: false, message: 'could not authenticate user'});
    }
    else if(user){
    var validPassword = user.comparePassword(req.body.password);
        if(!validPassword){
          res.json({ success: false, message: 'Could not authenticate password'});
        }else{
          var token = jwt.sign({username: user.username}, secret, { expiresIn: '24h'});
          res.json({ success: true, message: 'Success Pass Authentication', token: token});
        }

    }

  });

});




  router.get('/productdetails/:id', function(req, res) {

       var idcheck = req.params.id; // Assign the _id from parameters to variable


      if(mongoose.Types.ObjectId.isValid(idcheck)) {
                 model.Product.findOne( { _id : idcheck }).populate('commentArray').exec(function (err, product){
                    res.json({ product: product }); }
               )}


     else{
     model.Product.findOne({productname:{$regex: idcheck ,$options:"$i"}}).populate('commentArray').exec(function (err, product) {
      res.json({ product: product });
    });
  }

       });





  //seedFunction();

  return router;
}

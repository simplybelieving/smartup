
angular.module('productControllers', ['productServices', 'ui.bootstrap', 'angular-loading-bar'])




.controller('showItems', function($http, $scope, $routeParams, Product){

var app = this;


  this.editPrice = function(items, $index, id){


  $http.post('/api/editPrice', {newPrice:JSON.stringify(this.items[$index].price), product_id:id} ).then(function(data){

     if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

  });//////////////////////

  };


   app.loading = true; // Start loading icon on page load
   app.accessDenied = true; // Hide table while loading
   app.errorMsg = false; // Clear any error messages
   app.editAccess = false; // Clear access on load
   app.deleteAccess = false; // CLear access on load
   app.limit = 6; // Set a default limit to ng-repeat
   app.currentPage= 1;
   // Function: get all the users from database

       // Runs function to get all the users from database
       Product.getProducts().then(function(data) {
       //console.log(data.data.items[1].productname);
       app.items = data.data.items; // Assign users from database to variable
       });
       Product.getProducts(); // Invoke function to get users from databases


   // Function: Show more results on page
   app.showMore = function(number) {
       app.showMoreError = false; // Clear error message
       // Run functio only if a valid number above zero
       if (number > 0) {
           app.limit = number; // Change ng-repeat filter to number requested by user
       } else {
           app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
       }
   };

   // Function: Show all results on page
   app.showAll = function() {
       app.limit = undefined; // Clear ng-repeat limit
       app.showMoreError = false; // Clear error message
   };


 })




.controller('homeCtrl', function($http, $scope, $routeParams, Product){

    var app = this;

   Product.getHome().then(function(data) {


   $scope.Home1 =data.data.items[0].imagePath;
   $scope.Desc1 =data.data.items[0].description;
   $scope.Home2 =data.data.items[1].imagePath;
   $scope.Desc2 =data.data.items[1].description;
   $scope.Home3 =data.data.items[2].imagePath;
   $scope.Desc3 =data.data.items[2].description;
   $scope.Home4 =data.data.items[3].imagePath;
   $scope.Desc4 =data.data.items[3].description;
   $scope.Home5 =data.data.items[4].imagePath;
   $scope.Desc5 =data.data.items[4].description;
   $scope.Home6 =data.data.items[5].imagePath;
   $scope.Desc6 =data.data.items[5].description;

   });

   Product.getHome(); // Invoke function to get users from databases
   // Runs function to get all the users from database


})


.controller('detailsCtrl',function($http, $scope, $routeParams, Product){

   var app = this;

   Product.getProduct($routeParams.id).then(function(data){


   app.commentArray=data.data.product.commentArray;
   $scope.newName=data.data.product.productname;
   $scope.newDescription=data.data.product.description;
   $scope.newImage=data.data.product.imagePath;
   $scope.newImage1=data.data.product.imagePath1;
   $scope.newImage2=data.data.product.imagePath2;
   $scope.newType=data.data.product.producttype;
   $scope.newPrice=data.data.product.price;
   $scope.newUnit=data.data.product.unit;

 });

    app.showdetails = function(newUnit, newName, newDescription, newImage, newType, commentArray, newImage1, newImage2){  };

    this.addComments = function(addData, newName){
      app.errorMsg=false;

      this.addData._productname = newName;
      $http.post('/api/feedbackSection', this.addData).then(function(data){


      });


    };



})

.controller('moreCtrl', function($timeout, $http, $scope, $routeParams, Product){


   var app = this;


   var shoppingcart= angular.fromJson(sessionStorage.getItem('shoppingcart'));

   app.shopping = shoppingcart; // show items in view cart.html



   if (!(shoppingcart instanceof Array) || shoppingcart==null) {
         //videos has been corrupted
         var shoppingcart=[];

     }

   this.arrayEdit = function(shopping, $index){
       var index = $index;

       shoppingcart.splice($index, 1, this.shopping[$index]);
       app.successMsg= true;
       sessionStorage.setItem('shoppingcart', angular.toJson(shoppingcart));

       $timeout(function () {

               app.successMsg= false;

       }, 1000);  //hides after 1 seconds


   };


   this.arrayDelete = function(shopping, $index){
       var index = $index;

       shoppingcart.splice($index, 1);
       app.successMsg= true;
       sessionStorage.setItem('shoppingcart', angular.toJson(shoppingcart));

       $timeout(function () {

               app.successMsg= false;

       }, 1000);  //hides after 1 seconds


   };


   this.arrayStorageSearch = function(product, $index){ //adding into shopping cart
       var index = $index;
       $scope.shoppingcart= shoppingcart;
      $scope.shoppingcart.push(angular.copy(this.product[$index])); //HOW I AM TRYING TO SAVE DATA INTO MY ARRAY, ITEMS
      saveToShoppingCart();

      app.successMsg= true; // notifies success

   };


   this.arrayStorage = function(items, $index){ //adding into shopping cart
       var index = $index;
       $scope.shoppingcart= shoppingcart;

      $scope.shoppingcart.push(angular.copy(this.items[$index])); //HOW I AM TRYING TO SAVE DATA INTO MY ARRAY, ITEMS

      saveToShoppingCart();

      app.successMsg= true; // notifies success

   };

   var saveToShoppingCart = function(){
    sessionStorage.setItem('shoppingcart', angular.toJson(shoppingcart));

    $timeout(function () {

        app.successMsg= false;

    }, 1000);  //hides after 1 seconds

  };



   if($routeParams.id!=null){

   Product.getSearch($routeParams.id);

   Product.getSearch($routeParams.id).then(function(data){
     app.product = data.data.product;
  //   console.log("Searchie"+ data.data.items[0].productname);
  });

  }//if


  if( $routeParams.type!=null){

   Product.getMore($routeParams.currentPage, $routeParams.type).then(function(data){
   app.items = data.data.items;

   });

   Product.getMore($routeParams.currentPage, $routeParams.type);

   $scope.type = $routeParams.type;
   $scope.currentPage = parseInt($routeParams.currentPage) + 1;
   app.temp = parseInt($routeParams.currentPage) - 1;
   $scope.prevPage = app.temp;

   }


    $scope.getTotal = function(){
      var total =0;
      for (var i=0; i< shoppingcart.length; i++){
      total += shoppingcart[i].quantity * shoppingcart[i].price;

      }

      return total;
    }


     this.sendArray = function(customer){
         app.errorMsg=false;

         var myJSON = JSON.stringify(shoppingcart);


         $http.post('/api/sendEmail', {cartstring:JSON.stringify(shoppingcart), customer:this.customer} ).then(function(data){

            if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

         });
     };




})



.controller('addCtrl', function($http){

var app = this;

  this.addItem = function(addData){
      app.errorMsg=false;

      $http.post('/api/products', this.addData).then(function(data){

         if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

      });
  };
})




 .filter('pagination', function(){
   return function(data, start){
     if (!data || !data.length) { return; }
     return data.slice(start);
   }
 });

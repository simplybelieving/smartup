


angular.module('customerControllers', ['customerServices', 'ui.bootstrap', 'angular-loading-bar'])



.controller('orderdetailsCtrl',function($http, $scope, $routeParams,  Customer){

   var app = this;
//   $scope.newImage="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1488896401i/29241322._SX120_.jpg";

   Customer.getOrder($routeParams.id).then(function(data){


   app.orderArray=data.data.customer.orderArray;
   $scope.address=data.data.customer.address;
   $scope.name=data.data.customer.name;
   $scope.contact=data.data.customer.contact;
   $scope.month=data.data.customer.month;
   $scope.day=data.data.customer.day;
   $scope.year=data.data.customer.year;

   //console.log("PRODUCT DETAILS COMMENTS:" + data.data.customer.orderArray[0].productname);

             var total =0;
             for (var i=0; i< data.data.customer.orderArray.length; i++){
             total += data.data.customer.orderArray[i].quantity * data.data.customer.orderArray[i].price;
             }
   $scope.total=total;
   ///////////////

 });

    app.showdetails = function(newName, newDescription, newImage, newType, commentArray, newImage1, newImage2){  };

})


.controller('showPending', function($http, $scope, $routeParams, Customer){

var app = this;


this.editStatus = function(items, id){


$http.post('/api/editStatus', {newStatus:JSON.stringify("DELIVERED"), _id:id} ).then(function(data){
console.log(data.data.success);
console.log(data.data.message);

   if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

});

};


       // Runs function to get all the users from database
       Customer.getPending().then(function(data) {
       app.items = data.data.items; // Assign users from database to variable

       });
       Customer.getPending(); // Invoke function to get users from databases

 });

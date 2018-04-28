

angular.module('userControllers', ['userServices', 'ui.bootstrap', 'angular-loading-bar'])

.controller('addUserCtrl', function($http){

var app = this;

  this.addUser = function(addData){
      app.errorMsg = false;



      $http.post('/api/users', this.addData).then(function(data){

         if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

      });
  };
});

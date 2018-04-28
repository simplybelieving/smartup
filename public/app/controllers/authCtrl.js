
  angular.module('authControllers', ['authServices', 'ui.bootstrap', 'angular-loading-bar'])

.controller('authCtrl', function(Auth, $timeout, $location){
 var app = this;

 this.doLogin = function(loginData){

   Auth.login(app.loginData).then(function(data){
      if(data.data.success){
        app.successMsg= data.data.message +'...Redirecting';
        $timeout(function(){
          $location.path('/adminpage');
        }, 2000);
      }else{
        app.errorMsg = data.data.message;
      }

   });
 };

 this.logout = function(){
   Auth.logout();

   $timeout(function(){
     $location.path('/');
   }, 2000);

 };

});

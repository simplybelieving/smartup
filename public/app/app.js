//main config for all angular files

angular.module('productApp', ['appRoutes',
   'userServices', 'userControllers',
   'customerServices', 'customerControllers',
   'productServices', 'productControllers',
   'authControllers', 'authServices']).run(function($rootScope, $location){
   $rootScope.location = $location;
});

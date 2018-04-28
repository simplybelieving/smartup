
var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider,  $locationProvider){

   $routeProvider

   .when('/',{
     templateUrl: 'app/views/pages/home.html',
     controller:'homeCtrl'
   })

   .when('/about',{
     templateUrl: 'app/views/pages/about.html'
   })

   .when('/adminpage',{
     templateUrl: 'app/views/pages/adminpage.html',
     controller: 'authCtrl',
     controllerAs: 'authCtrl',
     authenticated: true
   })

   .when('/pending',{
     templateUrl: 'app/views/pages/pending.html',
     controller:'showPending',
     controllerAs:'showPending',
     authenticated: true
   })


   .when('/stationary',{
     templateUrl: 'app/views/pages/stationary.html'
   })

   .when('/catalogues',{
     templateUrl: 'app/views/pages/catalogues.html',
     controller: 'showItems',
     filter:'pagination',
     controllerAs: 'showItems',
     authenticated: true
   })



   .when('/morecatalogue/:currentPage/:type',{
     templateUrl: 'app/views/pages/morecatalogue.html',
     controller: 'moreCtrl',
     controllerAs: 'moreCtrl'
   })

   .when('/orderdetails/:id',{
       templateUrl: 'app/views/pages/orderdetails.html',
       controller: 'orderdetailsCtrl',
       controllerAs: 'orderdetailsCtrl',
       authenticated: true
   })


    .when('/searchlist/:id',{
        templateUrl: 'app/views/pages/searchlist.html',
        controller: 'moreCtrl',
        controllerAs: 'moreCtrl'
    })


   .when('/cart',{
     templateUrl: 'app/views/pages/cart.html',
     controller: 'moreCtrl',
     controllerAs: 'moreCtrl'
   })

   .when('/addproduct',{
     templateUrl: 'app/views/pages/addproduct.html',
     controller: 'addCtrl',
     controllerAs: 'addCtrl',
     authenticated: true
   })

   .when('/productdetails/:id',{
     templateUrl: 'app/views/pages/productdetails.html',
     controller: 'detailsCtrl',
     controllerAs: 'detailsCtrl'
   })

   .when('/register',{
     templateUrl: 'app/views/pages/register.html',
     controller: 'addUserCtrl',
     controllerAs: 'addUserCtrl',
     authenticated: true
   })


   .when('/login',{
     templateUrl: 'app/views/pages/login.html',
     controller: 'authCtrl',
     controllerAs: 'authCtrl',
     authenticated: false
   })




   .otherwise({ redirectTo: '/'});


   $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
   });

});




  app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
  $rootScope.$on('$routeChangeStart', function(event, next, current){
     if(next.$$route.authenticated == true){
        if(!Auth.isLoggedIn()){
          event.preventDefault();
          $location.path('/');
        }
      } else if(next.$$route.authenticated == false){
          if(Auth.isLoggedIn()){
            event.preventDefault();
            $location.path('/adminpage');
          }
      }else{
        console.log('No need for authenticte');
      }

    });

  }]);

angular.module('customerServices', [])



.factory('Customer',  function($http) {

    var customerFactory = {}; // Create the userFactory object

        customerFactory.getPending = function() {
        return $http.get('/api/pending/');
    };

        customerFactory.getOrder = function(id) {
        return $http.get('/api/orderdetails/' + id);
    };


    return customerFactory; // Return userFactory object
});

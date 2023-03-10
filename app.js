(function()
{
   'use strict'
   angular.module('myFirstApp', []).controller('MyFirstController', function($scope)
   {
      $scope.name = "Bhashi007";
      $scope.sayHello = function()
      {
         return "Hello Coursera!";
      }
        
   });
})();  
(function () {
   'use strict'
   // angular.module('MyFirstApp', []).controller('MyFirstController', function ($scope) {
   //    $scope.name = "Bhashi007";
   //    $scope.sayHello = function () {
   //       return "Hello Coursera!";
   //    }
   // });

   // angular.module('NameCalculator', []).controller('NameCalculatorController', function ($scope) {
   //    $scope.name = "";
   //    $scope.totalValue = 0;
   //    $scope.displayNumeric = function () {
   //       var totalNameValue = 0;
   //       $scope.totalValue = calculatNumericForString($scope.name)
   //    }

   //    function calculatNumericForString(string) {
   //       var totalStringValue = 0;
   //       for (var i = 0; i < string.length; i++) {
   //          totalStringValue += string.charCodeAt(i);
   //       }
   //       return totalStringValue;
   //    }
   // });
   function SleepFilter() {
      return function (input) {
         //console.log(input);
         input = input || "";
         input = input.replace("Code", "Sleep");
         return input;
      }
   }
   function TruthFilter() {
      return function (input, target, replace) {
         input = input || "";
         input = input.replace(target, replace);
         return input;
      }
   }

   angular.module('DIApp', [])
      .controller('DIController', DIController)
      .filter('sleep', SleepFilter)
      .filter('truth', TruthFilter);
   DIController.$injector = ['$scope', '$filter', 'sleepFilter', 'truthFilter', '$timeout'];
   function DIController($scope, $filter, sleepFilter, truthFilter, $timeout) {
      $scope.name = "Alice";
      $scope.upper = function () {
         var upCase = $filter('uppercase');
         $scope.name = upCase($scope.name);
      };
      $scope.stateOfBeing = "hungry";
      $scope.sayMessage = function () {
         var msg = "Drink a Coffee and Code!";
         var outputMsg = $filter('uppercase')(msg);
         return outputMsg;
      };
      $scope.feedYaakov = function () {
         if ($scope.stateOfBeing == "fed") {
            $scope.stateOfBeing = "hungry";
            console.log("hungry");
         }
         else {
            $scope.stateOfBeing = "fed";
            console.log("fed");
         }
      };
      $scope.coffeePrice = 0.45;

      //Calling Custom Filter from Controller------------------->
      $scope.saySleepMessage = function () {
         var msg = "Drink a Coffee and Code!";
         //console.log(msg);
         var outputMsg = sleepFilter(msg)
         return outputMsg;
      };

      //Watched and Digest Cycle------------------->
      $scope.showNumberOfWatches = function () {
         console.log("Number of watches: ", $scope.$$watchersCount);
         //console.log($scope);
      }
      $scope.onceCounter = 0;
      $scope.countOnce = function () {
         $scope.onceCounter = 1;
      }
      $scope.counter = 0;
      // $scope.countUp = function () {
      //    setTimeout(function () {
      //       $scope.counter++;
      //       console.log("Up Counter Incremented!");
      //       // We have to forced call digest loop if we use some other js timer
      //       // So always use Angular timer else UI will not update properly
      //       // Or we have to wrap everything inside $apply as below.
      //       $scope.$digest();
      //    }, 2000);
      // }

      // $scope.countUp = function () {
      //    setTimeout(function () {
      //       // change any model outside of the Angular context,
      //       // to inform Angular of the changes by calling $apply() manually
      //       // anyway bestway for timer is to use Angular timeout as below
      //       $scope.$apply(function () {
      //          $scope.counter++;
      //          console.log("Up Counter Incremented!");
      //       });
      //    }, 2000);
      // }

      $scope.countUp = function () {
         $timeout(function () {
            $scope.counter++;
            console.log("Up Counter Incremented!");
         }, 2000);
      };

      // Every time property assigned this function will automatically call by Angular
      // This is also monitor by a watch, So watchersCount will include one more from this function
      $scope.$watch(function () {
         console.log("Digest loop fired!");
      });

      // We can manually create watches and listen to properies
      // But this is not recomended since Angular will automatically creates watches for us.
      // $scope.$watch('onceCounter', function (newVal, oldVal) {
      //    console.log("OnceCounter old value: ", oldVal);
      //    console.log("OnceCounter new Value: ", newVal);
      // });
      // $scope.$watch('counter', function (newVal, oldVal) {
      //    console.log("Counter old value: ", oldVal);
      //    console.log("Counter new Value: ", newVal);
      // });

      //One way binding and remove the watch ------------------->
      $scope.setAppName = function () {
         $scope.appName = "AngularJS Fun! " + $scope.name;
         console.log("App Name: " + $scope.appName);
      };



      //Question codes------------------->
      // var x1 = function () {
      //    return "Blah!";
      // };
      // var x2 = x1();
      // function x3(arg) {
      //    return arg; 
      // }
      // var x4 = x3(x1);
      // var x5 = x3(x2);
      // var x6 = x3(x1());
      // console.log("x1: \n" + x1);
      // console.log("x2: \n" + x2);
      // console.log("x3: \n" + x3);
      // console.log("x4: \n" + x4);
      // console.log("x5: \n" + x5);
      // console.log("x6: \n" + x6);
      //console.log($injector.annotate(DIController));
   }
})();
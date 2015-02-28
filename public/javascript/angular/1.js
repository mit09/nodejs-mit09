var app = angular.module("HelloWorldApp", []);


app.controller("HelloWorldController", function ($scope,$http) {
    $scope.msg = 'Hello from controller';

    $scope.addUser = function (developer) {
        console.log(developer.application[0])
       $http.post("/developers" ,developer)
       .success(function (response) {
           $scope.developers = response;
        });
       $scope.developer = new Object();
    }

    $scope.getDev = function () {
        $http.get('/developers')
        .success(function (response) {
            $scope.developers = response
            console.log($scope.developers);
        });
    }

    $scope.delete = function (index) {
        $http.delete('/developers/' + index)
        .success(function (response) {
            $scope.developers = response;
        });
    }

    
    $scope.selectedIndex = null;
    $scope.edit = function (index) {
        $scope.developer = $scope.developers[index];
        $scope.selectedIndex = index;
    }
    $scope.updateUser = function () {
        $http.put('/developers/' + $scope.selectedIndex, $scope.developer)
        .success(function (response) {
            $scope.developers = response;
        });
        $scope.developer = new Object();
    }
});
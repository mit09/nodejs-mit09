var app = angular.module("HelloWorldApp", []);


app.controller("HelloWorldController", function ($scope,$http) {
    $scope.msg = 'Hello from controller';

    $scope.addUser = function (player) {
       $http.post("/player" ,player)
       .success(function (response) {
           $scope.players = response;
        });
       $scope.player = new Object();
    }

    $scope.getDev = function () {
        $http.get('/player')
        .success(function (response) {
            $scope.players = response
            console.log($scope.players);
        });
    }

    $scope.delete = function (id) {
        $http.delete('/player/' + id)
        .success(function (response) {
            $scope.players = response;
        });
    }

    $scope.selectedIndex = null;
    $scope.edit = function (id) {
        $http.get('/player/' + id)
        .success(function (response) {
            $scope.player = response;
        });
        $scope.selectedIndex = id;
    }

    $scope.updateUser = function () {
        $http.put('/player/' + $scope.selectedIndex, $scope.player)
        .success(function (response) {
            $scope.players = response;
        });
        $scope.player = new Object();
    }
});
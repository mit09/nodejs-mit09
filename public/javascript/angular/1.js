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

    $scope.delete = function (index) {
        $http.delete('/player/' + index)
        .success(function (response) {
            $scope.players = response;
        });
    }

    $scope.selectedIndex = null;
    $scope.edit = function (index) {
        $scope.player = $scope.players[index];
        $scope.selectedIndex = index;
    }

    $scope.updateUser = function () {
        $http.put('/player/' + $scope.selectedIndex, $scope.player)
        .success(function (response) {
            $scope.players = response;
        });
        $scope.player = new Object();
    }
});
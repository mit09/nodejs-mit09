var app = angular.module("HelloWorldApp", []);

app.controller("HelloWorldController", function ($scope, $http, PlayerService) {
    $scope.msg = 'Hello from controller';

    $scope.addUser = function (player) {
        PlayerService.addPlayer(player, function (response) {
           $scope.players = response;
        });
       $scope.player = new Object();
    }

    $scope.getDev = function () {
        PlayerService.getAllPlayer(function (response) {
            $scope.players = response
            console.log($scope.players);
        });
    }

    $scope.delete = function (id) {
        PlayerService.deletePlayer(id, function (response) {
            $scope.players = response;
        });
    }

    $scope.selectedIndex = null;
    $scope.edit = function (id) {
        PlayerService.getPlayerById(id, function (response) {
            $scope.player = response;
        });
        $scope.selectedIndex = id;
    }

    $scope.updateUser = function () {
        PlayerService.updatePlayer($scope.selectedIndex, $scope.player, function (response) {
            $scope.players = response;
        });
        $scope.player = new Object();
    }
});
app.controller('ProfileController', ['$scope', 'UserService', function ($scope, UserService) {
    console.log('Inside ProfileController');
    $scope.init = function () {
        console.log('inside init')
        var currentUser = UserService.getCurrentUser();
        if (currentUser != null) {
            $scope.username = currentUser.username;
        } else {

        }
    }
}]);

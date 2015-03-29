app.controller('NavController',  function ($scope, $location, $window, UserService, $q, $timeout, $location, $rootScope, $http) {
    
    $scope.currentUser = null;
    
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        var user = UserService.login(username, password);
        if (user == null) {
            $window.alert("Invalid credentials!!");
            $scope.username = "";
            $scope.password = "";
        }
        $scope.currentUser = user;
    }

    $scope.logout = function () {
        UserService.logout();
        $scope.currentUser = null;
        
        
        /*Redirect to home*/
        if ($location.path() == '/profile') {
            $location.path('/home');
        }
        
        
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user != '0') {
                console.log('User is authenticated');
                $rootScope.currentUser = user;
                deferred.resolve();
            }
                // User is Not Authenticated
            else {
                console.log('User is not authenticated');
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

   /* masterApp.controller("MasterController", function ($scope, $http, $location, $rootScope) {*/

        $scope.login_p = function (user) {
            console.log(user);
            $http.post("/login", user)
            .success(function (response) {
                console.log(response);
                $rootScope.rootUser = response;
                $location.url("/profilep");
            });
        }

        $scope.logout_p = function () {
            $http.post("/logout")
            .success(function () {
                $rootScope.rootUser = null;
                $location.url("/home");
            });
        };



        $scope.register_p = function (user) {
            console.log(user);
            if (user.password != user.password2 || !user.password || !user.password2) {
                $rootScope.message = "Your passwords don't match";
            }
            else {
                $http.post("/user", user)
                .success(function (response) {
                    console.log(response);
                    if (response != null) {
                        $rootScope.currentUser = response;
                        $location.url("/view");
                    }
                });
            }
        }
        
        
    /*});*/
});

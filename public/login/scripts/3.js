var app = angular.module("AngularApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('', {
            templateUrl: 'login/partials/home.html',
        }).
        when('/home', {
            templateUrl: 'login/partials/home.html',
        }).
        when('/profile', {
            templateUrl: 'login/partials/profile.html',
        }).
        when('/profilep', {
              templateUrl: 'login/partials/profile_p.html',
        }).
        when('/register', {
            templateUrl: 'login/partials/registration.html',
        }).
        when('/about', {
            templateUrl: 'login/partials/about.html',
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);



var trackerApp = angular.module("trackerApp", ["ngRoute", "ngResource"]);

trackerApp.run(function ($rootScope, $location, $route, authService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (authService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});
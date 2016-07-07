trackerApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'static/html/login.html',
        controller: 'loginController'
    })
    .when('/login', {
        templateUrl: 'static/html/login.html',
        controller: 'loginController'
    })
    .when('/logout', {
        controller: 'logoutController'
    })
    .when('/project_list', {
        templateUrl: 'static/html/project_list.html',
        controller: 'projectController'
    })
    .when('/project_list/:projectName', {
        templateUrl: 'status/html/project_list.html',
        controller: 'projectController'
    })
    .otherwise({
      redirectTo: '/'
    });
})
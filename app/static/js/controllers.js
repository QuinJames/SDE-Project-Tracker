trackerApp.controller('loginController', ['$scope', '$location','$route', '$cookies', 'authService', 'userService' , function($scope, $location, $route, $cookies, authService, userService){
    
    if($cookies.get('user') === 'true')
    {
        $location.path('/project_list');
        $route.reload();
    }
    
    $scope.login = function(){
        
        $scope.error = false;
        $scope.disabled = true;
        userService.user = $scope.loginForm.username;
        authService.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function(){
            $location.path('/project_list');
            $scope.disabled = false;
            $scope.loginForm = {};
        })
        .catch(function() {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {}
        });
    }
    
    $scope.isLoggedIn = function(){
        return authService.isLoggedIn();
    }
    
}]);


trackerApp.controller('logoutController', ['$scope', '$location', '$cookies', 'authService', function($scope, $location, $cookies, authService){
    $scope.logout = function(){
        authService.logout()
        .then(function(){
            $location.path('/login');
        });
    };
}]);

trackerApp.controller('projectController', ['$scope', '$location', '$log', '$routeParams', '$route', '$cookies', 'projectService', 'authService', function($scope, $location, $log, $routeParams, $route, $cookies, projectService, authService){
    
    if (authService.isLoggedIn() === false && $cookies.get('user') === false){
        $location.path('/login');
        $route.reload();
        
    }
    
    $scope.projectList = ["Handset Discount App", "NPS Tracker", 
                          "Payroll Reporter", "Port Mapper", "FWA Calculator", "HLR GUI"];
    
    $scope.project = $routeParams.project || null;
    
    /*$scope.$watch('project', function(){
        projectService.project = $scope.project;    
    });*/
    
    $scope.clicked = function(project){
        $scope.project = project;
        projectService.project = project;
        //console.log("Clicked: " + project);
        //console.log("/project_list/" + project)
        $location.path("/project_list/" + project);
    };
    
}]);

trackerApp.controller('projectQuestionsController', ['$scope', '$location', '$routeParams', '$route', '$cookies', 'projectService', 'userService', 'authService', function($scope, $location, $routeParams, $route, $cookies, projectService, userService, authService){
    
    if (authService.isLoggedIn() === false && $cookies.get('user') === false){
        $location.path('/login');
        $route.reload();
        
    }
    
    $scope.projectName = projectService.project;
    $scope.project = {};
    $scope.project.user = userService.user;
    $scope.submit = function(){
        
        //Submit to server for processing
        console.log($scope.project);
    }
}]);
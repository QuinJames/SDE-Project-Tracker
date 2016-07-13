trackerApp.controller('loginController', ['$scope', '$location','$route', '$cookies', 'authService', 'userService' , function($scope, $location, $route, $cookies, authService, userService){
    
    if($cookies.get('user') === 'true')
    {
        userService.user = $cookies.get('username');
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

trackerApp.controller('projectController', ['$scope', '$location', '$log', '$routeParams', '$route', '$cookies','$http', 'projectService', 'authService', function($scope, $location, $log, $routeParams, $route, $cookies, $http, projectService, authService){
    
    if (authService.isLoggedIn() === false || $cookies.get('user') === false){
        authService.logout();
        $location.path('/login');
        $route.reload();
        
    }
    
    //$scope.projectList = ["Handset Discount App", "NPS Tracker", 
    //                      "Payroll Reporter", "Port Mapper", "FWA Calculator", "HLR GUI"];
    
    $http.get('/api/v1.0/getProjects')
    .success(function(data){
        //console.log(data);
        if(data.status == true) {
            $scope.projectList = data.project_list;
        }
        else {
            $scope.projectList = null;
        }
    })
    .error(function(data){
        $scope.projectList = null;
    })
    
    $scope.project = $routeParams.project || null;
    
    $scope.clicked = function(project){
        $scope.project = project;
        projectService.project = project;
        $location.path("/project_list/" + project);
    };
    
}]);

trackerApp.controller('projectQuestionsController', ['$q', '$scope', '$location', '$routeParams', '$route', '$cookies', '$http', 'projectService', 'userService', 'authService', function($q, $scope, $location, $routeParams, $route, $cookies, $http, projectService, userService, authService){
    
    if (authService.isLoggedIn() === false || $cookies.get('user') === false){
        authService.logout();
        $location.path('/login');
        $route.reload();
        
    }
    
    $scope.projectName = projectService.project;
    $scope.project = {};
    $scope.project.user = userService.user;
    $scope.submit = function(){
        var deferred = $q.defer();    
        //Submit to server for processing
        console.log($scope.project);
        $http.post('/api/v1.0/submitScores', $scope.project)
        .success(function(data, status) {
            //console.log(data.status);
            if(status === 200 && data.status){
                deferred.resolve();
            }else {
                deferred.reject();
            }
        })
        .error(function(data){
            deferred.reject();
        });
        return deferred.promise;
    };
}]);
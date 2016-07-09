trackerApp.controller('loginController', ['$scope', '$location', 'authService', function($scope, $location, authService){
    $scope.login = function(){
        
        $scope.error = false;
        $scope.disabled = true;
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


trackerApp.controller('logoutController', ['$scope', '$location', 'authService', function($scope, $location, authService){
    $scope.logout = function(){
        authService.logout()
        .then(function(){
            $location.path('/login');
        });
    };
}]);

trackerApp.controller('projectController', ['$scope', '$location', '$log', '$routeParams', 'projectService', function($scope, $location, $log, $routeParams, projectService){
    
    
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

trackerApp.controller('projectQuestionsController', ['$scope', '$location', '$routeParams', 'projectService', function($scope, $location, $routeParams, projectService){
    
    $scope.project = projectService.project;
    $scope.projectModel = [
        {
            header: "Ease of Use",
            fieldOne: "Usability",
            fieldOneModel: "projectModel.ease.usability",
            fieldTwo: "Web Accessibility",
            fieldTwoModel: "projectModel.ease.webaccess",
            commentModel: "project.ease.comment"
        }];
    $scope.submit = function(){
        
        console.log("submitted");
    }
}]);
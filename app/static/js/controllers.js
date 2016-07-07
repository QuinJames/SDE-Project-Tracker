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

trackerApp.controller('projectController', ['$scope', '$location', function($scope, $location){
    
    $scope.projectList = ["HDA", "NPS Tracker", "Payroll Reporter"];
}]);
trackerApp.service('authService', ['$q', '$timeout', '$http', '$cookies', function($q, $timeout, $http, $cookies){
    
    var user = null;
    
    return ({
       isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getUserStatus: getUserStatus
    });
    
    function isLoggedIn(){
    if($cookies.get('user') === 'true') {
        return true;
    } else {
        return false;
    }
};
    
    function login(username, password) {
        var deferred = $q.defer();
        //send post request to server
        $http.post('/api/v1.0/login', {username: username, password:password})
        .success(function(data, status) {
            //console.log(data.status);
            if(status === 200 && data.status){
                user = true;
                $cookies.put('user', 'true');
                $cookies.put('username', username);
                deferred.resolve();
            }else {
                user = false
                deferred.reject();
            }
        })
        .error(function(data){
            user = false;
            $cookies.put('user', 'false');
            deferred.reject();
        });
        
        //console.log(user);
        deferred.promise.user = username;
        //console.log(deferred.promise);
        return deferred.promise;
    };
    
    function logout(){
        var deferred = $q.defer();
        
        $http.get('/api/v1.0/logout')
        .success(function(data){
            $cookies.put('user', 'false');
            user = false;
            deferred.resolve();
        })
        .error(function(data){
            $cookies.put('user', 'false');
            user = false;
            deferred.reject();
        });
        
        return deferred.promise;
    };
    
    function getUserStatus() {
        
    }return $http.get('/api/v1.0/status')
    .success(function(data) {
        if(data.status) {
            user = true;
        } else {
            user = false;
        }
    })
    .error(function(data) {
        user = false;
    });
    
}]);


trackerApp.service('projectService', function(){
    this.project = "";
});


trackerApp.service('userService', function(){
   this.user = ""; 
});


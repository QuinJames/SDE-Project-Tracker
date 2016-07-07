trackerApp.service('authService', ['$q', '$timeout', '$http', function($q, $timeout, $http){
    
    var user = null;
    
    return ({
       isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
    });
    
    function isLoggedIn(){
    if(user) {
        return true;
    } else {
        return false;
    }
}
    
    function login(username, password) {
        var deferred = $q.defer();
        //send post request to server
        $http.post('/api/v1.0/login', {username: username, password:password})
        .success(function(data, status) {
            console.log(data.status);
            if(status === 200 && data.status){
                user = true;
                deferred.resolve();
            }else {
                user = false
                deferred.reject();
            }
        })
        .error(function(data){
            user = false;
            deferred.reject();
        });
        
        //console.log(user);
        return deferred.promise;
    }
    
    function logout(){
        var deferred = $q.defer();
        
        $http.get('/api/v1.0/logout')
        .success(function(data){
            user = false;
            deferred.resolve();
        })
        .error(function(data){
            user = false;
            deferred.reject();
        });
        
        return deferred.promise;
    }
    
}]);


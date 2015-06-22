/* ==============================================================
 * module for the consumption data provided by the webServices
 * ==============================================================
 */

// creation module for connection
var app = angular.module('dataConn', []);


// factory building, for consuming the services
app.factory('$Wservices', function($http, $q){
	var data_factory = {};
	var deferred = undefined;
    var fd;

	// function to record user
    data_factory.registration = function(Registrationdata) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('registrationData', JSON.stringify(Registrationdata));

        $http.post('http://localhost:3000/users/registration', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            cosole.log('faild in function registration' + err);
        });

        return deferred.promise;
    }

	// function for logging user
    data_factory.login = function(loginData) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('loginData', JSON.stringify(loginData));

        $http.post('http://localhost:3000/users/login', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
             deferred.resolve(response);
        })
        .error(function(err){
             console.log('faild in function login' + err);
        });

        return deferred.promise;
    }

	// function to load the accomodation
    data_factory.Create_accomodation = function(accomodation, image) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('accomodationData', JSON.stringify(accomodation));
        fd.append('fileAcc', image);

        $http.post('http://localhost:3000/accomodation/create', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function loadAccomodation' + err);
        });

        return deferred.promise;
	}

    // function to Create the profile
    data_factory.Create_profile = function(profileData) {
        deferred = $q.defer();
        fd  = new FormData();
        fd.append('profileData', JSON.stringify(profileData));

        $http.post('http://localhost:3000/profile/load', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function CreateProfile' + err);
        });

        return deferred.promise;
    }

    // function to update the profile
    data_factory.Update_profile = function(profileData) {
        deferred = $q.defer();
        fd  = new FormData();
        fd.append('profileData', JSON.stringify(profileData));

        $http.post('http://localhost:3000/profile/update', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function UpdateProfile' + err);
        });

        return deferred.promise;
    }
  
    // function to update the housing
    data_factory.Update_accomodation = function(accomodation, image) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('accomodationData', JSON.stringify(accomodation));
        fd.append('fileAcc', image);

        $http.post('http://localhost:3000/accomodation/update', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function loadAccomodation' + err);
        });

        return deferred.promise;
    }

    // function by which the profile is returned
    data_factory.GetProfile = function(idUsr) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('idacco', idUsr);

        $http.post('http://localhost:3000/profile/getProfile', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function getProfile' + err);
        });

        return deferred.promise;
    }

	// function to retrieve the user uploaded accommodation
    data_factory.Users_accomodation = function(idUsr) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('idacco', idUsr);

        $http.post('http://localhost:3000/accomodation/userAcc', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            
            deferred.resolve(data);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function Usersaccomodation' + err);
        });

        return deferred.promise;
    }

    // function by which the image of the property is returned
    data_factory.getImage = function(path) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('path', path);

        $http.post('http://localhost:3000/accomodation/getImages', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function getImage' + err);
        });

        return deferred.promise;
    }

	// function for filtered search
	data_factory.filter_accomodation = function(search) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('country', search.country);
        fd.append('state', search.state);
        fd.append('city', search.city);

        $http.post('http://localhost:3000/accomodation/findAcc', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function registration' + err);
        });

        return  deferred.promise;
    }
    
    // whereby a function stored like and comment
    data_factory.addLike_comments = function(idacc, likeComment) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('idacc', idacc);
        fd.append('likeComment', JSON.stringify(likeComment));
        
        $http.post('http://localhost:3000/likesComments/add', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function registration' + err);
        });

        return  deferred.promise;
    }
    
    // feature why are updated likes and comments
    data_factory.updateLike_comments = function(idacc, likeComment) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('idacc', idacc);
        fd.append('likeComment', JSON.stringify(likeComment));

        $http.post('http://localhost:3000/likesComments/update', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function registration' + err);
        });

        return  deferred.promise;
    }
    
    // function which are obtained likes and comments
    data_factory.getLikes_Comments = function(idacc) {
        deferred = $q.defer();
        fd = new FormData();
        fd.append('idacc', idacc);
        
        $http.post('http://localhost:3000/likesComments/getLikesComments', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err){
            deferred.resolve(false);
            console.log('faild in function registration' + err);
        });
        
        return  deferred.promise;
    }

	return data_factory;
});

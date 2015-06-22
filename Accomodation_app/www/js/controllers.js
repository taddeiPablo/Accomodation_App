/**
 * ===========================================================
 * Module through which all controllers are declared app
 * ===========================================================
*/
angular.module('starter.controllers', ['regular', 'dataConn'])

 //Controller main
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  // Form data for the registration modal
  $scope.registrationData = {};
  // Form data for the search modal
  $scope.search = {};
  // Form data for the count modal
  $scope.countData = {};
  // Form data for the comment modal
  $scope.comment = {};
  // Form accomodationDetails like
  $scope.like = {};
  

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.modal = modal;
  });

  // Create the registration modal that we will use later
  $ionicModal.fromTemplateUrl('templates/registration.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.mod = modal;
  });

   // Create the search modal that we will use later
  $ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.mod1 = modal;
  });

  // Create the commnets modal that we will use later
  $ionicModal.fromTemplateUrl('templates/comments.html', {
    scope: $scope
  }).then(function(modal) {
      $scope.mod2 = modal;
  });

  // Create the comment_list modal that we will use later
  $ionicModal.fromTemplateUrl('templates/comment_list.html', {
    scope: $scope
  }).then(function(modal){
      $scope.mod3 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
      $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
      $scope.modal.show();
  };
  
  // Open the registration modal
  $scope.registration = function() {
      $scope.mod.show();
  };

  // Triggered in the registration modal to close it
  $scope.closeRegistration = function() {
      $scope.mod.hide();
  };

  // Open the search modal
  $scope.search = function() {
    $scope.mod1.show();
  };

  $scope.closeSearch = function() {
      $scope.mod1.hide();
  };

  // Open the comment modal
  $scope.commentShow = function() {
    $scope.mod2.show();
  };

  $scope.closeComment = function() {
      $scope.mod2.hide();
  };
  
  // Open the list comment modal
  $scope.list_comment = function() {
    $scope.mod3.show();
  };

  $scope.closeList_comment = function() {
    $scope.mod3.hide();
  };
 
})

// Controller login
.controller('Form1', function($scope, $state, $location, $timeout, $ionicPopup, $rgEx, $Wservices, $rootScope) {
    $scope.error_email = false;
    $scope.error_pass = false;
    $scope.btn_disabled = false;
    $scope.validation_email_login;
    $scope.validation_pass_login;
    $scope.return_services;

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      if($scope.loginData.email == undefined &&
         $scope.loginData.password == undefined){
          $ionicPopup.alert({
              title: 'attention !',
              template: 'campos obligatorios'
          });
      }else{
            $scope.return_services = $Wservices.login($scope.loginData);
            $scope.return_services
                .then(function(data){
                    if(data == false){
                        $ionicPopup.alert({
                            title: 'attention !',
                            template: 'Usuario incorrecto !'
                        });
                    }else{
                        $rootScope.login = data;
                        $state.go('app.MainPanel');
                    }
                }, function(err){
                    $ionicPopup.alert({
                      title: 'attention !',
                      template: 'Se Perdio la conexion !'
                    });
                });
      }
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
          $scope.loginData.email = "";
          $scope.loginData.password = "";
          $scope.closeLogin();
      }, 1000);
    };

    // function to validate the email
    $scope.validation_email = function(values){
      if(!$rgEx.email(values)){
        $scope.error_email = true;
        $scope.btn_disabled = true;
        $scope.validation_email_login = "Invalid email !";
      }else{
        $scope.error_email = false;
        $scope.btn_disabled = false;
      }
    };

    // function to validate the password
    $scope.validation_password = function(values){
      if(!$rgEx.password(values)){
        $scope.error_pass = true;
        $scope.btn_disabled = true;
        $scope.validation_pass_login = "minimum 8 characters password !";
      }else{
        $scope.error_pass = false;
        $scope.btn_disabled = false;
      }
    };

})

// Controller registration
.controller('Form2', function($scope, $location, $timeout, $ionicPopup, $rgEx, $Wservices) {
    $scope.error_name = false;
    $scope.error_lastName = false;
    $scope.error_email = false;
    $scope.error_pass = false;
    $scope.btn_disabled = false;
    $scope.validation_email_registration;
    $scope.validation_pass_registration;
    $scope.return_services;

     // Perform the Registration action when the user submits the login form
    $scope.doRegistration = function() {
      if($scope.registrationData.email == undefined && 
         $scope.registrationData.password == undefined){
         $ionicPopup.alert({
            title: 'attention !',
            template: 'required fields !'
         });
      }else{
        $scope.return_services = $Wservices.registration($scope.registrationData);
        $scope.return_services
            .then(function(data){
                if(data) {
                  $ionicPopup.alert({
                    title: 'attention !',
                    template: 'Successful registration, you can now log in !'
                  });
                }else{
                  //validacion
                  $ionicPopup.alert({
                    title: 'attention !',
                    template: 'This username already exists !'
                  });
                }
            }, function(err){
                $ionicPopup.alert({
                    title: 'attention !',
                    template: 'ERROR : '+ err
                });
            });
      }
      $timeout(function() {
          $scope.registrationData.email = "";
          $scope.registrationData.password = "";
          $scope.registrationData.nameR = "";
          $scope.registrationData.lastname = "";
          $scope.closeRegistration();
      }, 1000);
    };


    // field validation email
    $scope.validation_email = function(values){
        if(!$rgEx.email(values)){
          $scope.error_email = true;
          $scope.btn_disabled = true;
          $scope.validation_email_registration = "Email is invalid !";
        }else{
          $scope.error_email = false;
          $scope.btn_disabled = false;
        }
    };

    // field validation password
    $scope.validation_pass = function(values){
        if(!$rgEx.password(values)){
          $scope.error_pass = true;
          $scope.btn_disabled = true;
          $scope.validation_pass_registration = "minimum 8 characters !";
        }else{
          $scope.error_pass = false;
          $scope.btn_disabled = false;
        }
    };

})

// Controller search
.controller('Form3', function($scope, $state, $location, $timeout, $ionicPopup, $rgEx, $Wservices, $rootScope){
    $scope.error_country = false;
    $scope.error_state = false;
    $scope.error_city = false;
    $scope.btn_disabled = false;
    $scope.validation_search;
    $scope.search;
    $scope.return_services;
    $scope.return_services1;
    $scope.result;

    // feature why finding an accommodation is made
    $scope.doSearch = function() {
      if($scope.search.country == undefined &&
         $scope.search.state == undefined &&
         $scope.search.city == undefined){
         $ionicPopup.alert({
            title: 'attention !',
            template: 'required fields !'
         });
      }else{
         $scope.return_services = $Wservices.filter_accomodation($scope.search);
         $scope.return_services
            .then(function(data){
                if(data != false) {
                   console.log(data);
                   $rootScope.array = data;
                   $state.go('app.result');
                }else {
                   $ionicPopup.alert({
                      title: 'attention !',
                      template: 'The search has not been successful !'
                   });
                }
            }, function(err){
                console.log('error' + err);
            });
      }
      $timeout(function() {
          $scope.search.country = "";
          $scope.search.state = "";
          $scope.search.city = "";
          $scope.closeSearch();
      }, 1000);
    };

    // function that brings all accommodation filtered
    $scope.init = function() {
        $scope.result = $rootScope.array;
    };

    // function for the selected accommodation list
    $scope.select = function(idObj) {
        $rootScope.object = $scope.result[idObj];
    };
    // field validation country
    $scope.validation_country = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_country = true;
            $scope.btn_disabled = true;
            $scope.validation_search = "Only characters !";
        }else{
            $scope.error_country = false;
            $scope.btn_disabled = false;
        }
    };

    // field validation state
    $scope.validation_state = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_state = true;
            $scope.btn_disabled = true;
            $scope.validation_search = "Only characters !";
        }else{
            $scope.error_state = false;
            $scope.btn_disabled = false;
        }
    };

    // field validation city
    $scope.validation_city = function(values) {
        if(!$rgEx.letters1(values)){
           $scope.error_city = true;
           $scope.btn_disabled = true;
           $scope.validation_search = "Only characters !";
        }else{
           $scope.error_city = false;
           $scope.btn_disabled = false;
        }
    };
})

// Controller accomodation
.controller('AccomodationControl', function($scope, $state, $location, $timeout, $ionicPopup, $rgEx, $Wservices, $rootScope){
    // fields validation accomodation
    $scope.error_country = false;
    $scope.error_states = false;
    $scope.error_cityAcc = false;
    $scope.error_AddressAcc = false;
    $scope.error_PhoneAcc = false;
    $scope.error_DimensionsAcc = false;
    $scope.validationAcc;
    // fields validation personal data
    $scope.error_name = false;
    $scope.error_lastName = false;
    $scope.error_email = false;
    $scope.error_document = false;
    $scope.error_PersonalPhone = false;
    // fields validation personal data
    $scope.validation_letters_PD;
    $scope.validation_numbers_PD;
    $scope.validation_email_PD;
    $scope.btn_disabled = false;
    // service
    $scope.return_services;
    // statement of objects
    $scope.accomodationData;
    $scope.personalData;
    // variables to determine operations buttons
    $scope.btnAction = "";
    $scope.btnActionAcc = "";
    // fields info image
    $scope.image_file;
    $scope.like;

    // function by which we obtain the profile data
    $scope.getProfile = function() {
        try{
            var usrId = $rootScope.login;
            if($scope.personalData == undefined){
                $scope.return_services = $Wservices.GetProfile(usrId);
                $scope.return_services
                    .then(function(data){
                        $scope.personalData = data;
                        if($scope.personalData != false) {
                            $scope.btnAction = "Update";
                        }else{
                            $scope.btnAction = "Save";
                            $ionicPopup.alert({
                                title: 'attention !',
                                template: 'Debe completar su perfil'
                            });  
                        }
                    }, function(err){
                        console.log('ERROR' + err);
                    });      
            }
        }catch(err){
            console.log('error' + err);
        }
    };
    // function by which we obtain housing data
    $scope.getAccomodation = function() {
         try{
             var usrId = $rootScope.login;
             if($scope.accomodationData == undefined){
                 $scope.return_services = $Wservices.Users_accomodation(usrId);
                 $scope.return_services
                    .then(function(data){
                        $rootScope.accomodation = data;
                        $scope.accomodationData = data;
                        console.log($scope.accomodationData);   
                        if($scope.accomodationData != false) {
                            $scope.btnActionAcc = "Update";
                            var ubication = $scope.accomodationData.address +', '+  $scope.accomodationData.city + ' ' + $scope.accomodationData.state + ' ' + $scope.accomodationData.country;
                            $scope.loadUbication(ubication);
                            $scope.getImage($scope.accomodationData.image.path);
                        }else{
                            $scope.loadUbication();
                            $scope.btnActionAcc = "Save";
                            $ionicPopup.alert({
                                title: 'attention !',
                                template: 'You must load your accomodation !'
                            });  
                        }
                    }, function(err){
                        console.log('error' + err);
                    });   
             }
         }catch(err){
            console.log('error' + err);
         }
    };
    // function by which the user feedback is obtained
    $scope.getComments_likes =  function() {
        try{
            if($rootScope.accomodation == false) {
                $ionicPopup.alert({
                    title: 'attention !',
                    template: 'You have no comments yet user !'
                });
            }else if($rootScope.accomodation == undefined) {
                var usrId = $rootScope.login;
                $scope.return_services = $Wservices.Users_accomodation(usrId);
                $scope.return_services
                    .then(function(data){
                        $rootScope.accomodation = data;
                        $scope.GetLikes_comments();
                    }, function(err){
                        console.log(err);
                    });
            }else{
                $scope.GetLikes_comments();
            }
        }catch(error){
            console.log('error' + error);
        }
    };
    // Ready function by which the user logged comments  
    $scope.GetLikes_comments = function() {
        $scope.return_services = $Wservices.getLikes_Comments($scope.accomodation._id);
        $scope.return_services
            .then(function(data){
                if(data){
                    $scope.like.cont = data.likes;
                    $rootScope.array_comment = data.comments;
                }
            }, function(err){
                console.log('error' + err);
            });
    };
    // function to display the user like me logged
    $scope.GetLikes = function() {
        $scope.return_services = $Wservices.getLikes($rootScope.accomodation._id);
        $scope.return_services
          .then(function(data){
              if(data){
                $scope.like.cont = data;
              }else{
                $scope.like.cont = 0;
              }
          }, function(err){
              console.log('error' + err);
          });
    };
    // function by which we obtain the image of the accommodation
    $scope.getImage = function(path) {
        try{
            $scope.return_services = $Wservices.getImage(path);
            $scope.return_services
               .then(function(data){
                   $('#img1').attr('src', 'data:img/png;base64,' + data);
                }, function(err){
                    console.log('error' + err);
                });
        }catch(err) {
            console.log('error' + err);
        }
    };
    // function by which the operations of creation and modification of the profile are made
    $scope.Crud_Profile = function() {
        try{
            var usrId = $rootScope.login;
            if($scope.btnAction == "Update"){
                $scope.personalData.idacco = usrId;
                $scope.return_services = $Wservices.Update_profile($scope.personalData);
                $scope.return_services
                  .then(function(data){
                      if(data) {
                         $ionicPopup.alert({
                            title: 'attention !',
                            template: 'actualizacion con exito'
                         });   
                      }
                  }, function(err){
                      console.log('error Update_profile' + err);
                  });
            }else if($scope.btnAction == "Save") {
                $scope.personalData.idacco = usrId;
                $scope.return_services = $Wservices.Create_profile($scope.personalData);
                $scope.return_services
                  .then(function(data){
                      if(data) {
                         $scope.btnAction = "Update";
                         $ionicPopup.alert({
                            title: 'attention !',
                            template: 'Alta con exito'
                         });
                      }
                  }, function(err){
                      console.log('error Create_profile' + err);
                  });
            }
        }catch(err) {
            console.log('error en Crud_Profile' + err);
        }
    };
    // function by which the creation and modification operations are performed accommodation
    $scope.Crud_accomodation = function() {
        try{
            var usrId = $rootScope.login;
            if($scope.btnActionAcc == "Update") {
               $scope.accomodationData.idacco = usrId;
               $scope.return_services = $Wservices.Update_accomodation($scope.accomodationData, $scope.image_file);
               $scope.return_services
                  .then(function(data){
                        if(data) {
                           $ionicPopup.alert({
                              title: 'attention !',
                              template: 'Actualizacion con exito'
                           }); 
                        }
                  }, function(err){
                      console.log('error Update_accomodation' + err);
                  });
            }else if($scope.btnActionAcc == "Save"){
               $scope.accomodationData.idacco = usrId;
               $scope.return_services = $Wservices.Create_accomodation($scope.accomodationData, $scope.image_file);
               $scope.return_services
                  .then(function(data){
                        if(data) {
                           $scope.btnActionAcc = "Update";
                           $ionicPopup.alert({
                              title: 'attention !',
                              template: 'Alta con exito'
                           });
                        }
                  }, function(err){
                      console.log('error Create_accomodation' + err);
                  });
            }
        }catch(err){
            console.log('error en la funcion Crud_accomodation' + err);
        }
    };
    // load function by which the location of the property on a map
    $scope.selectType = function() {
        var ubication = $scope.accomodationData.address +', '+ $scope.accomodationData.city + ' ' + $scope.accomodationData.state + ' ' + $scope.accomodationData.country;
        $scope.loadUbication(ubication);
    };
    // field validation name
    $scope.validation_name = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_name = true;
            $scope.btn_disabled = true;
            $scope.validation_letters_PD = "Only characters !";
        }else{
            $scope.error_name = false;
            $scope.btn_disabled = false;
        }
    };
    // field validation lastName
    $scope.validation_lastname = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_lastName = true;
            $scope.btn_disabled = true;
            $scope.validation_letters_PD = "Only characters !";
        }else{
            $scope.error_lastName = false;
            $scope.btn_disabled = false;
        }
    };
    // field validation document
    $scope.validation_document = function(values) {
        if(!$rgEx.numbers(values)){
           $scope.error_document = true;
           $scope.btn_disabled = true;
           $scope.validation_numbers_PD = "Only numbers !";
        }else{
           $scope.error_document = false;
           $scope.btn_disabled = false;
        }
    };
    // field validation email
    $scope.validation_EmailPd = function(values) {
        if(!$rgEx.email(values)){
           $scope.error_email = true;
           $scope.btn_disabled = true;
           $scope.validation_email_PD = "Incorrect Email !";
        }else{
           $scope.error_email = false;
           $scope.btn_disabled = false;
        }
    };
    // field validation PersonalPhone
    $scope.validation_personalPhone = function(values) {
        if(!$rgEx.numbers(values)){
           $scope.error_PersonalPhone = true;
           $scope.btn_disabled = true;
           $scope.validation_numbers_PD = "Only numbers !";
        }else{
           $scope.error_PersonalPhone = false;
           $scope.btn_disabled = false;
        }
    };  
    // field validation city
    $scope.validation_cityAcc = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_cityAcc = true;
            $scope.btn_disabled = true;
            $scope.validationAcc = "Only characters !";
        }else{
            $scope.error_cityAcc = false;
            $scope.btn_disabled = false;
        }
    };
    // field validation country
    $scope.validation_countryAcc = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_country = true;
            $scope.btn_disabled = true;
            $scope.validationAcc = "Only characters !";
        }else{
            $scope.error_country = false;
            $scope.btn_disabled = false;
        }
    };
    // field validation states
    $scope.validation_statesAcc = function(values) {
        if(!$rgEx.letters1(values)){
            $scope.error_state = true;
            $scope.btn_disabled = true;
            $scope.validationAcc = "Only characters !";
        }else{
            $scope.error_state = false;
            $scope.btn_disabled = false;
        }
    };
    // field validation addressAcc
    $scope.validation_addressAcc = function(values){
        if(!$rgEx.letters1(values)){
           $scope.error_AddressAcc = true;
           $scope.btn_disabled = true;
           $scope.validationAcc = "Only characters !";
        }else{
           $scope.error_AddressAcc = false;
           $scope.btn_disabled = false;
        }
    };
    // field validation dimensions of Accomodation
    $scope.validation_dimensionsAcc = function(values){
        if(!$rgEx.letters1(values)){
           $scope.error_AddressAcc = true;
           $scope.btn_disabled = true;
           $scope.validationAcc = "Only characters !";
        }else{
           $scope.error_AddressAcc = false;
           $scope.btn_disabled = false;
        }
    };
    // function by which the location of the property is shown on the map
    $scope.loadUbication = function(data){
        var direction = "1500 Main Street Springfield, MA 01115 P: (413) 700-5999";
        var geocoder = new google.maps.Geocoder();
        var address = direction;

        if(data != undefined){
          address = data.toString();
        }
        var mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  
        if (geocoder) {
          geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location);

              var infowindow = new google.maps.InfoWindow(
              {
                  content: address,
                  map: map,
                  position: results[0].geometry.location,
              });

              var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map, 
                title:address
              }); 
            } else {
              alert("No results found");
            }
          }
        });
      }
    };
    //Home
    $rootScope.home = function(){
        $location.path('#/app/playlists');
    };
    // Close the app
    $rootScope.close = function() {
        
    };
})

// Controller accomodationDetails
.controller('AccomodationDetails', function($scope, $location, $timeout, $ionicPopup, $Wservices, $rootScope){
    $scope.cont = 0;
    // objects
    $scope.accomodation;
    $scope.accomodation_result;
    $scope.personal_data;
    $scope.likeComment = {};
    $scope.likeComment.likes = 0;
    // services
    $scope.return_services;
    $scope.comments;
    $scope.array_acc;

    // function to display information, accommodation
    $scope.GetAccomodation = function() {
        $scope.accomodation_result = $rootScope.object;
        $scope.loadMap();
        $scope.getImage($scope.accomodation_result.image.path);
    };
    // function to get the image of the accommodation
    $scope.getImage = function(path) {
       console.log(path);
       $scope.return_services = $Wservices.getImage(path);
       $scope.return_services
          .then(function(data){
              $('#img1').attr('src', 'data:img/png;base64,' + data);
              $scope.getProfile();
          }, function(err){
              console.log('error' + err);
          });
    };
    // function by which we get the profile of the owner
    $scope.getProfile = function() {
        $scope.return_services = $Wservices.GetProfile($scope.accomodation_result.account_id);
        $scope.return_services
          .then(function(data){
              $scope.personal_data = data;
              $scope.getLikes_Comments();
          }, function(err){
              console.log(err);
          });
    };
    // function by which we get the likes and comments
    $scope.getLikes_Comments = function() {
        $scope.return_services = $Wservices.getLikes_Comments($scope.accomodation_result._id);
        $scope.return_services
            .then(function(data){
                if(data){
                    $rootScope.likes = data.likes;
                    $rootScope.array = data.comments;
                    $scope.commentCont = $rootScope.array.length;
                }else{
                    $rootScope.likes = 0;
                    $rootScope.array = [];
                }
            }, function(err){
                console.log('error' + err);
            });
    };
    // function by which likes saved
    $scope.crud_like = function() {
        if($rootScope.likes == 0){
            $rootScope.likes += 1;
            $scope.likeComment.likes = $rootScope.likes;
            $scope.return_services = $Wservices.addLike_comments($scope.accomodation_result._id, $scope.likeComment);
            $scope.return_services
             .then(function(data){
                console.log(data);
             }, function(err){
                console.log(err);    
             });
        }else{
            $rootScope.likes += 1;
            $scope.likeComment.likes = $rootScope.likes;
            $scope.return_services = $Wservices.updateLike_comments($scope.accomodation_result._id, $scope.likeComment);
            $scope.return_services
              .then(function(data){
                 console.log(data);
              }, function(err){
                 console.log(err);
              });
        }
    };
    // function to create comments
    $scope.crud_comment = function() {
        $scope.accomodation = $rootScope.object;
        $rootScope.array.push($scope.comments);
        console.log($rootScope.array);
        if($rootScope.likes != 0){
           $scope.likeComment.likes = $rootScope.likes;
           $scope.likeComment.comment = $scope.comments;
           $scope.return_services = $Wservices.updateLike_comments($scope.accomodation._id, $scope.likeComment);
           $scope.return_services
              .then(function(data){
                  if(data){
                    $rootScope.commentCont += 1;
                    $ionicPopup.alert({
                        title: 'attention !',
                        template: 'add comment successful !'
                    }); 
                  }else{
                    console.log(data + "fallo");
                  }
              }, function(err){
                  console.log(err);
              });
        }else if($rootScope.likes == 0 && $rootScope.array.length == 0) {
           $scope.return_services = $Wservices.addLike_comments($scope.accomodation._id, $scope.comments);
           $scope.return_services
              .then(function(data){
                  if(data){
                      $rootScope.commentCont += 1;
                      $ionicPopup.alert({
                        title: 'attention !',
                        template: 'add comment successful !'
                      }); 
                  }else{
                      console.log(data + 'fallo');
                  } 
              }, function(err){
                    console.log(err);
              });
        }else if($rootScope.likes == 0 && $rootScope.array.length != 0){
           $scope.likeComment.comment = $scope.comments;
           $scope.return_services = $Wservices.updateLike_comments($scope.accomodation._id, $scope.likeComment);
           $scope.return_services
              .then(function(data){
                  if(data){
                    $rootScope.commentCont += 1;
                    $ionicPopup.alert({
                        title: 'attention !',
                        template: 'add comment successful !'
                    }); 
                  }else{
                    console.log(data + "fallo");
                  }
              }, function(err){
                  console.log(err);
              });
        }
        $scope.closeComment();
    };
    // function by which the window opens add comments
    $scope.comment = function() {
        $scope.commentShow();
    };
    // function by which the list of comments shown
    $scope.Commentlist = function() {
        $scope.list_comment();
    };
    // function by which the information is loaded from the location on the map
    $scope.loadMap = function() {
        var ubication = $scope.accomodation_result.address +', '+ $scope.accomodation_result.city + ' ' +        $scope.accomodation_result.state + ' ' + $scope.accomodation_result.country;
        var geocoder = new google.maps.Geocoder();
        var address = ubication.toString();

        var mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  
        if (geocoder) {
          geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location);

              var infowindow = new google.maps.InfoWindow(
              {
                  content: address,
                  map: map,
                  position: results[0].geometry.location,
              });

              var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map, 
                title:address
              }); 
            } else {
              alert("No results found");
            }
          }
        });
      }
    };
})

// Controller listComments
.controller('commentL', function($scope, $ionicPopup, $Wservices){
    $scope.accomodation;
    $scope.return_services;
    $scope.array_acc;

})

// directive for handling image info
.directive('fileModel', ['$parse', function($parse){
  // Runs during compile
  return {
    restrict: 'A',
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

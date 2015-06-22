/* ======================================================
 *  module for regular expressions
 * ======================================================
 */

// creation module validations fields
var regularx = angular.module('regular', []);

// factory building, for the validation of the fields
regularx.factory('$rgEx', function(){
    var regularExpression = {}; 
    
    // function for field validation email
    regularExpression.email = function(email) {
    	var email_regx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{1,6})$/;
    	if(!email_regx.test(email)){
    		return false;
	    }else{
	    	return true;
	    }
    }
    
    // function to validate the password field
    regularExpression.password = function(pass) {
        var password_regx = /(?=^.{8,}$)/; 
        if(!password_regx.test(pass)){
        	return false;
        }else{
        	return true;
        }
    }

    // function to validate fields only letters
    regularExpression.letters1 = function(letter) {
    	var letter_regx = /[a-zA-Z]/;
    	if(!letter_regx.test(letter)){
    		return false;
    	}else{
    		return true;
    	}
    }

    // function to validate fields only numbers
    regularExpression.numbers = function(number) {
    	var number_regx = /[0-9]/;
    	if(!number_regx.test(number)){
    		return false;
    	}else{
    		return true;
    	}
    }

    // function type field to validate phone
    regularExpression.phones = function(values) {
        var phone_regx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{4})\2([0-9]{4})/;
        if(!phone_regx.test(values)){
            return false;
        }else{
            return true;
        }
    }
 
    return regularExpression;
});
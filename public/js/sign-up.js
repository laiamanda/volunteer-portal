const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

$(document).ready(function(){

    // Hide message
    $('#password').blur(function(){
        $('#message').css({'display': 'none'});
    });

    // Display Password Validation
    $('#password').focus(function(){
        $('#message').css({'display': 'block'});
    });


    $('#password').keyup(function(){
        const password = this.value;

        // Validate length
        if(password.length >= 8) {
            $('#length').removeClass('invalid');
            $('#length').addClass('valid');
        } else {
            $('#length').removeClass('valid');
            $('#length').addClass('invalid');
        }
        
        // Validate lowerCase
        if(password.match(lowerCaseLetters)) {
            $('#letter').removeClass('invalid');
            $('#letter').addClass('valid');
        } else {
            $('#letter').removeClass('valid');
            $('#letter').addClass('invalid');
        }

        // Validate UpperCase
        if(password.match(upperCaseLetters)) {
             $('#capital').removeClass('invalid');
            $('#capital').addClass('valid');
        } else {
            $('#capital').removeClass('valid');
            $('#capital').addClass('invalid');
        }

        // Validate numbers
        if(password.match(numbers)) {
            $('#number').removeClass('invalid');
            $('#number').addClass('valid');
        } else {
            $('#number').removeClass('valid');
            $('#number').addClass('invalid');
        }
    });
}) 
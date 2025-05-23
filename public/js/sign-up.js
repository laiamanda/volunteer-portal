// alert('Connected');
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

// password.onfocus = function() {
//     $('#message').style.display='block';
// }

$(document).ready(function(){
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
            console.log('It has lowercase');
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

        if(password.match(numbers)) {
            console.log('It has numbers');
            $('#number').removeClass('invalid');
            $('#number').addClass('valid');
        } else {
            console.log('No numbers');
            $('#number').removeClass('valid');
            $('#number').addClass('invalid');
        }
    });
}) 
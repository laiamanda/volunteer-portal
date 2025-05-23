// alert('Connected');
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;

$(document).ready(function(){
    $('#password').keyup(function(){
        const password = this.value;
        // Validate length
        if(password.length >= 8) {
            console.log('Good length');
        } else {
            console.log('Too short');
        }
        
        // Validate lowerCase
        if(password.match(lowerCaseLetters)) {
            console.log('It has lowercase');
        } else {
            console.log('No lowercase');
        }
    });
}) 
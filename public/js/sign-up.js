// alert('Connected');
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

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

        // Validate UpperCase
        if(password.match(upperCaseLetters)) {
            console.log('It has UpperCase');
        } else {
            console.log('No uppercase');
        }

        if(password.match(numbers)) {
            console.log('It has numbers');
        } else {
            console.log('No numbers');
        }
    });
}) 
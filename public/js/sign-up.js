// alert('Connected');

$(document).ready(function(){
    $('#password').keyup(function(){
        const password = this.value;
        console.log(password);
    });
})
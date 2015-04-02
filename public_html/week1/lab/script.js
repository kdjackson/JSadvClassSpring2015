
var form = document.querySelector('form');

form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault(); //form will not submit
    
    var fname = document.querySelector('input[name="fname"]');
    var fnameError = document.querySelector('.fnameError').classList;
    
    var isValid = true;
    
    if (fname.value === '') {
        fnameError.add('error');
        isValid = false;
    } else {
        fnameError.remove('error');
    }
    
    var lname = document.querySelector('input[name="lname"]');
    var lnameError = document.querySelector('.lnameError').classList;
    
    if (lname.value === '') {
        lnameError.add('error');
        isValid = false;
    } else {
        lnameError.remove('error');
    }
    
    var email = document.querySelector('input[name="email"]');
    var emailError = document.querySelector('.emailError').classList;
    
   
    if ( email.value === '' ) {
        emailError.add('error');
        isValid = false;
    } else {
        emailError.remove('error');
    }
    
    var phone = document.querySelector('input[name="phone"]');
    var phoneError = document.querySelector('.phoneError').classList;
    
    if (phone.value === '') {
        phoneError.add('error');
        isValid = false;
    } else {
        phoneError.remove('error');
    }
    
    if (isValid) {
        form.classList.add('hide');
        var conf = document.querySelector('#confirmation');
        
        var html = '<p> First Name: ' + fname.value + '</p>';
            html += '<p> Last Name: ' + lname.value + '</p>';
            html += '<p> Email: ' + email.value + '</p>';
            html += '<p> Phone: ' + phone.value + '</p>';
            
            conf.innerHTML = html;
    } 
    
    
}


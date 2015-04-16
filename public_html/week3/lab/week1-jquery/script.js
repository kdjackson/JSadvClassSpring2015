
var form = $('form');

form.on('submit', checkForm);

function checkForm(e) {
    e.preventDefault(); //form will not submit
    
    
    var fname = $('input[name="fname"]');
    var lname = $('input[name="lname"]');
    var email = $('input[name="email"]');  
    var phone = $('input[name="phone"]');   
    
    
    var fnameError = $('.fnameError');
    var lnameError = $('.lnameError');    
    var emailError = $('.emailError');   
    var phoneError = $('.phoneError'); 
    
    var isValid = true;
    
    //First Name
    if (fname.val() ===''){
        fnameError.addClass('error');
        isValid = false;
    } else {
        fnameError.removeClass('error');
    }
    
    //Last Name
    if (lname.val() === '') {
        lnameError.addClass('error');
        isValid = false;
    } else {
        lnameError.removeClass('error');
    }
        
   //email
    if ( email.val() === '' ) {
        emailError.addClass('error');
        isValid = false;
    } else {
        emailError.removeClass('error');
        
    }
    
    //Phone
    if (phone.val() === '') {
        phoneError.addClass('error');
        isValid = false;
    } else {
        phoneError.removeClass('error');
    }
    
    if (isValid) {
        form.addClass('hide');
        var conf = $('#confirmation');
        
        var html = '<p> First Name: ' + fname.val() + '</p>';
            html += '<p> Last Name: ' + lname.val() + '</p>';
            html += '<p> Email: ' + email.val() + '</p>';
            html += '<p> Phone: ' + phone.val() + '</p>';
            
            conf.html(html);
    } 
    
    
}


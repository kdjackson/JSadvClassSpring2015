
var form = document.querySelector('form');

form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault(); //form will not submit
    var email = document.querySelector('input[name="email"]');
    
    console.log('form submitted');
    
    console.log(email.value);
    if ( email.value === '' ) {
        
    }
    
    
}



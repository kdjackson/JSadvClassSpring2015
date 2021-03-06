
var form = document.querySelector('form');
var geocoder;


form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault(); //form will not submit
    
    var regexValidations = {        
                "fname" : /^[A-Z][a-zA-Z]*$/,                        
                "lname" : /^[A-Z][a-zA-Z]*$/,                
                "email" :/^[a-zA-Z0-9$]+[@]{1}[a-zA-Z]+[\.]{1}[a-zA-Z]{2,3}$/,                 
                "phone" : /^\(?([2-9]{1}[0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,                    
                "address1" : /^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$/,                        
                "address2" : /^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$/,                                
                "city" : /^[a-zA-Z]*$/,                        
                "state" : /^[a-zA-Z{2}]*$/,                        
                "zipcode" : /^\d{5}(?:[-\s]\d{4})?$/,                        
                "username" : /^[a-zA-Z0-9]*$/,                       
                "password" : /^[a-zA-Z0-9]*$/,
                "passwordConfirm" : /^[a-zA-Z0-9]*$/                                   
};
    

    var fields = document.querySelectorAll('form p');
    var isValid = true;

    var jsonData = {};

    var len = fields.length;
    for (var i = 0; i < len; i++) {
        var input = fields[i].querySelector('input');
        jsonData[input.name] = input.value;
        
        if (input.name === 'address2' && input.value === '') {
            fields[i].classList.remove('error');
            continue;
        }
          
        if (input.value === '' || !regexValidations[input.name].test(input.value) )  {
            fields[i].classList.add('error');
            isValid = false;
        } else {
            fields[i].classList.remove('error');
        }
  }


    if (jsonData.password !== jsonData.passwordConfirm) {
        document.querySelector('.passwordError').classList.add('error');
        document.querySelector('.passwordConfirmError').classList.add('error');
        isValid = false;
    }
    

   if (isValid) {
        form.classList.add('hide');
        console.log(jsonData);
//        var conf = document.querySelector('#confirmation');
//
//        var html = '<p> First Name: ' + jsonData.fname + '</p>';
//        html += '<p> Last Name: ' + jsonData.lname + '</p>';
//        html += '<p> Email: ' + jsonData.email + '</p>';
//        html += '<p> Phone: ' + jsonData.phone + '</p>';
//        html += '<p> Address 1: ' + jsonData.address1 + '</p>';
//        html += '<p> Address 2: ' + jsonData.address2 + '</p>';
//        html += '<p> City: ' + jsonData.city + '</p>';
//        html += '<p> State: ' + jsonData.state + '</p>';
//        html += '<p> Zipcode: ' + jsonData.zipcode + '</p>';
//        html += '<p> Username: ' + jsonData.username + '</p>';
//        html += '<p> Password: ' + jsonData.password + '</p>';
//        html += '<p> Password Confirmation: ' + jsonData.passwordConfirm + '</p>';
//
//        conf.innerHTML = html;
    }
    
        localStorage.setItem('jsonData', JSON.stringify(jsonData) );
        var savedData = localStorage.getItem('jsonData');
        
    
        console.log(savedData);
        console.log(JSON.parse(savedData));
            
        document.querySelector('#confirmation').classList.remove('hide');
            
            for (var key in jsonData) {
                //console.log(key + ": " + jsonData[key]);
                document.querySelector('#confirmation').innerHTML += key + ": " + jsonData[key] + "</br>";                 
            }
                var btnRemove = document.querySelector('input[name="delete"]');        
                btnRemove.addEventListener('click', removeData);

}



function removeData(e) {
       // e.preventDefault();
        
        localStorage.removeItem('jsonData');
        

    
}

function dataLoad() {
    
    var data = localStorage.getItem('jsonData');
    data = JSON.parse(data);
    if ( data ) {
        form.classList.add('hide');
        document.querySelector('#confirmation').classList.remove('hide');
        
        for (var key in data) {
                //console.log(key + ": " + jsonData[key]);
                document.querySelector('#confirmation').innerHTML += key + ": " + data[key] + "</br>";                 
            }
            var btnRemove = document.querySelector('input[name="delete"]');        
            btnRemove.addEventListener('click', removeData);
        
    } 
    
}

window.addEventListener('load', dataLoad);


function initialize() {
    geocoder = new google.maps.Geocoder();
    var zipcode = document.querySelector('input[name="zipcode"]');
    zipcode.addEventListener("blur", codeAddress);
}

google.maps.event.addDomListener(window, 'load', initialize);

function codeAddress() {
    var address = document.querySelector('input[name="zipcode"]').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            handleResults(results);
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function handleResults(results) {
    var geocodeObject = results[0];

    var len = geocodeObject.address_components.length;

    for (i = 0; i < len; i++) {
        if (geocodeObject.address_components[i].types.indexOf('locality') > -1) {
            console.log(geocodeObject.address_components[i].long_name);
            var city = document.querySelector('body > form > p.cityError > input[type="text"]');
            city.value = geocodeObject.address_components[i].long_name;
        }
        if (geocodeObject.address_components[i].types.indexOf('administrative_area_level_1') > -1) {
            console.log(geocodeObject.address_components[i].short_name);
            var state = document.querySelector('body > form > p.stateError > input[type="text"]');
            state.value = geocodeObject.address_components[i].short_name;
            
        }
    }
}


var form = $('form');
var geocoder;



form.on('submit', checkForm);

function checkForm(e) {
    e.preventDefault(); //form will not submit

    var fields = $('form p');
    var isValid = true;

    var jsonData = {};


    var len = fields.length;
    for (var i = 0; i < len; i++) {
        var input = fields[i].querySelector('input'); 
        jsonData[input.name] = input.value;

        if (input.value === '') {
            $(fields[i]).addClass('error');
            isValid = false;
        } else {
            $(fields[i]).removeClass('error');
        }
    }

    console.log(jsonData);
    
    

    if (jsonData.password !== jsonData.passwordConfirm) {
        $('.passwordError').addClass('error');
        $('.passwordConfirmError').addClass('error');
        isValid = false;
    }


    if (isValid) {
        form.addClass('hide');
        var conf = $('#confirmation');

        var html = '<p> First Name: ' + jsonData.fname + '</p>';
        html += '<p> Last Name: ' + jsonData.lname + '</p>';
        html += '<p> Email: ' + jsonData.email + '</p>';
        html += '<p> Phone: ' + jsonData.phone + '</p>';
        html += '<p> Address 1: ' + jsonData.address1 + '</p>';
        html += '<p> Address 2: ' + jsonData.address2 + '</p>';
        html += '<p> City: ' + jsonData.city + '</p>';
        html += '<p> State: ' + jsonData.state + '</p>';
        html += '<p> Zipcode: ' + jsonData.zipcode + '</p>';
        html += '<p> Username: ' + jsonData.username + '</p>';
        html += '<p> Password: ' + jsonData.password + '</p>';
        html += '<p> Password Confirmation: ' + jsonData.passwordConfirm + '</p>';

        conf.html( html );
    }
    
//    if (isValid) {
//        form.classList.add('hide');
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
//    }


}

//don't mess with this!

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

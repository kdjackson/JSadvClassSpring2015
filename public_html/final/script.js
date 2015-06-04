
var form = document.querySelector('form');

//set variable of save connected to ID saveData on index page
var save = document.querySelector('#saveData');
//when the save button is clicked run the checkForm function
save.addEventListener('click', checkForm);
//set variable of clear connected to ID clearData on index page
var clear = document.querySelector('#clearData');
//when the clear button is clicked run the clearData function
clear.addEventListener('click', clearData);
//set variable of delete connected to ID deleteLastRowData on index page
var del = document.querySelector('#deleteLastRowData');
//when the delete button is clicked run the delLastRow function
del.addEventListener('click', delLastRow);
//create an array
var arr2 = [];

function checkForm(e) {
    e.preventDefault(); //form will not submit
    //check to see if name, email and phone are in the correct format
    var regexValidations = {        
                "name" : /^[A-Z][a-zA-Z]*$/,                                       
                "email" :/^[a-zA-Z0-9$]+[@]{1}[a-zA-Z]+[\.]{1}[a-zA-Z]{2,3}$/,                 
                "phone" : /^[0-9]{3}[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/                   
    };    
    
    //set isValid to true to check validations
    var isValid = true;
    //set variable name connected to input name on index page
    var name = document.querySelector('input[name="name"]');
                //if the name field is empty or invalid format show error and set isvalid to false else do not show error and move on
                if (name.value === '' || !regexValidations['name'].test(name.value)) {
                    fullname_err.innerHTML="Please enter a valid name";
                    isValid = false;
                } else {
                    fullname_err.innerHTML="";
                }
    //set variable email connected to input email on index page           
    var email = document.querySelector('input[name="email"]');
                //if the email field is empty or invalid format show error and set isvalid to false else do not show error and move on
                if (email.value === '' || !regexValidations['email'].test(email.value)) {
                    email_err.innerHTML="Please enter a valid email";
                    isValid = false;
                } else {
                    email_err.innerHTML="";
                }
    //set variable phone connected to input phone on index page            
    var phone = document.querySelector('input[name="phone"]');
                //if the phone field is empty or invalid format show error and set isvalid to false else do not show error and move on
                if (phone.value === '' || !regexValidations['phone'].test(phone.value)) {
                    phone_err.innerHTML="Please enter a valid phone number";
                    isValid = false;
                } else {
                    phone_err.innerHTML="";
                }
    //set variable description connected to input description on index page            
    var description = document.querySelector('#description');
    //run stripHTML function
    description.value = strip_HTML(description.value);
                //if the description field is empty show error and set isvalid to false else do not show error and move on
                if (description.value === '') {
                    description_err.innerHTML="Please enter a valid description";
                    isValid = false;
                } else {
                    description_err.innerHTML="";
                }
    //if all above is valid continue on
    if (isValid){
    //set json variable    
    var json = {};

    //push values of name email phone and description to array    
    arr2.push({
        "name": name.value,
        "email": email.value,
        "phone": phone.value,
        "description": description.value
    });
        //clear out form
        name.value = "";
        email.value = "";
        phone.value = "";
        description.value = "";
    
        //set html to empty
        html = ""; 
        //set i = 0, while it is less than the length of the array do the following, increase i
        for (var i = 0; i < arr2.length; i++) {
            //
            name = arr2[i].name;                 
            email = arr2[i].email;
            phone = arr2[i].phone;
            description = arr2[i].description;   
            
            //output data into table
            html += '<tr><td>' + i + '</td><td>' + name + '</td><td>' + email + '</td><td>' + phone + '</td><td>' + description + '</td></tr>';        

            var table = document.querySelector('#tableData');
            table.innerHTML = html;
                 
        }
        //reset json to array
        json = arr2;
  
        //save data into the local storage                
        localStorage.setItem('json', JSON.stringify(json) );
        var savedData = localStorage.getItem('json');
            
        console.log(savedData);
        //get the json data
        console.log(JSON.parse(savedData));
        }

   
}
//clear any HTML in the description field
function strip_HTML(str) {
    
    var findHtml = /<(.|\n)*?>/gi;
    return str.replace(findHtml,"");
    
}

//load all data into the tables
function dataLoad(e) {
    e.preventDefault();
    html = ""; 
    var data = localStorage.getItem('json');
    data = JSON.parse(data);
    if ( data ) {
        document.querySelector('#tableData');
        arr2 = data;
        
        for (var key in data) {
                
            html += '<tr><td>' + key + '</td><td>' + data[key].name + '</td><td>' + data[key].email + '</td><td>' + data[key].phone + '</td><td>' + data[key].description + '</td></tr>'; ;                 
            var table = document.querySelector('#tableData');
            table.innerHTML = html;
        
        }

        
    } 
    
}
//when the windo starts call the dataload function
window.addEventListener('load', dataLoad);

//when button is clicked clear data from local storage and refresh table
function clearData(e) {
    e.preventDefault();
    localStorage.clear('json');
    var table = document.querySelector('#tableData');
    table.innerHTML = '';
    
}

//when button is clicked remove last item from local storage
function delLastRow(e) {
    e.preventDefault();
    arr2.pop();
 
    var data = JSON.stringify(arr2);
    localStorage.setItem('json', data);
    
    
    
}
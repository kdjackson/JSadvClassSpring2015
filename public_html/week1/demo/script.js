
var div = document.querySelector('div');

div.classList.add('error');

div.style.position = 'absolute';
div.style.top = '50px';
div.style.zIndex = '3';
div.style.paddingLeft = '2em';

function hide() {
    //div.style.display = 'none';
    div.classList.remove('show');
    div.classList.add('hide');
}

function show() {
    div.classList.remove('hide');
    div.classList.add('show');
}

//select by ID attribute
var btnHide = document.querySelector('#hide');

//select by class attribute
var btnShow = document.querySelector('.btn-show');

btnHide.addEventListener('click', hide); //links to the function hide

btnShow.addEventListener('click', show); //links to the fucntion show
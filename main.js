let secret = document.querySelector('.header__text');
let hidden = document.querySelector('.hidden');

secret.addEventListener('click', function(){
    hidden.style.display = "block";
});

hidden.addEventListener('click', function(){
    hidden.style.display = "none";
});
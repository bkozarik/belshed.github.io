let secret = document.querySelector('.header__text');
let modal = document.querySelector('.modal');

secret.addEventListener('click', function(){
    modal.style.display = "block";
});

modal.addEventListener('click', function(){
    modal.style.display = "none";
});
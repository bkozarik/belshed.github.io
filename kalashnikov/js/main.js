document.addEventListener('DOMContentLoaded', function(){
    const header = document.querySelector('.js-header');

    const scrollHandler = () => {
        window.pageYOffset >= 60 ? header.classList.add('fixed') : header.classList.remove('fixed');
    }

    window.addEventListener('scroll', scrollHandler);
});
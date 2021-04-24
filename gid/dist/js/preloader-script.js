window.onload = () => {
    const preloader = document.querySelector('.js-preloader');
    const header = document.querySelector('.js-header');

    setTimeout(() => {
        preloader.querySelector('.preloader__video').style.maxWidth = header.querySelector('.header__logo').getBoundingClientRect().width + 50 + 'px';
        preloader.classList.add('loaded');
    }, 1000);
};
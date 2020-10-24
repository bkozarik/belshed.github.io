document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.js-burger');
    const menuItems = document.querySelectorAll('.js-menu-item');

    const burgerBtnClick = () => {
        burgerBtn.classList.toggle('active');

        menuItems.forEach((item, index) => {
            item.classList.toggle('active');
            item.style.top = item.classList.contains('active') ? document.querySelector('.header').getBoundingClientRect().height + index * item.getBoundingClientRect().height + "px" : "0px";
        });
    }

    burgerBtn.addEventListener('click', burgerBtnClick);

});
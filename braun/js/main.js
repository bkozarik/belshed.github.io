document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.js-burger');
    const menuItems = document.querySelectorAll('.js-menu-item');

    const toggleMenu = (state = null) => {
        if(typeof(state) == 'object'){
            return () => {
                burgerBtn.classList.toggle('active');

                menuItems.forEach((item, index) => {
                    item.classList.toggle('active');
                    item.style.top = item.classList.contains('active') ? document.querySelector('.header').getBoundingClientRect().height + index * item.getBoundingClientRect().height + "px" : "0px";
                });

                document.addEventListener('click', () => {
                    let target = event.target;
        
                    if(!target.classList.contains('js-menu-item') && !target.classList.contains('js-burger')){
                        toggleMenu(false);
                    }
                });
            }
        }
        else{
            state ? burgerBtn.classList.add('active') : burgerBtn.classList.remove('active');

            menuItems.forEach((item, index) => {
                state ? item.classList.add('active') : item.classList.remove('active');
                item.style.top = state ? document.querySelector('.header').getBoundingClientRect().height + index * item.getBoundingClientRect().height + "px" : '0px';
            });
        }
    }

    new WOW().init();

    burgerBtn.addEventListener('click', toggleMenu());

});
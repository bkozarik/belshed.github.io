document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const burgerBtn = document.querySelector('.js-burger');
    const menuItems = document.querySelectorAll('.js-menu-item');
    const scrollLinks = document.querySelectorAll('.js-scroll-link');

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

    const wowInit = () => {
        new WOW().init();
    }

    const scrollHandler = () => {
        window.pageYOffset > 100 ? header.classList.add('scrolled') : header.classList.remove('scrolled');

    }

    const scrollLinkClick = () => {
        event.preventDefault();

        let link = event.target;
        let href;

        while(!link.classList.contains('js-scroll-link')){
            link = link.parentNode;
        }
        
        href = link.getAttribute('href');
        document.querySelector(href).scrollIntoView({'behavior': 'smooth'});
    }

    window.addEventListener('scroll', scrollHandler);
    burgerBtn.addEventListener('click', toggleMenu());

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));

    wowInit();
});
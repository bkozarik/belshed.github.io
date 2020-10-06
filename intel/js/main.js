document.addEventListener('DOMContentLoaded', () => {
    let scrollLinks = document.querySelectorAll('.js-scroll-link');
    let menuTriggers = document.querySelectorAll('.js-menu-trigger');
    let menu = document.querySelector('.js-menu');

    const scrollLinkClick = () => {
        event.preventDefault();

        let link = event.target;
        let linkHref = link.getAttribute('href');

        document.querySelector(linkHref).scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });

        toggleMenu(false);
    }

    const toggleMenu = (state = null) => {
        let menuBtn = document.querySelector('.burger.js-menu-trigger');

        typeof(state) == 'object' ? state = null : state = state;
        
        if(state == true){
            menuBtn.classList.add('active');
            menu.classList.add('active');
        }
        else if(state == false){
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        }
        else{
            menuBtn.classList.toggle('active');
            menu.classList.toggle('active');
        }
    }

    const resizeHandler = () => {
        if(window.innerWidth <= 940){
            menu.appendChild(document.querySelector('.nav'));
        }
        else{
            document.querySelector('.header__wrap').appendChild(document.querySelector('.nav'));
            toggleMenu(false);
        }
    }

    const scrollHandler = () => {
        window.pageYOffset > 100 ? document.querySelector('.header').classList.add('scrolled') : document.querySelector('.header').classList.remove('scrolled');
    }

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));

    menuTriggers.forEach(trgger => trgger.addEventListener('click', toggleMenu));

    window.addEventListener('resize', resizeHandler);

    window.addEventListener('scroll', scrollHandler);

    resizeHandler();
});
document.addEventListener('DOMContentLoaded', () => {
    let formTriggers = document.querySelectorAll('.open_form');
    let nofearTriggers = document.querySelectorAll('.open_nofear');
    let closeFormsTriggers = document.querySelectorAll('.popup__close');
    let scrollableLinks = document.querySelectorAll('.scroll_link');
    let burgerBtn = document.querySelector('.open_menu');

    const toggleMenu = (state=undefined) => {

        const menu = document.querySelector('.menu');
        if(state == undefined){
            if(burgerBtn.classList.contains('active')){
                burgerBtn.classList.remove('active');
                menu.classList.remove('active');
            }
            else{
                burgerBtn.classList.add('active');
                menu.classList.add('active');
            }
        }
        else{
            if(state){
                burgerBtn.classList.add('active');
                menu.classList.add('active');
                
                return;
            }
            burgerBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    }

    const scrollLinkClick = () => {
        event.preventDefault();

        toggleMenu();

        let target = event.target;

        const id = target.getAttribute('href');
        
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    const openForm = () => {
        event.preventDefault();

        toggleMenu(false);

        let popupBg = document.querySelector('.popup__bg');
        let popupForm = document.querySelector('.popup__registration');

        popupBg.classList.add('active');
        popupForm.classList.add('active');
    }

    const openNoFear = () => {
        event.preventDefault();

        toggleMenu(false);

        let popupBg = document.querySelector('.popup__bg');
        let popupNoFear = document.querySelector('.popup__nofear');

        popupBg.classList.add('active');
        popupNoFear.classList.add('active');
    }

    const closePopups = () => {
        event.preventDefault();

        let popups = document.querySelectorAll('.popup');
        let popupBg = document.querySelector('.popup__bg');

        popups.forEach(item => {
            item.classList.remove('active');
        });

        popupBg.classList.remove('active');
    }

    const resizeHandler = () => {
        let nav = document.querySelector('.header__nav');
        let headerBtn = document.querySelector('.header__button');

        if( window.innerWidth < 970){

            let mobileMenu = document.querySelector('.menu');

            mobileMenu.appendChild(nav);
            mobileMenu.appendChild(headerBtn);
        }
        else{
            document.querySelector('.header__menu').appendChild(nav);
            document.querySelector('.header__wrap').appendChild(headerBtn);
            
            toggleMenu(false);
        }
    }
    
    const scrollHandler = () => {
        let yOffset = window.pageYOffset;
        let header = document.querySelector('.header');
        let main = document.querySelector('.main');

        if(yOffset > 0){
            header.classList.add('fixed');
            main.classList.add('fixed');
        }
        else{
            header.classList.remove('fixed');
            main.classList.remove('fixed');
        }
    }

    scrollHandler();
    resizeHandler();
    
    burgerBtn.addEventListener('click', toggleMenu);

    scrollableLinks.forEach(item => {
        item.addEventListener('click', scrollLinkClick);
    });

    formTriggers.forEach(item => {
        item.addEventListener('click', openForm);
    });

    nofearTriggers.forEach(item => {
        item.addEventListener('click', openNoFear);
    });

    closeFormsTriggers.forEach(item => {
        item.addEventListener('click', closePopups);
    });

    window.addEventListener('scroll', scrollHandler);

    window.addEventListener('resize', resizeHandler);
});
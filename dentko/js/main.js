document.addEventListener('DOMContentLoaded', () => {
    let popupTriggers = document.querySelectorAll('.popup-request-open');
    let popupCloseTriggers = document.querySelectorAll('.popup-close');
    let popups = document.querySelectorAll('.popup');
    let popupSucsessTrigger = document.querySelectorAll('.popup-sucsess-open');
    let menuBtn = document.querySelector('.menu-open');

    const toggleMenu = () => {
        event.preventDefault();

        let target = event.target;
        let mobileMenu = document.querySelector('.mobile-menu');

        target.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }

    const scrollHandler = () => {
        let header = document.querySelector('.header');
        let mobileMenu = document.querySelector('.mobile-menu');

        if(window.pageYOffset > 0){
            header.classList.add('fixed');
            mobileMenu.style.paddingTop = "60px";
        }
        else{
            header.classList.remove('fixed');
            mobileMenu.style.paddingTop = "80px";
        }
    }

    const mobileCheck = () => {
        let headerItems = document.querySelectorAll('.header__item');

        if(window.innerWidth <= 1100){
            let mobileMenuContainer = document.querySelector('.mobile-menu');

            headerItems.forEach(item => {
                mobileMenuContainer.appendChild(item);
            });
        }
        else{
            let menuWrap = document.querySelector('.header__wrap');

            headerItems.forEach(item => {
                menuWrap.appendChild(item);
            });
        }

        if(window.innerWidth <= 990){
            let mobileMenuContainer = document.querySelector('.mobile-menu');
            let navBar = document.querySelector('.nav');

            mobileMenuContainer.insertBefore(navBar, headerItems[0]);
            mobileMenuContainer.insertBefore(headerItems[headerItems.length - 1], headerItems[headerItems.length - 2]);
            document.querySelector('.mobile-menu .header__dropdown-span img').setAttribute('src', './img/info-w.svg');

        }
        else{
            let header = document.querySelector('.header');
            let navBar = document.querySelector('.nav');

            header.after(navBar);
        }
    }

    const openPopup = (popupSelector) => { // Открывается попап с переданным спец-классом
        return () => {
            event.preventDefault();

            let popup = document.querySelector(popupSelector);
            let popupItem = popup.children[0];

            closePopup();

            popup.classList.add('active');
            popupItem.classList.add('active');
        }
    }

    const closePopup = () => { // Закрываются все попапы
        event.preventDefault();

        popups.forEach(item => {
            item.classList.remove('active');
            item.parentElement.classList.remove('active');
        });
    }

    menuBtn.addEventListener('click', toggleMenu);

    popupTriggers.forEach(item => {
        item.addEventListener('click', openPopup('.popup-request'));
    });

    popupSucsessTrigger.forEach(item => {
        item.addEventListener('click', openPopup('.popup-sucsess'));
    });

    popupCloseTriggers.forEach(item => {
        item.addEventListener('click', closePopup);
    });

    window.addEventListener('scroll', () => {
        scrollHandler();
    });

    window.addEventListener('resize', () => {
        mobileCheck();
    });

    mobileCheck();
    scrollHandler();
});
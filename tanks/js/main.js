document.addEventListener('DOMContentLoaded', () => {
    let faqItems = document.querySelectorAll('.faq__question');
    let headerLinks = document.querySelectorAll('.header__link');
    let tables = document.querySelectorAll('.table');
    let tabHeaders = document.querySelectorAll('.rating__tab-header');
    let tabs = document.querySelectorAll('.rating__tab');
    let loginBtn = document.querySelectorAll('.header__button');
    let popupClose = document.querySelectorAll('.popup__close');
    let mobileMenuContainer = document.querySelector('.mobile');
    let menu = document.querySelector('.header__nav');
    let footerMenu = document.querySelector('.footer .header__nav');
    let footerMenuWrap = document.querySelector('.footer .header__wrap');
    let header = document.querySelector('.header');
    let main = document.querySelector('.main');
    let burger = document.querySelector('.header__burger');
    let loginWrapper = document.querySelector('.header__login');
    let popups = document.querySelectorAll('.popup');

    let mobileCheck = () => {
        if(window.innerWidth <= 1000){
            
            mobileMenuContainer.appendChild(menu);
            mobileMenuContainer.appendChild(loginBtn[0]);
        }
        else{
            let menuWrap = document.querySelector('.header__menu');

            menuWrap.appendChild(menu);
            document.querySelector('.header__login').prepend(loginBtn[0]);
        }

        if(window.innerWidth <= 880){
            footerMenuWrap.before(footerMenu);
        }
        else{
            document.querySelector('.footer .header__menu').appendChild(footerMenu);
        }
    }

    let popupCloseClick = () => {

        event.preventDefault();

        let popupWrapper = document.querySelector('.popup__wrapper');
        let popups = document.querySelectorAll('.popup');

        popupWrapper.classList.remove('show');

        popups.forEach(item => {
            item.classList.remove('show');
        });
    }

    let loginClick = () => {
        
        let popupWrapper = document.querySelector('.popup__wrapper');
        let loginPopupn = document.querySelector('.popup_login');

        let popups = document.querySelectorAll('.popup');

        popups.forEach(item => {
            item.classList.remove('show');
        });

        popupWrapper.classList.add('show');
        loginPopupn.classList.add('show');
    }

    let faqItemClick = () => {

        let target = event.target;

        while(!target.classList.contains('faq__question')){

            target = target.parentElement;
        }

        if(target.classList.contains('active')){
            
            target.classList.remove('active');
            return;
        }

        target.classList.add('active');
    }

    let headerLinkClick = () => {

        let target = event.target;

        event.preventDefault();

        const id = target.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    let replaceTabHeaders = () => {

        let tabsContainer = document.querySelector('.rating__tab-headers');
        let tabs = document.querySelectorAll('.rating__tab-header');

        if(window.innerWidth <= 700){

            tabs.forEach(item => {
                
                if(item.classList.contains('active')){
                    tabsContainer.appendChild(item);
                }
            });
        }
        else{
            tabs.forEach(item => {

                if(Number(item.dataset.pos) == 0){
                    tabsContainer.prepend(item);
                }
                else if(Number(item.dataset.pos) == 2){
                    tabsContainer.appendChild(item);
                }
            });
        }
    }

    let tabHeaderClick = (index) => {
        return () => {
            tabHeaders.forEach(item => {
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                }
            });

            tabs.forEach(item => {
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                }
            });

            tabHeaders[index].classList.add('active');
            tabs[index].classList.add('active');

            replaceTabHeaders();
        }
    }

    let tabsInit = () => {
        tabHeaders[0].classList.add('active');
        tabs[0].classList.add('active');
    }

    tables.forEach(item => {
        let rows = item.querySelectorAll('tr');
        rows.forEach((element, index) => {
            let place = element.querySelector('td');

            if(index > 0){
                place.innerHTML = index;
            }
            
            if (index == 1){
                place.innerHTML = '<img src="./img/first-ico.png" alt="Иконка">';
            }
            else if (index == 2){
                place.innerHTML = '<img src="./img/second-ico.png" alt="Иконка">';
            }
            else if (index == 3){
                place.innerHTML = '<img src="./img/third-ico.png" alt="Иконка">';
            }

            if((index > 0) && (index <= 5)){
                element.style.backgroundColor = '#b8571f0a';
            }
            else if ((index > 5) && (index <= 20)){
                element.style.backgroundColor = '#8181810a';
            }
        });
    });

    let scrollHandler = () => {
        let yOffset = window.pageYOffset;
        
        if(yOffset > 0){
            header.classList.add('fixed');
            main.classList.add('fixed');
            mobileMenuContainer.style.padding = '57px 0px 0px 20px';
        }
        else{
            header.classList.remove('fixed');
            main.classList.remove('fixed');
            mobileMenuContainer.style.padding = '100px 0px 0px 20px';
        }
    }

    let burgerClick = (event) => {
        event.preventDefault();

        if(burger.classList.contains('active')){
            burger.classList.remove('active');
            mobileMenuContainer.classList.remove('active');
            return;
        }

        burger.classList.add('active');
        mobileMenuContainer.classList.add('active');
    }

    if(loginWrapper.classList.contains('isLogged')){
        
        loginBtn.forEach(item => {
            item.style.display = 'none';
        });
    }

    tabsInit();
    mobileCheck();
    replaceTabHeaders();

    window.addEventListener('resize', () => {
        mobileCheck();
        replaceTabHeaders();
    });

    document.querySelector('.popup_login .popup__link').addEventListener('click', () => {
        event.preventDefault();

        popups[0].classList.remove('show');
        popups[1].classList.add('show');
    });

    document.querySelector('.popup_checkin .popup__link').addEventListener('click', () => {
        event.preventDefault();

        popups[1].classList.remove('show');
        popups[0].classList.add('show');
    });

    document.querySelectorAll('.button_battle').forEach(item => {
        item.addEventListener('click', () => {
            let popupWrapper = document.querySelector('.popup__wrapper');
    
            popups.forEach(item => {
                item.classList.remove('show');
            });
    
            popupWrapper.classList.add('show');
            popups[2].classList.add('show');
            popups[3].classList.add('show');
        });
    });

    window.addEventListener('scroll', scrollHandler);
    burger.addEventListener('click', burgerClick);
    loginBtn.forEach( item => item.addEventListener('click', loginClick));
    popupClose.forEach( item => item.addEventListener('click', popupCloseClick));
    faqItems.forEach( item => item.addEventListener('click', faqItemClick));
    headerLinks.forEach( item => item.addEventListener('click', headerLinkClick));
    tabHeaders.forEach( (item, index) => item.addEventListener('click', tabHeaderClick(index)));
});
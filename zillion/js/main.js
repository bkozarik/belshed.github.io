document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.js-menu');
    const burger = document.querySelector('.js-burger');

    const unrollBtns = document.querySelectorAll('.js-button-more');

    const requestOpen = document.querySelectorAll('.js-open-request');
    const popupCloseBtns = document.querySelectorAll('.js-popup-close');

    const forms = document.querySelectorAll('form');

    const whichPage = () => {
        const pageIdentifier = document.querySelector('.js-page-identifier');

        return pageIdentifier.dataset.page;
    }

    const unrollBtnClick = () => {
        const button = event.target;
        const targetSelector = button.dataset.target;

        const targetNode = document.querySelector(`.${targetSelector}`);

        targetNode.classList.toggle('active');

        button.innerText = targetNode.classList.contains('active') ? 'less news' : 'more news';
    }

    const scrollHandler = () => {
        window.pageYOffset > 40 ? document.querySelector('.header').classList.add('fixed') : document.querySelector('.header').classList.remove('fixed');

    }

    const resizeHandler = () => {
        if(window.innerWidth <= 880){
            if(whichPage() == 'about'){
                document.querySelector('.about-page__top').insertBefore(document.querySelector('.js-about-img'), document.querySelector('.js-about-mobile-target'));
            }
        }
        else{
            if(whichPage() == 'about'){
                document.querySelector('.about-page__top').prepend(document.querySelector('.js-about-img'));
            }
        }

        if(window.innerWidth >= 980) toggleMenu(false);
    }

    const closePopup = () => {
        const popupOverlay = document.querySelector('.js-popup-overlay');

        popupOverlay.classList.remove('active');
        popupOverlay.querySelectorAll('.popup').forEach(popup => popup.classList.remove('active'));
    }

    const togglePopup = (selector, state = null) => {
        const targetPopup = document.querySelector(selector);
        const popupOverlay = document.querySelector('.js-popup-overlay');


        if(state === null){
            return () => {
                toggleMenu(false);
                targetPopup.classList.add('active');
                popupOverlay.classList.add('active');
    
                popupOverlay.addEventListener('click', () => {
                    if(event.target.classList.contains('js-popup-overlay')){
                        closePopup();
                    }
                });
            }
        }
        else if(state === true) {
            targetPopup.classList.add('active');
            popupOverlay.classList.add('active');
        }
        else{
            targetPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
        }
        toggleMenu(false);

        popupOverlay.addEventListener('click', () => {
            if(event.target.classList.contains('js-popup-overlay')){
                closePopup();
            }
        });
    }

    const formSubmitHandler = () => {

        event.preventDefault();

        const targetForm = event.target;
        const url = '';

        const formData = new FormData(targetForm);

        // fetch(url, {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => {
            // targetForm.reset();
            // closePopup();
            // togglePopup('.js-popup-thx', true);
            // setTimeout(closePopup, 2000);
        // });

        targetForm.reset();
        closePopup();
        togglePopup('.js-popup-thx', true);
        setTimeout(closePopup, 2000);
    }

    const toggleMenu = (state = null) => {
        if(typeof(state) == 'object'){
            return () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
            }
        }
        else{
            state ? menu.classList.add('active') : menu.classList.remove('active');
            state ? burger.classList.add('active') : burger.classList.remove('active');
        }
    }

    unrollBtns.forEach( button => button.addEventListener('click', unrollBtnClick));

    popupCloseBtns.forEach( button => button.addEventListener('click', closePopup));
    requestOpen.forEach( button => button.addEventListener('click', togglePopup('.js-popup-request')));

    forms.forEach( button => button.addEventListener('submit', formSubmitHandler));

    burger.addEventListener('click', toggleMenu());

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    scrollHandler();
    resizeHandler();
});
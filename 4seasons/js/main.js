"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.js-menu');
    const menuClose = document.querySelector('.js-menu-close');
    const burger = document.querySelector('.js-burger');
    
    const popupTrigger = document.querySelectorAll('.js-popup-open');
    const popupCloseBtns = document.querySelectorAll('.js-popup-close');

    const form = document.querySelector('.js-form');

    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    const ratesItems = document.querySelectorAll('.rates__item');

    const scrollHandler = () => {
        window.pageYOffset > 40 ? document.querySelector('.header').classList.add('fixed') : document.querySelector('.header').classList.remove('fixed');
    }
    
    const resizeHandler = () => {
        if(window.innerWidth <= 1180){
            ratesItems.forEach(item => {
                item.appendChild(item.querySelector('.rates__name'));
                item.appendChild(item.querySelector('.rates__description'));
                item.appendChild(item.querySelector('.button_rates'));
            })
        }
        else{
            ratesItems.forEach(item => {
                item.querySelector('.rates__content').prepend(item.querySelector('.rates__description'));
                item.querySelector('.rates__content').prepend(item.querySelector('.rates__name'));
                item.querySelector('.rates__content').appendChild(item.querySelector('.button_rates'));
            })
        }
    }

    const closePopup = () => {
        const popupOverlay = document.querySelector('.js-popup-overlay');

        popupOverlay.classList.remove('active');
        popupOverlay.querySelectorAll('.popup').forEach(popup => popup.classList.remove('active'));
    }

    const timerInit = () => {
        const targetDate = new Date(2021, 0, 1, 0, 0, 0, 1);
        const currDate = new Date();
        const dateDifff = targetDate - currDate;
    }

    const togglePopup = (selector, state = null) => {
        const targetPopup = document.querySelector(selector);
        const popupOverlay = document.querySelector('.js-popup-overlay');


        if(state === null){
            return () => {
                // toggleMenu(false);
                targetPopup.classList.add('active');
                popupOverlay.classList.add('active');
    
                popupOverlay.addEventListener('click', () => {
                    if(event.target.classList.contains('js-popup-overlay')){
                        closePopup();
                    }
                });

                if(event.target.classList.contains('js-popup-open')){
                    form.querySelector('.js-form-hidden').value = event.target.dataset.apart;
                }
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
        // toggleMenu(false);

        popupOverlay.addEventListener('click', () => {
            if(event.target.classList.contains('js-popup-overlay')){
                closePopup();
            }
        });
    }

    const toggleMenu = (state = null) => {
        if(typeof(state) == 'object'){
            return () => {
                menu.classList.toggle('active');

                document.addEventListener('click', () => {
                    if(!event.target.classList.contains('js-menu') && !event.target.classList.contains('js-burger')){
                        toggleMenu(false);
                    }
                })
            }
        }
        else{
            state ? menu.classList.add('active') : menu.classList.remove('active');
            
            document.addEventListener('click', () => {
                if(!event.target.classList.contains('js-menu') && !event.target.classList.contains('js-burger')){
                    toggleMenu(false);
                }
            })
        }
    }

    const scrollLinkClick = () => {
        event.preventDefault();
        const offset = -100;

        let targetLink = event.target;

        while(!targetLink.classList.contains('js-scroll-link')){
            targetLink = targetLink.parentNode;
        }
        
        const href = targetLink.getAttribute('href');
        
        window.scrollTo({
            top: document.querySelector(href).offsetTop + offset,
            behavior: 'smooth'
        });
    }

    const submitHandler = async () => {
        event.preventDefault();
        const targetForm = event.target;

        const url = '';

        const formData = new FormData(targetForm);
        
        // await fetch(url, {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => {
        //     console.log(response);

        //     targetForm.reset();
        //     closePopup();
        //     togglePopup('.js-order', true);
        // });
        targetForm.reset();
        closePopup();
        togglePopup('.js-thx', true);
    }

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    popupCloseBtns.forEach( button => button.addEventListener('click', closePopup));
    popupTrigger.forEach(trigger => trigger.addEventListener('click', togglePopup('.js-order')))

    form.addEventListener('submit', submitHandler);

    burger.addEventListener('click', toggleMenu());
    menuClose.addEventListener('click', () => toggleMenu(false));

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    scrollHandler();
    resizeHandler();

    timerInit();
});
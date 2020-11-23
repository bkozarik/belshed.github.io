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

    const ratesItemsBtns = document.querySelectorAll('.js-rates-preview');

    const galleryImg = document.querySelectorAll('.gallery__img img');
    const galleryClose = document.querySelectorAll('.js-gallery-close');

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

    const ratesItemsBtnClick = () => {
        let button = event.target;

        while(!button.classList.contains('js-rates-preview')){
            button = button.parentNode;
        }
        const buttonSliderId = parseInt(button.dataset.sliderid);

        switch(buttonSliderId){
            case 1:
                const swiper_1 = document.querySelector('.js-slider-1');   
                let swiper_1_Swiper = new Swiper(swiper_1, {
                    centeredSlides: true,
                    slidesPerView: 2,
                    loop: true,
                }); 
                swiper_1.classList.add('active');
            break;
            
            case 2:
                const swiper_2 = document.querySelector('.js-slider-2');
                let swiper_2_Swiper = new Swiper(swiper_2, {
                    centeredSlides: true,
                    slidesPerView: 2,
                    loop: true,
                });
                swiper_2.classList.add('active');
            break;
            
            case 3:
                const swiper_3 = document.querySelector('.js-slider-3');
                let swiper_3_Swiper = new Swiper(swiper_3, {
                    centeredSlides: true,
                    slidesPerView: 2,
                    loop: true,
                });
                swiper_3.classList.add('active');
            break;
            
            case 4:
                const swiper_4 = document.querySelector('.js-slider-4');
                let swiper_4_Swiper = new Swiper(swiper_4, {
                    centeredSlides: true,
                    slidesPerView: 2,
                    loop: true,
                });
                swiper_4.classList.add('active');
            break;
            
            case 5:
                const swiper_5 = document.querySelector('.js-slider-5');
                let swiper_5_Swiper = new Swiper(swiper_5, {
                    centeredSlides: true,
                    slidesPerView: 2,
                    loop: true,
                });
                swiper_5.classList.add('active');
            break;
        }
    }

    const galleryImgClick = () => {
        const mainSwiper = document.querySelector('.js-slider-main');

        mainSwiper.classList.add('active');
    }

    const gallerySliderClose = () => {
        const swipers = document.querySelectorAll('.swiper');

        swipers.forEach(swiper => {
            swiper.classList.remove('active');
            if(swiper.classList.contains('swiper-container-initialized')){
                setTimeout(() => {
                    swiper.swiper.destroy();
                }, 300);
            }
        });
    }

    const mainSwiperInit = () => {
        let mainSwiper = new Swiper('.js-slider-main', {
            centeredSlides: true,
            slidesPerView: 2,
            loop: true,
        });
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
        
        await fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            console.log(response);

            targetForm.reset();
            closePopup();
            togglePopup('.js-order', true);
        });
        targetForm.reset();
        closePopup();
        togglePopup('.js-thx', true);
    }

    galleryImg.forEach(img => img.addEventListener('click', galleryImgClick));
    galleryClose.forEach(link => link.addEventListener('click', gallerySliderClose));

    ratesItemsBtns.forEach(link => link.addEventListener('click', ratesItemsBtnClick));

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

    mainSwiperInit();
    timerInit();
});
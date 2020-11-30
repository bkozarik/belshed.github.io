$(document).ready(() => {

    const popupBuyTrigger = $('.js-open-popup-buy');
    const popupTestdriveTrigger = $('.js-open-popup-testdrive');

    const popupCloseTrigger = $('.js-close-popup');

    const burger = $('.js-burger');
    const menu = $('.js-menu');

    const scrollHandler = () => {
        $(window).get(0).pageYOffset > 40 ? $('.header').addClass('fixed') : $('.header').removeClass('fixed');
    }

    const slidersInit = () => {
        let slider_1 = $('.js-slider-color').get(0);
        let slider_2 = $('.js-slider-examples').get(0);
        
        let slider_1_obj = new Swiper(slider_1, {
            slidesPerView: 1,
            speed: 700,
            navigation: {
                prevEl: '.slider__control_prev',
                nextEl: '.slider__control_next',
            },
            pagination: {
                el: '.slider__pagination.swiper-pagination',
                clickable: true,
            }
        });

        let slider_2_obj = new Swiper(slider_2, {
            slidesPerView: 1,
            speed: 700,
            navigation: {
                prevEl: '.slider__control_prev',
                nextEl: '.slider__control_next',
            },
            pagination: {
                el: '.slider__pagination.swiper-pagination',
                clickable: true,
            }
        });
    }

    const closePopup = () => {
        $('.popup__overlay').removeClass('active');
    }
    const closePopupByOverlay = () => {
        $(document).click(() => $(event.target).hasClass('popup__overlay') ? closePopup() : null);
    }

    const togglePopup = (selector, state = null) => {

        if(state == null){
            return () => {
                const targetPopup = $(selector);

                targetPopup.addClass('active');

                toggleMenu(false);
                closePopupByOverlay();
            };
        }
        else{
            state ? targetPopup.addClass('active') : targetPopup.removeClass('active');
            toggleMenu(false);

            closePopupByOverlay();
        }
    }

    const toggleMenu = (state = null) => {
        if(state == null){
            return () => {
                burger.toggleClass('active');
                menu.toggleClass('active');
            }
        }
        else{
            state ? burger.addClass('active') : burger.removeClass('active');
            state ? menu.addClass('active') : menu.removeClass('active');
        }
    }

    $(window).on('scroll', scrollHandler);
    
    popupCloseTrigger.click(closePopup);
    
    popupBuyTrigger.click(togglePopup('.js-popup-buy'));
    popupTestdriveTrigger.click(togglePopup('.js-popup-testdrive'));

    burger.click(toggleMenu());
    
    slidersInit();
});
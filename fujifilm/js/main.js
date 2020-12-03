$(document).ready(() => {

    const popupBuyTrigger = $('.js-open-popup-buy');
    const popupTableTrigger = $('.js-open-popup-table');
    const popupTestdriveTrigger = $('.js-open-popup-testdrive');

    const popupCloseTrigger = $('.js-close-popup');

    const burger = $('.js-burger');
    const menu = $('.js-menu');

    const scrollLinks = $('.js-scroll-link');

    const videos = $('video');

    const scrollHandler = () => {
        $(window).get(0).pageYOffset > 40 ? $('.header').addClass('fixed') : $('.header').removeClass('fixed');

        const offset = 200;

        videos.each(function(){
            $(this).find('source').each(function(){
                if($(this).data('src')){
                    console.log($(this).data('src'));
                }
            });
        });

        scrollLinks.each(function() {
            let linkRect = $($(this).attr('href')).get(0).getBoundingClientRect();

            linkRect.top < offset && linkRect.bottom > offset ? $(this).addClass('active') : $(this).removeClass('active');
        });
    }

    const resizeHandler = () => {
        const movingImg = $('.js-moving-img');

        if($(window).width() < 730){
            movingImg.insertAfter($('.js-moving-img-target'));
        }
        else{
            $('.js-moving-img-home').append(movingImg);
        }
    }

    const slidersInit = () => {
        let slider_1 = $('.js-slider-color').get(0);
        let slider_2 = $('.js-slider-examples').get(0);
        
        let slider_1_obj = new Swiper(slider_1, {
            slidesPerView: 1,
            speed: 700,
            watchSlidesVisibility: true,
            autoHeight: true,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
                loadPrevNext: true,
            },
            navigation: {
                prevEl: '.slider__control_prev',
                nextEl: '.slider__control_next',
            },
            pagination: {
                el: '.slider__pagination.swiper-pagination',
                type: 'bullets',
                clickable: true,
            }
        });

        let slider_2_obj = new Swiper(slider_2, {
            slidesPerView: 1,
            speed: 700,
            watchSlidesVisibility: true,
            autoHeight: true,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
                loadPrevNext: true,
            },
            navigation: {
                prevEl: '.slider__control_prev',
                nextEl: '.slider__control_next',
            },
            pagination: {
                dynamicBullets: true,
                el: '.slider__pagination.swiper-pagination',
                // dynamicMainBullets: 20,
                clickable: true,
            }
        });
    }

    const closePopup = () => {
        $('.popup__overlay').removeClass('active');
    }

    const closePopupByOverlayClick = () => {
        $(document).click(() => $(event.target).hasClass('popup__overlay') ? closePopup() : null);
    }

    const togglePopup = (selector, state = null) => {
        const targetPopup = $(selector);

        if(state == null){
            return () => {
                targetPopup.addClass('active');

                toggleMenu(false);
                closePopupByOverlayClick();
            };
        }
        else{
            state ? targetPopup.addClass('active') : targetPopup.removeClass('active');
            toggleMenu(false);

            closePopupByOverlayClick();
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

    const scrollLinkClick = () => {

        event.preventDefault();

        let targetLink = $(event.target);

        while(!targetLink.hasClass('js-scroll-link')){
            targetLink = targetLink.parent();
        }

        const targetId = targetLink.attr('href');
        const targetTopOffset = $(targetId).offset().top;

        const headerOffset = 100;

        scrollLinks.removeClass('active');
        targetLink.addClass('active');

        $('body,html').animate({scrollTop: targetTopOffset - headerOffset}, 700);

    }

    $(window).scroll(scrollHandler);
    $(window).resize(resizeHandler);
    
    popupCloseTrigger.click(closePopup);
    
    popupBuyTrigger.click(togglePopup('.js-popup-buy'));
    popupTableTrigger.click(togglePopup('.js-popup-table'));
    popupTestdriveTrigger.click(togglePopup('.js-popup-testdrive'));

    burger.click(toggleMenu());
    
    scrollLinks.click(scrollLinkClick);

    togglePopup('.js-popup-buy', true);

    slidersInit();

    resizeHandler();
    scrollHandler();
});
$(document).ready(() => {
    const popupBuyTrigger = $('.js-open-popup-buy');
    const popupTableTrigger = $('.js-open-popup-table');
    const popupTestdriveTrigger = $('.js-open-popup-testdrive');

    const navTrigger = $('.js-open-nav');
    const mobileNav = $('.js-mobile-nav');

    const popupCloseTrigger = $('.js-close-popup');

    const burger = $('.js-burger');
    const menu = $('.js-menu');

    const scrollLinks = $('.js-scroll-link');

    const asideBody = $('.js-aside-body')

    const header  = document.querySelector('.header');

    let videos = $('video.video-unloaded');

    let slider_1_obj;

    const scrollHandler = () => {
        const offset = 200;

        videos.each(function(event){
            if($(this).offset().top - $(window).get(0).pageYOffset < 2000){
                $(this).attr('src', $(this).data('src'));
                
                $(this).removeClass('video-unloaded');
                $(this).removeAttr('data-src');

                videos = $('video.video-unloaded');
            }
        });

        scrollLinks.each(function() {
            let linkRect = $($(this).attr('href')).get(0).getBoundingClientRect();

            linkRect.top < offset && linkRect.bottom > offset ? $(this).addClass('active') : $(this).removeClass('active');
        });
    }

    const toggleNav = (state=null) => {
        if(state == null){
            return () => {
                mobileNav.toggleClass('active');

                $(document).mouseup(function(e){
                    if (!mobileNav.is(e.target) && mobileNav.has(e.target).length === 0){
                        mobileNav.removeClass('active');
                    }
                });
            }
        }
        else{
            state ? mobileNav.addClass('active') : mobileNav.removeClass('active');

            $(document).mouseup(function(e){
                if (!mobileNav.is(e.target) && mobileNav.has(e.target).length === 0){
                    mobileNav.removeClass('active');
                }
            });
        }
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

        const swiperSettings = {
            slidesPerView: 1,
            speed: 700,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: false,
                loadOnTransitionStart: true,
            },
            navigation: {
                prevEl: '.slider__control_prev',
                nextEl: '.slider__control_next',
            },
            pagination: {
                dynamicBullets: true,
                el: '.slider__pagination.swiper-pagination',
                clickable: true,
            }
        };

        slider_1_obj = new Swiper(slider_1, {
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 700,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: false,
                loadOnTransitionStart: true,
            },
            navigation: {
                prevEl: '.slider__control_prev',
                nextEl: '.slider__control_next',
            },
            pagination: {
                el: '.slider__pagination.swiper-pagination',
                clickable: true,
            }
        });

        let slider_2_obj = new Swiper(slider_2, swiperSettings);

        checkSlidePos();
        slider_1_obj.on('slideChange', checkSlidePos);
    }

    const checkSlidePos = () => {
        const rollNames = document.querySelectorAll('.slider__name');

        rollNames.forEach(name => name.classList.remove('active'));

        rollNames[slider_1_obj.activeIndex].classList.add('active');
    }
    
    const closePopup = () => {
        $('.popup__overlay').removeClass('active');
        $('.popup').each(function(event){
            $(this).each(function(event){
                $(this).find('iframe').remove();
            });
        });
    }

    const asideBodyToggle = (state=null) => {
        if(state == null){
            return () => {
                if(event.target.classList.contains('js-aside-body')){
                    asideBody.addClass('active');

                    $(document).click(function(event){
                        if(!event.target.classList.contains('js-aside-body')) asideBody.removeClass('active');
                    });
                    
                    asideBody.mouseleave(function(event){
                        setTimeout(asideBodyToggle, 500, false);
                    });
                }
            }
        }
        else{
            state ? asideBody.addClass('active') : asideBody.removeClass('active');

            $(document).click(function(event){
                if(!event.target.classList.contains('js-aside-body')) asideBody.removeClass('active');
            });

            asideBody.mouseleave(function(event){
                setTimeout(asideBodyToggle, 500, false);
            });
        }
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
        toggleNav(false);
        asideBodyToggle(false);
        let targetLink = $(event.target);

        while(!targetLink.hasClass('js-scroll-link')){
            targetLink = targetLink.parent();
        }

        const targetId = targetLink.attr('href');
        const targetTopOffset = $(targetId).offset().top;

        const headerOffset = 150;

        scrollLinks.removeClass('active');
        

        const scrollDist = targetTopOffset - $(window).get(0).pageYOffset;

        videos.each(function(event){
            if($(this).offset().top < scrollDist){
                $(this).attr('src', $(this).data('src'));
                
                $(this).removeClass('video-unloaded');
                $(this).removeAttr('data-src');

                videos = $('video.video-unloaded');
            }
        });

        $('body,html').animate({scrollTop: targetTopOffset - headerOffset}, 3000);
    }

    const findVideos = () => {
        let videos = document.querySelectorAll('.review');
    
        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }
    
    const setupVideo = video => {
        let link = video.querySelector('.review__link');
        let media = video.querySelector('.review__media');
        let button = video.querySelector('.review__button');
        let id = parseMediaURL(media);
    
        video.addEventListener('click', () => {
            let iframe = createIframe(id);

            $('.js-popup-player').find('.popup_video').get(0).appendChild(iframe);
            togglePopup('.js-popup-player', true);
        });
    
        link.removeAttribute('href');
        video.classList.add('review--enabled');
    }
    
    const parseMediaURL = media => {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
        let url = media.src;
        let match = url.match(regexp);
    
        return match[1];
    }
    
    const createIframe = id => {
        let iframe = document.createElement('iframe');
    
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('review__media');
    
        return iframe;
    }
    
    const generateURL = id => {
        let query = '?rel=0&showinfo=0&autoplay=1';
    
        return 'https://www.youtube.com/embed/' + id + query;
    }
    
    $(window).scroll(scrollHandler);
    $(window).resize(resizeHandler);
    
    popupCloseTrigger.click(closePopup);
    
    popupBuyTrigger.click(togglePopup('.js-popup-buy'));
    popupTableTrigger.click(togglePopup('.js-popup-table'));
    popupTestdriveTrigger.click(togglePopup('.js-popup-testdrive'));

    burger.click(toggleMenu());
    
    scrollLinks.click(scrollLinkClick);

    navTrigger.click(toggleNav);

    slidersInit();

    asideBody.click(asideBodyToggle());

    resizeHandler();
    scrollHandler();

    findVideos();
});
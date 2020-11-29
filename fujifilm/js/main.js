$(document).ready(() => {
    const scrollHandler = () => {
        $(window).get(0).pageYOffset > 40 ? $('.header').addClass('fixed') : $('.header').removeClass('fixed');
    }

    const slidersInit = () => {
        let slider_1 = $('.js-slider-color').get(0);
        
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
    }

    slidersInit();
    $(window).on('scroll', scrollHandler);
});
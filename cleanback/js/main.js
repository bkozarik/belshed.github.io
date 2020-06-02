$(document).ready(function(){
    
    function constrain(val, min, max) {
        return val > max ? max : val < min ? min : val;
    }

    function incSwiper(){
        let nextActiveSlide = Number($('.service__current').html()) + 1;
        nextActiveSlide = constrain(nextActiveSlide, 1, $('.services .swiper-slide').length);
        $('.service__current').html(nextActiveSlide);
    }

    function decSwiper(){
        let nextActiveSlide = Number($('.service__current').html()) - 1;
        nextActiveSlide = constrain(nextActiveSlide, 1, $('.services .swiper-slide').length);
        $('.service__current').html(nextActiveSlide);
    }

    $('.service__total').html($('.services .swiper-slide').length);

    $('.services__next').on('click', function(){
        incSwiper();
    });

    $('.services__prev').on('click', function(){
        decSwiper();
    });

    $('#compare-id').twentytwenty({
        no_overlay: true,
    });

    let serviceSwiper = new Swiper ('.services__swiper', {
        direction: 'horizontal',
        navigation: {
            nextEl: '.services__next',
            prevEl: '.services__prev',
        },
        slidesPerView: 1,
        breakpoints: {
            800: {
                direction: 'vertical',
            },
            300: {
                direction: 'horizontal',
            }
        }
    })

    let portfolioSwiper = new Swiper ('.portfolio__swiper', {
        direction: 'horizontal',
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            800: {
                slidesPerView: 3,
            },
            420: {
                slidesPerView: 2,
            },
            319: {
                slidesPerView: 1,
            },
        }
    })
});
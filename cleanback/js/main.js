$(document).ready(function(){
    
    $('.banner__button, .form__close').on('click', function(e){
        e.preventDefault();
        $('.form__wrapper').toggleClass('active');
        if($('.form__wrapper').hasClass('active')){
            $('html,body').stop().animate({ scrollTop: 0 }, 1000);

            $("html,body").css("overflow","hidden");
        }
        else{
            $("html,body").removeAttr('style');
        }
    });

    $('.service__button, .form__close-card').on('click', function(e){
        e.preventDefault();

        $('.service__wrap').toggleClass('active');
        service.update();
    });

    $('a.header__burger').on('click', function(event){
        event.preventDefault();

        $(this).toggleClass('active');
        $('.header__logo').toggleClass('active');
        $('.mobile__menu').toggleClass('active');
        if($(this).hasClass('active')){
            $('.header__nav').css('display', 'block');
            $('.header__contacts').css('display', 'flex');
            $('.banner__social').css('display', 'flex');

            $('.mobile__menu').append($('.header__nav'));
            $('.mobile__menu').append($('.header__contacts'));
            $('.mobile__menu').append($('.banner__social'));
        }
        else{
            $('.header__nav, .header__contacts, .banner__social').removeAttr('style');

            $('.header__content').append($('.header__nav'));
            $('.header__content').append($('.header__contacts'));
            $('.banner__links').append($('.banner__social'));
        }
    })
    
    $('.header__link, .footer__link').on('click', function(e){
        e.preventDefault();
        $('a.header__burger').toggleClass('active', false);
        $('.header__logo').toggleClass('active', false);
        $('.mobile__menu').toggleClass('active', false);
        $('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top - 100 }, 1000);
    });

    $('.banner__link').on('click', function(e){
        e.preventDefault();
        $('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top - 100 }, 1000);
    });

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
                autoHeight: false,
            },
            300: {
                direction: 'horizontal',
                autoHeight: true,
            }
        }
    })

    let portfolioSwiper = new Swiper ('.portfolio__swiper', {
        direction: 'horizontal',
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
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
    let service = document.querySelector('.services__swiper').swiper;
    service.slideTo(1);
    incSwiper();
});
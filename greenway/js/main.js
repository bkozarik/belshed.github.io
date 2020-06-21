$(document).ready(function(){

    new WOW().init();

    let team_swiper = new Swiper ('.section__swiper', {
        spaceBetween: 10,
        slidesPerView: 3,
        loop: true,
        updateOnWindowResize: true,
        navigation: {
            nextEl: '.section__next',
            prevEl: '.section__prev',
          },
        breakpoints: {
            780: {
                slidesPerView: 3,
            },
            470:{
                slidesPerView: 2,
            },
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            }
        },
    })

    $(document).scroll(function(event){
        if($(window).outerWidth() > 1140){
            if($(document).scrollTop() >= $('.header').outerHeight()){
                $('.nav').toggleClass('fixed', true);
                $('.nav__wrap').append($('.header__contacts'));
                $('.header__contacts').toggleClass('fixed', true);
            }
            else {
                $('.nav').toggleClass('fixed', false);
                $('.header__wrap').append($('.header__contacts'));
                $('.header__contacts').toggleClass('fixed', false);
            }
        }
    });
    
    $('.nav__link').on('click', function(e){
        e.preventDefault();
        if($(this).attr('href') != '#header'){
            $('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top - 100 }, 800);
            if($('.mobile').hasClass('active')){
                $('.mobile').toggleClass('active', false);
                $('.nav__burger').toggleClass('active', false);
            }
            return
        }
        $('html,body').stop().animate({ scrollTop: 0 }, 800);
    });

    $('.nav__burger').on('click', function(event){
        event.preventDefault();

        $(this).toggleClass('active');
        $('.mobile').toggleClass('active');
        if($(this).hasClass('active')){
            $('.mobile').append($('.nav__wrap ul'));
            $('.mobile').append($('.header__contacts'));
        }
        else {
            $('.nav__wrap').append($('.nav__wrap ul'));
        }
    });

    let team_swiper_var = $('.section__swiper')[0].swiper;

    function windowCheck(){
        if($(window).outerWidth() <= 1140) {
            $('.nav').toggleClass('fixed', true);
            $('.nav__wrap').prepend($('.header__logo'));
        }
        else {
            $('.nav').toggleClass('fixed', false);
            $('.header__logo-wrap').prepend($('.header__logo'));
        }
    }

    $(window).resize(function(event){
        team_swiper_var.update();

        windowCheck();
    });

    windowCheck();
});
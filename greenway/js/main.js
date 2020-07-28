$(document).ready(function(){

    new WOW().init();

    let team_swiper = new Swiper ('.section__swiper', {
        spaceBetween: 10,
        slidesPerView: 3,
        loop: true,
        updateOnWindowResize: true,
        simulateTouch: false,
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

    $('.nav__wrap li>a, .header__contact a').on('click', function(event){
        event.preventDefault();
        
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


    $('.swiper-pide').on('click', function(event){
        let target = $(this).data('swiperSlideIndex');
        $('.swiper-slide').each(function(event){
            if($(this).data('swiperSlideIndex') != target){
                $(this).toggleClass('zoomed', false);
            }
        });
        
        $(this).toggleClass('zoomed');

    });

    $('.swiper-slide').on('touchEnd', function(event){
        
        $(this).toggleClass('zoomed');

    });


    if($('video.banner__bg').attr('src').endsWith('.png')){
        $($('video.banner__bg')[0]).remove();
    }
    else if($('video.banner__bg').attr('src').endsWith('.jpg')){
        $($('video.banner__bg')[0]).remove();
    }
    else if($('video.banner__bg').attr('src').endsWith('.jpeg')){
        $($('video.banner__bg')[0]).remove();
    }
    

    if($('img.banner__bg').attr('src').endsWith('.mp4')){        
        $($('img.banner__bg')[0]).remove();
        $('video')[0].play();
    }

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

    $('.wp-block-image a').attr('data-lightbox', 'team');

    $('.form__suc-wrap, .form__sucsess-close').on('click', function(event){
        event.preventDefault();
        $('.form__suc-wrap').toggleClass('active', false);

    });


    lightbox.option({
        'resizeDuration': 1,
        'fadeDuration': 10,
        'wrapAround': true,
        'albumLabel': '',
        'imageFadeDuration': 100,
        'alwaysShowNavOnTouchDevices': true,
      });
  
      var inputmask_96e76a5f = {"mask":"+7(999)999-99-99"};
      jQuery("input[type=tel]").inputmask(inputmask_96e76a5f);
  
      

    $(window).resize(function(event){
        team_swiper_var.update();

        windowCheck();
    });

    windowCheck();
});
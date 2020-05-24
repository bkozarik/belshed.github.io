$(document).ready(function(){
    let slider = document.querySelector('.swiper-container1');
    let slider2 = document.querySelector('.swiper-container2');
    let about_swiper1;
    let about_swiper2;
    let hiddenOffset;
    let shownOffset; 

    var mySwiper = new Swiper ('.swiper-container', {
        spaceBetween: 20,
        slidesPerView: 5,
        grabCursor:true,
        updateOnWindowResize: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination1',
            type: 'bullets',
        },
        breakpoints: {
            1000:{
                slidesPerView: 6,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
          }
    })
      
    function mobileSwiper1(){
        if(window.innerWidth <= 1000 && slider.dataset.mobile == 'false'){
            about_swiper1 = new Swiper ('.swiper-container1', {
                grabCursor:true,
                spaceBetween: 10,
                slidesPerView: 3,
                updateOnWindowResize: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                breakpoints: {
                    780: {
                        slidesPerView: 3,
                    },
                    400:{
                        slidesPerView: 2,
                    },
                    300: {
                        slidesPerView: 1,
                    }
                },
            })

            slider.dataset.mobile = 'true';
        }

        if(window.innerWidth > 1000){
            slider.dataset.mobile = 'false';

            if(slider.classList.contains('swiper-container-initialized')){
                about_swiper1.destroy();
                delete about_swiper1;
            }
        }
    }

    function mobileSwiper2(){
        if(window.innerWidth <= 1000 && slider2.dataset.mobile == 'false'){
            about_swiper2 = new Swiper ('.swiper-container2', {
                grabCursor:true,
                spaceBetween: 10,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination2',
                    type: 'bullets',
                },
                updateOnWindowResize: true,
                breakpoints: {
                    780: {
                        slidesPerView: 3,
                    },
                    400:{
                        slidesPerView: 2,
                    },
                    300: {
                        slidesPerView: 1,
                    }
                },
            })

            slider2.dataset.mobile = 'true';
        }

        if(window.innerWidth > 1000){
            slider2.dataset.mobile = 'false';

            if(slider2.classList.contains('swiper-container-initialized')){
                about_swiper2.destroy();
                delete about_swiper2;
            }
        }
    }
    
    function asideMove(){
        if(window.innerWidth <= 1160){
            let aside_enter = $('.aside__enter');
            $('.main__video').before(aside_enter);
            if($('.main__text').height() < 2000){
                $('.main__button').css('display', 'none');
            }
        }
        else{
            $('.main__button').css('display', 'none');
            $('.aside__info').before($('.aside__enter'));
        }
    }

    mobileSwiper1();
    mobileSwiper2();
    asideMove();
    
    $(window).resize(()=>{

        if(about_swiper1 && about_swiper2){
            try{
                let swiper1 = $('.swiper-container1')[0].swiper
                let swiper2 = $('.swiper-container2')[0].swiper
                swiper1.update();
                swiper2.update();
            }
            catch(e){}
        }
        mobileSwiper1();
        mobileSwiper2();
        asideMove();
    });

    $('.header__burger').on('click', (event)=>{
        $('.header__burger').toggleClass('active');
        $('.header__mobile').toggleClass('active');
        if($('.header__burger').hasClass('active')){
            $('body').css('overflow-y', 'hidden');
        }
        else{
            $('body').css('overflow-y', 'auto');
        }
    });

    $('.main__button>a').on('click', function (event){
        event.preventDefault();
        if($('.main__text').hasClass('hidden')){
            hiddenOffset = $(this).offset().top;
        }
        else{
            $('html, body').animate({scrollTop: hiddenOffset-200});
        }
        $('.main__text').toggleClass('hidden');

        if($('.main__text').hasClass('hidden')){
            $('.main__text').removeAttr('style');
            $(this).text('Полный текст статьи');
        }
        else{
            $(this).text('Скрыть текст статьи');
        }
    });

    $('.main__play-button').on('click', function(event){
        event.preventDefault();
        $(this).fadeOut();
        $('.main__player>video')[0].play();
        $('.main__player>video').attr('controls', 'true');
    });
});
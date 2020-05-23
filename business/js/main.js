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
                breakpoints: {
                    540: {
                        slidesPerView: 3,
                    },
                    320:{
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
            }
        }

    }

    function mobileSwiper2(){
        if(window.innerWidth <= 1000 && slider2.dataset.mobile == 'false'){
            about_swiper2 = new Swiper ('.swiper-container2', {
                grabCursor:true,
                spaceBetween: 10,
                slidesPerView: 3,
                updateOnWindowResize: true,
                breakpoints: {
                    540: {
                        slidesPerView: 3,
                    },
                    320:{
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
            }
        }

    }
    
    function asideMove(){
        if(window.innerWidth <= 1160){
            let aside_enter = $('.aside__enter');
            $('.main__video').before(aside_enter);
            if($('.main__text').height() >= 2000){
                $('.main__text').toggleClass('hidden', true);
                $('.main__button').css('display', 'block');
            }
            else{
                $('.main__button').css('display', 'none');
            }
        }
        else{
            $('.main__button').css('display', 'none');
        }
    }

    mobileSwiper1();
    mobileSwiper2();
    asideMove();
    $(window).resize(()=>{
        mobileSwiper1();
        mobileSwiper2();
        asideMove();
    });

    $('.header__burger').on('click', (event)=>{
        $('.header__burger').toggleClass('active');
        $('.header__mobile').toggleClass('active');
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
});
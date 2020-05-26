$(document).ready(function(){
    let slider = document.querySelector('.swiper-container1');
    let slider2 = document.querySelector('.swiper-container2');
    let slider_gallery = document.querySelector('.main__sertificates');
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

    function mobileGalery(){
        if(window.innerWidth <= 1000 && slider_gallery.dataset.mobile == 'false'){
            gallery_swiper = new Swiper ('.main__sertificates', {
                grabCursor:true,
                spaceBetween: 10,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-gallery',
                    type: 'bullets',
                },
                updateOnWindowResize: true,
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

            slider_gallery.dataset.mobile = 'true';
        }

        if(window.innerWidth > 1000){
            slider_gallery.dataset.mobile = 'false';

            if(slider_gallery.classList.contains('swiper-container-initialized')){
                gallery_swiper.destroy();
                delete gallery_swiper;
            }
        }
    }
    
    function windowResize(){
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
        if(window.innerWidth <= 400){
            let search_btn = $('.main__searchbtn');
            $('.main__undersearch').after(search_btn);
            search_btn.css({
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
            });
        }
        else {
            $('.main__searchbtn').removeAttr('style');
            $('.main__searchfield').after($('.main__searchbtn'));
        }
        if(window.innerWidth <= 630){
            $('.how .main__text.slide').slideUp(300);
            $('.how__text-title>i').css('display', 'inline-block');
        }
        else {
            $('.how .main__text.slide').slideDown(300);
            $('.how__text-title>i').css('display', 'none');
        }
    }

    function checkPage(){
        if((Number($('.main__pagination-item.active').html()) != 1) && ($('.main__pagination-item.active').length == 1)){
            $('.main__pagination-item.back').css('display', 'inline');
        }
    }



    mobileSwiper1();
    mobileSwiper2();
    windowResize();
    mobileGalery();
    checkPage();

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
        mobileGalery();
        windowResize();
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

    $('.how__text-title').on('click', function(){
        if(window.innerWidth <= 630){
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                $($(this)[0].nextElementSibling).slideDown(300);
            }
            else{
                $($(this)[0].nextElementSibling).slideUp(300);
            }
        }
    });

    $('.main__sertificate').on('click', function(){
        let path = $(this).find('img').attr('src')
        let pathLen = $(this).find('img').attr('src').length
        let imgPos;
        let formats = ['.jpeg', '.jpg', '.gif', '.png'];

        switch(pathLen){
            case 23:
                imgPos = Number(path.substring(18,19));
            break
            case 24:
                imgPos = Number(path.substring(18,20));
            break
        }

        let pathBigSertificate = `/business/img/big_serts/sert${imgPos}.png`;

        $('.popup__wrap>img').attr('src', pathBigSertificate);
        $('.popup').fadeIn();
        $('.popup').css('display', 'flex');
    });

    $('.popup').on('click', function(){
        $(this).fadeOut(100);
        $('.popup__wrap>img').removeAttr('src');
    });
});
$(document).ready(function(event){

    let orderSwiper;
    let orderSwiperQ = document.querySelector('.section__actions');
    let benefitsSwiper;
    let benefitsSwiperQ = document.querySelector('#benefitsSlider');
    let programsSwiper;
    let programsSwiperQ = document.querySelector('.section__programs');
    let cardSwiper;
    let cardSwiperQ = document.querySelector('.show-slider');

    let dlcSwiper = new Swiper ('.dlc__swiper', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 20,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.dlc__next',
            prevEl: '.dlc__prev',
        },
        
        breakpoints: {
            780: {
                slidesPerView: 5,
            },
            480: {
                slidesPerView: 3,
            },
            320: {
                slidesPerView: 1,
            }
        },
        
    });

    let reviewSwiper = new Swiper ('.review__swiper', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 20,
        speed:800,
        navigation: {
            nextEl: '.review__next',
            prevEl: '.review__prev',
        },
        slidesPerView: 1,
    });

    let actionsSwiper = new Swiper ('.section__slider', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 20,
        speed:800,
        navigation: {
        },
        breakpoints: {
            780: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        },
    });

    let bigSwiper = new Swiper ('.big-slider', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 10,
        speed:800,
        simulateTouch: false,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.big-next',
            prevEl: '.big-prev',
        },
        slidesPerView: 1,
    });

    function mobileOrderSwiper(){
        try{
            if(window.innerWidth <= 720 && orderSwiperQ.dataset.mobile == 'false'){
                orderSwiper = new Swiper ('.section__actions', {
                    grabCursor:true,
                    spaceBetween: 20,
                    updateOnWindowResize: true,
                    breakpoints: {
                        780: {
                            slidesPerView: 3,
                        },
                        450: {
                            slidesPerView: 2,
                        },
                        300: {
                            slidesPerView: 1,
                        }
                    },
                })
    
                orderSwiperQ.dataset.mobile = 'true';
            }
    
            if(window.innerWidth > 720){
                orderSwiperQ.dataset.mobile = 'false';
    
                if(orderSwiperQ.classList.contains('swiper-container-initialized')){
                    orderSwiper.destroy();
                    delete orderSwiper;
                }
            }
        }
        catch(e){}
    }

    function mobileBenefitsSwiper(){
        try{
            if(window.innerWidth <= 720 && benefitsSwiperQ.dataset.mobile == 'false'){
                benefitsSwiper = new Swiper ('#benefitsSlider', {
                    grabCursor:true,
                    spaceBetween: 20,
                    updateOnWindowResize: true,
                    loop: true,
                    navigation: {
                        nextEl: '.section__benefit-next',
                        prevEl: '.section__benefit-prev',
                    },
                    breakpoints: {
                        780: {
                            slidesPerView: 3,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        300: {
                            slidesPerView: 1,
                        }
                    },
                })
    
                benefitsSwiperQ.dataset.mobile = 'true';
            }
    
            if(window.innerWidth > 720){
                benefitsSwiperQ.dataset.mobile = 'false';
    
                if(benefitsSwiperQ.classList.contains('swiper-container-initialized')){
                    benefitsSwiper.destroy();
                    delete benefitsSwiper;
                }
            }
        }
        catch(e){}
    }

    function mobileProgramsSwiper(){
        try{
            if(window.innerWidth <= 710 && programsSwiperQ.dataset.mobile == 'false'){
                programsSwiper = new Swiper ('.section__programs', {
                    grabCursor:true,
                    spaceBetween: 20,
                    updateOnWindowResize: true,
                    navigation: {
                        nextEl: '.section__program-next',
                        prevEl: '.section__program-prev',
                    },
                    breakpoints: {
                        780: {
                            slidesPerView: 3,
                        },
                        300: {
                            slidesPerView: 1,
                        }
                    },
                })
    
                programsSwiperQ.dataset.mobile = 'true';
            }
    
            if(window.innerWidth > 720){
                programsSwiperQ.dataset.mobile = 'false';
    
                if(programsSwiperQ.classList.contains('swiper-container-initialized')){
                    programsSwiper.destroy();
                    delete programsSwiper;
                }
            }
        }
        catch(e){}
    }

    function cardsSwiper(){
        try{
            if(window.innerWidth <= 720 && cardSwiperQ.dataset.mobile == 'false'){
                cardSwiper = new Swiper ('.show-slider', {
                    grabCursor:true,
                    spaceBetween: 20,
                    updateOnWindowResize: true,
                    navigation: {
                        nextEl: '.section__show-next',
                        prevEl: '.section__show-prev',
                    },
                    breakpoints: {
                        480: {
                            slidesPerView: 2,
                        },
                        300: {
                            slidesPerView: 1,
                        }
                    },
                })
    
                cardSwiperQ.dataset.mobile = 'true';
            }
    
            if(window.innerWidth > 720){
                cardSwiperQ.dataset.mobile = 'false';
    
                if(cardSwiperQ.classList.contains('swiper-container-initialized')){
                    cardSwiper.destroy();
                    delete cardSwiper;
                }
            }
        }
        catch(e){}
    }

    function checkTabs(){
        try{
            if(window.innerWidth <= 960){
                $('.tab__item-top').each(function(event){
                    $(this).append($(this).siblings('.tab__item-title'));
                });
            }
            else{
                $('.tab__item-top').each(function(event){
                    $(this).after($(this).children('.tab__item-title'));
                });
            }

            if(window.innerWidth <= 720){
                //$('.tab__item').prepend('.tab__item-title');
                $('.tab__item').each(function(event){
                    
                    $(this).children('.tab__item-top').wrap('<div class="tab__item-mobile"></div>')
                    $(this).children('.tab__item-mobile').append($(this).children($('.tab__item-list, .tab__item-price')));
                    $(this).find('.tab__item-top').append($(this).find($('.tab__item-price')));
                    
                    $(this).prepend($($(this).find('.tab__item-title')));

                    $(this).children(".tab__item-mobile").hide().prev().click(function() {
                        $(this).parents(".tab__item").find(".tab__item-mobile").not(this).slideUp().prev().removeClass("active");
                        $(this).parents(".tab__item").find(".tab__item-mobile").not(":visible").slideDown().prev().addClass("active");
                    });
                    if($(this).index() == 0){
                        $(this).children(".tab__item-mobile").show();
                        $(this).children(".tab__item-title").toggleClass('active', true);
                    }
                });
                
            }
            else{
                
                $('.tab__item').each(function(event){
                    $(this).children(".tab__item-mobile").show();
                    $(this).prepend($(this).find('.tab__item-top'));
                    $(this).append($(this).find('.tab__item-list'));
                    $(this).append($(this).find('.tab__item-price'));
                    $(this).find('.tab__item-mobile').remove();
                });
            }
        }
        catch(e){
            console.log(e);
            
        }
    }

    $('.header__burger').on('click', function(event){
        $(this).toggleClass('active');
    });

    function checkBurger(){
        if(window.innerWidth <= 1130 && window.innerWidth > 570){
            $('.header__logo').append($('.header__burger'));
            $('.header__burger, .header__logo').toggleClass('inLogo', true);
        }
        else {
            $('.header__wrap').prepend($('.header__burger'));
            $('.header__burger, .header__logo').toggleClass('inLogo', false);
        }
    }

    $('.tabs__nav-link').on('click', function(event){
        event.preventDefault();
        $('.tabs__nav-link').each(function(event){
            $(this).toggleClass('active', false);
        });
        $('.tab').each(function(event){
            $(this).toggleClass('active', false);
        });
        
        $(this).toggleClass('active');
        
        let tabIndex = $(this).data('tab') - 1;
        $('.tab').each(function(event){
            if($(this).index() == tabIndex){
                $(this).toggleClass('active');
            }
        });
    });

    $('.format__programs-link').on('click', function(event){
        event.preventDefault();
        $('.format__programs-link').each(function(event){
            $(this).toggleClass('active', false);
        });
        $('.format__item').each(function(event){
            $(this).toggleClass('active', false);
        });
        
        $(this).toggleClass('active');
        
        let tabIndex = $(this).data('tab') - 1;
        $('.format__item').each(function(event){
            if($(this).index() == tabIndex){
                $(this).toggleClass('active');
            }
        });
    });


    $('.tabs__nav-link').each(function(event){
        if($(this).hasClass('active')){
            let tabIndex = $(this).data('tab') - 1;
            $('.tab').each(function(event){
                if($(this).index() == tabIndex){
                    $(this).toggleClass('active');
                }
            });
        }
    });

    $('.format__programs-link').each(function(event){
        if($(this).hasClass('active')){
            let tabIndex = $(this).data('tab') - 1;
            $('.format__item').each(function(event){
                if($(this).index() == tabIndex){
                    $(this).toggleClass('active');
                }
            });
        }
    });

    $(window).resize(function(event){
        mobileOrderSwiper();
        mobileBenefitsSwiper();
        mobileProgramsSwiper();
        cardsSwiper();
        checkBurger();
        checkTabs();
    });
    
    mobileOrderSwiper();
    mobileBenefitsSwiper();
    mobileProgramsSwiper();
    cardsSwiper();
    checkTabs();
}); 
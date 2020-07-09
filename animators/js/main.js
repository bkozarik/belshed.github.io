$(document).ready(function(event){

    let orderSwiper;
    let orderSwiperQ = document.querySelector('.section__actions');
    let benefitsSwiper;
    let benefitsSwiperQ = document.querySelector('#benefitsSlider');
    let programsSwiper;
    let programsSwiperQ = document.querySelector('.section__programs');
    let cardSwiper;
    let cardSwiperQ = document.querySelector('.show-slider');
    
    $('.popup').fadeOut(0);    

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
        spaceBetween: 20,
        speed:800,
        navigation: {
            nextEl: '.section__action-next',
            prevEl: '.section__action-prev',
        },
        breakpoints: {
            1135: {
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
        spaceBetween: 0,
        speed: 800,
        simulateTouch: false,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: '.big-next',
            prevEl: '.big-prev',
        },
        slidesPerView: 1,
    });

    function hideElems(){
        if(window.innerWidth <= 570){
            $('.section__personage').each(function(event){
                if($(this).index() > 5){
                    $(this).css('display', 'none');
                }
            });

            $('.section__gift').each(function(event){
                if($(this).index() > 2){
                    $(this).css('display', 'none');
                }
            });

            $('.section__card').each(function(event){
                if($(this).index() > 5){
                    $(this).css('display', 'none');
                }
            });
            
            $('.questions__form').each(function(event){
                let agreement,
                    submitBtn;
                agreement = $($(this).find('.questions__form-col').get(0)).find('p');
                submitBtn = $($(this).find('.questions__form-col').get(1)).find('input.button');
                submitBtn.before(agreement);                
            });
        }
        else{
            $('.section__personage').each(function(event){
                if($(this).index() > 5){
                    $(this).removeAttr('style');
                }
            });

            $('.section__gift').each(function(event){
                if($(this).index() > 2){
                    $(this).removeAttr('style');
                }
            });

            $('.section__card').each(function(event){
                if($(this).index() > 5){
                    $(this).removeAttr('style');
                }
            });

            $('.questions__form').each(function(event){
                let agreement,
                    lastInput;
                agreement = $($(this).find('.questions__form-col').get(1)).find('p');
                lastInput = $($(this).find('.questions__form-col').get(0)).find('input').last();
                lastInput.after(agreement);                
            });
        }
    }

    function scrollHandler() {
        if($(window).outerWidth() < 1130){
            if($(document).scrollTop() >= $('.header').outerHeight()){
                $('.header').toggleClass('fixed', true);
                $('.head__wrap').toggleClass('fixed', true);
                $('.header__logo-text').css('display', 'none');
            }
            else {
                $('.header').toggleClass('fixed', false);
                $('.head__wrap').toggleClass('fixed', false);
                $('.header__logo-text').removeAttr('style');
            }
        }
        else{
            $('.header').toggleClass('fixed', false);
            $('.head__wrap').toggleClass('fixed', false);
            $('.header__logo-text').removeAttr('style');
        }
    }

    function checkMenu(){
        if(window.innerWidth <= 1130){
            $('.header__mobile').append($('.header__nav'));
        }
        else{
            $('.header__menu').prepend($('.header__nav'));
            $('.header__mobile').toggleClass('active', false);
        }
    }

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
                    spaceBetween: 30,
                    updateOnWindowResize: true,
                    navigation: {
                        nextEl: '.section__show-next',
                        prevEl: '.section__show-prev',
                    },
                    breakpoints: {
                        1100: {
                            slidesPerView: 4,
                        },
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

    function checkFormats(){
        try {
            if((window.innerWidth <= 1010) && (window.innerWidth > 570)){
                $('.format__programs').append($('.format__item.active .format__item-head'));
            }
            else{
                $('.format__item.active').prepend($('.format__programs .format__item-head'));
            }
        }
        catch(e){}
    }
    
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

    function checkInner(){
        try {
            if(window.innerWidth <= 1010){
                $('.item__description').prepend($('form.item__form'));
            }
            else{
                $('.item__content').append($('form.item__form'));
            }

            if(window.innerWidth <= 660){
                $('.item__head').prepend($('.item__name'));
            }
            else{
                $('.item__content').prepend($('.item__name'));
            }
        }
        catch(e){}
    }

    $('.header__burger').on('click', function(event){
        event.preventDefault();

        $(this).toggleClass('active');
        $('.header__mobile').toggleClass('active');
    });

    $('.popup__close').on('click', function(event){
        event.preventDefault();

        $('.popup__wrap, .popup__thx, .popup__violet, .popup__yellow').fadeOut('ease-in');
    });

    $('.open__thx').on('click', function(event){
        event.preventDefault();

        $('.popup__wrap').fadeIn(function(event){
            $(this).css('display', 'flex');
            $(this).css('opacity', '1');
        });

        $('.popup__thx').fadeIn(function(event){
            $(this).css('display', 'flex');
            $(this).css('opacity', '1');
        });
    });

    $('.open__yellow').on('click', function(event){
        event.preventDefault();

        $('.popup__wrap').fadeIn(function(event){
            $(this).css('display', 'flex');
            $(this).css('opacity', '1');
        });

        $('.popup__yellow').fadeIn(function(event){
            $(this).css('display', 'flex');
            $(this).css('opacity', '1');
        });
    });

    $('.open__violet').on('click', function(event){
        event.preventDefault();

        $('.popup__wrap').fadeIn(function(event){
            $(this).css('display', 'flex');
            $(this).css('opacity', '1');
        });

        $('.popup__violet').fadeIn(function(event){
            $(this).css('display', 'flex');
            $(this).css('opacity', '1');
        });
    });

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
        
        $($('.format__item').get($('.format__programs .format__item-head').data('tab') - 1)).prepend($('.format__programs .format__item-head'));
        
        if((window.innerWidth <= 1010) && (window.innerWidth > 570)){
            $('.format__programs').append($('.format__item.active .format__item-head'));
        }
        else{
            $('.format__item.active').prepend($('.format__programs .format__item-head'));
        }

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

    $(document).scroll(function () {
        scrollHandler();
    });

    $(window).resize(function(event){
        mobileBenefitsSwiper();
        mobileProgramsSwiper();
        mobileOrderSwiper();
        scrollHandler();
        checkFormats();
        cardsSwiper();
        checkBurger();
        checkInner();
        hideElems();
        checkMenu();
        checkTabs();
    });
    
    mobileBenefitsSwiper();
    mobileProgramsSwiper();
    mobileOrderSwiper();
    scrollHandler();
    checkFormats();
    cardsSwiper();
    checkInner();
    hideElems();
    checkMenu();
    checkTabs();
}); 
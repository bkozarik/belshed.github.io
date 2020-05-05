$(document).ready(function(){
    $('.learning__slider').slick({
        arrows:true,
        slidesToShow:3,
        nextArrow:$('.next-button'),
        prevArrow:$('.prev-button')
    });
    $('.comments__slider').slick({
        arrows:true,
        adaptiveHeight: true,
        nextArrow:$('.next-button.comments__button'),
        prevArrow:$('.prev-button.comments__button')
    });
    $('.learning__slider').on('afterChange', ()=>{
        $('.learning__counter')[0].innerText = Number($('.learning__item.slick-current.slick-active')[0].attributes[1].value) + 1 + '/12';
    });
    $('.comments__slider').on('afterChange', ()=>{
        $('.comments__counter')[0].innerText = Number($('.comments__item.slick-current.slick-active')[0].attributes[1].value) + 1 + '/6';
    });
    $('#help').on('click', () => {
        if($('.header__popup-login').css('display') != 'block'){
            if($('.header__popup-wrap').css('display') == 'none'){
                $('.header__popup-wrap').css('display', 'block');
                $('.header__popup').css('display', 'block');
                $('.header__popup').css('transform', 'translateY(0%)');
            }
            else{
                $('.header__popup-wrap').css('display', 'none');
                $('.header__popup').css('display', 'none');
                $('.header__popup').css('transform', 'translateY(-100%)');
            }
        } 
    });
    $('#login').on('click', () => {
        if($('.header__popup').css('display') != 'block'){
            if($('.header__popup-wrap').css('display') == 'none'){
                $('.header__popup-wrap').css('display', 'block');
                $('.header__popup-login').css('display', 'block');
                $('.header__popup-login').css('transform', 'translate(0%, 0%)');
            }
            else{
                $('.header__popup-wrap').css('display', 'none');
                $('.header__popup-login').css('display', 'none');
                $('.header__popup-login').css('transform', 'translateY(0%, -100%)');
            }
    }
    });
    $('.header__popup-wrap').on('click', () => {
        $('.header__popup-wrap').css('display', 'none');
        $('.header__popup-login').css('display', 'none');
        $('.header__popup').css('display', 'none');
    });
});
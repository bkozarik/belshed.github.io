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
});
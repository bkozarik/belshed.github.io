$(document).ready(function () {
    $('.numb').number_plugin({
        width: '35px', //ширина инпута на выводе (по умолчанию 65px редактируется как тут так и через css)
        height: '24px', //высота инпута на выходе (по умолчанию 35px редактируется как тут так и через css)
        negative: true, //включение поддержки отрицательных чисел (по умолчанию false)
        step: 1, //шаг прибавления и убавления (по умолчанию 1)
        animate: true, //включение анимации прибавления и вычитания (по умолчанию false)
        delay: 100, //задержка анимации между прибавлениями (по умолчанию 10ms)
        max: 1000, //максимальное значение(по умолчанию false)
        min: 1, //минимальное значение(по умолчанию false)
        style: 'line',
        class : 'custom' //добавляет инпуту свой дополнительный класс
    });

    $('.similar_content').slick({
        dots: true,
        slidesToShow: 2,
        prevArrow: '<button type="button" class="similar__control similar__control_prev"></button>',
        nextArrow: '<button type="button" class="similar__control similar__control_next"></button>',
    });

    $('.compound_popup_slider').slick({
        dots: false,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="compound_popup__control compound_popup__control_prev"></button>',
        nextArrow: '<button type="button" class="compound_popup__control compound_popup__control_next"></button>',
    });

    $('.advantages_item_trigger').click(function(){

        $('.advantages_item_popup').removeClass('active');
        $('.advantages_item').removeClass('active');

        $(this).parent().find('.advantages_item_popup').addClass('active');
        $(this).parent().addClass('active');
        
        var parent = $(this).parent();

        parent.find('.close').click(function(){
            event.stopPropagation();
            parent.find('.advantages_item_popup').removeClass('active');
            parent.removeClass('active');
        });
    });

    $('.compund_question').click(function(){
        $(this).siblings('.compound_popup').addClass('active')

        $(this).siblings('.compound_popup').find('.close').click(function(){
            event.stopPropagation();
            $(this).parent().removeClass('active');
        });
    });

    $('.cart_photo_tabs_item').click(function(){

        var imgPath = $(this).find('img').attr('src');

        $('.cart_top_photo img').attr('src', imgPath);
    });

    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });

    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });

    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());  
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });

    $('.dropdown-menu li').click(function () {
        $('.dropdown-menu li').removeClass('active');
        $(this).addClass('active');
        var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
            msg = '<span class="msg">Hidden input value: ';
        $('.msg').html(msg + input + '</span>');
    }); 
    
    $( ".home_page_menu_item" ).click(function() {
        $('.home_page_menu_item').removeClass('active');
        $(this).addClass('active');
        $('.tab_door').removeClass('active');
        $('.tab_door:nth-child(' + ( $(this).index() + 1 ) + ')').addClass('active');
    });
});

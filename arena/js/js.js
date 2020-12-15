$(document).ready(function() {
    $(document).on('click', '.ico_menu', function () {
        $(this).toggleClass('active');
        $('.header .menu ').toggleClass('active');
        $('.header').toggleClass('active');
    });
    $('.header .menu').on('click', '.sub', function () {
        $(this).closest('.has_child').toggleClass('active')
            .find('ul').toggleClass('active');
    });
    $('.white_block .owl-carousel').owlCarousel({
        items:1,
        margin: 0,
        nav:false,
        navText: ['',''],
        dots:true,
        loop : false,
        touchDrag: true,
        mouseDrag: false,
        responsive:{
            320:{
                items:2
            },
            700:{
                items:3
            },
            991:{
                items:4,
                dots:false,
                touchDrag: false,
                mouseDrag: false
            }
        }
    });
    $('.sport_block .owl-carousel').owlCarousel({
        items:1,
        margin: 20,
        nav:false,
        navText: ['',''],
        dots:true,
        loop : false,
        touchDrag: true,
        mouseDrag: false,
        responsive:{
            0:{
                items:2
            },
            500:{
                items:3
            },
            650:{
                items:4
            },
            840:{
                items:5
            },
            991:{
                touchDrag: false,
                mouseDrag: false,
                margin: 40,
                items:6
            }
        }
    });
    var big_img = $('.big_img .owl-carousel');
    var small = $('.small .owl-carousel');
    big_img.owlCarousel({
        loop: true,
        center: true,
        items:1,
        margin: 65,
        nav:false,
        navText: ['',''],
        dots:false,
        responsive:{
            0:{

            },
        }
    }).on("dragged.owl.carousel", function () {
        var nav = $(this).closest('.slider').find('.owl-carousel');
        var num = nav.find('.active div').data('owl');
        small.trigger('to.owl.carousel', num - 1);
        $('.slider .small a').removeClass('current');
        $('.slider .small [data-owl="'+num+'"]').addClass('current');
        var text = $('.slider .big_img .active .heading').eq(0).text();
        $('.slider .show_text').text('').text(text);
    });
    small.owlCarousel({
        loop: true,
        items:3,
        margin: 25,
        nav:false,
        navText: ['',''],
        dots:false,
        responsive:{
            500:{
                items: 5
            },
            800:{
                items: 6
            },
            1000:{
                items: 6,
                margin: 40
            },
        }
    });
    $('.slider .small').on('click', '.owl-item', function () {
        var num = $(this).find('a').data('owl');
        $('.owl-carousel').trigger('to.owl.carousel', num - 1);
        $('.slider .small a').removeClass('current');
        $(this).find('a').addClass('current');
        var text = $('.slider .big_img .active .heading').eq(0).text();
        $('.slider .show_text').text('').text(text);
        return false;
    });
    $('.slider .nav_arrow').on('click','.next',function() {
        var nav = $(this).closest('.big_img').find('.owl-carousel');
        nav.trigger('next.owl.carousel');
        var num = nav.find('.active div').data('owl');
        small.trigger('to.owl.carousel', num - 1);
        $('.slider .small a').removeClass('current');
        $('.slider .small [data-owl="'+num+'"]').addClass('current');
        var text = $('.slider .big_img .active .heading').eq(0).text();
        $('.slider .show_text').text('').text(text);
    });
    $('.slider .nav_arrow').on('click','.prev',function() {
        var nav = $(this).closest('.big_img').find('.owl-carousel');
        nav.trigger('prev.owl.carousel', [300]);
        var num = nav.find('.active div').data('owl');
        small.trigger('to.owl.carousel', num - 1);
        $('.slider .small a').removeClass('current');
        $('.slider .small [data-owl="'+num+'"]').addClass('current');
        var text = $('.slider .big_img .active .heading').eq(0).text();
        $('.slider .show_text').text('').text(text);
    });

    $('.filters .filter_select').styler();
});
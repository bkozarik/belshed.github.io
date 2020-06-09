$(document).ready(function(){
    $('.footer__item.quote').on('click', function(event){
        event.preventDefault();

        $('.aside-left').css('display', 'block');
        $('.aside-right').css('display', 'none');
        $('.main').css('display', 'none');
    });

    $('.footer__item.video').on('click', function(event){
        event.preventDefault();
        $('.aside-left').css('display', 'none');
        $('.main').css('display', 'block');
        $('.aside-right').css('display', 'none');
    });

    $('.footer__item.chat').on('click', function(event){
        event.preventDefault();

        $('.aside-right').css('display', 'block');
        $('.main').css('display', 'none');
        $('.aside-left').css('display', 'none');
    });

    $(window).resize((event) => {
        if(window.innerWidth > 1315){
            $('.aside-right, .main, .aside-left').removeAttr('style');
            
        }
    });
});
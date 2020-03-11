document.addEventListener('DOMContentLoaded', function(){
    let content = document.querySelector('.content');
    let list = document.querySelector('.content__list');
    let prev = document.querySelector('.content__prev');
    let next = document.querySelector('.content__next');
    let list_item = document.querySelector('.content__item');
    let list_items = document.querySelectorAll('.content__item');
    let px = 0;

    function sync()
    {
        list_items.forEach(function(item, index){
            item.style.width = content.clientWidth + 'px';
        });
    
        list.style.width = (parseInt(list_items[0].style.width, 10)) * list_items.length + 'px';
    }
    function prevSlide()
    {
        if(px != 0)
        {
            px +=  (list_item.offsetWidth);
        }
        else
        {
            px = 0;
        }
        list.style.transform = 'translateX(' + px + 'px)';
    }

    function nextSlide()
    {
        if(px != 0 - ((list_item.offsetWidth) * (list_items.length - 1)))
        {
            px -=  (list_item.offsetWidth);
        }
        else
        {
            px = 0;
        }
        list.style.transform = 'translateX(' + px + 'px)';
    }

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);
    let timerSync = setInterval(sync, 100);
    //let timerSwipe = setInterval(nextSlide, 8000);
});
document.addEventListener('DOMContentLoaded', function(){
    let content = document.querySelector('.content');
    let list = document.querySelector('.content__list');
    let prev = document.querySelector('.content__prev');
    let next = document.querySelector('.content__next');
    let list_item = document.querySelector('.content__item');
    let list_items = document.querySelectorAll('.content__item');
    let px = 0;
    let startPos;
    let endPos;

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

    function compare()
    {
        if((endPos - startPos) > 200)
        {
            prevSlide();
        }
        else if((startPos - endPos) > 200)
        {
            nextSlide();
        }
        
    }

    function handleStart(evt)
    {
        evt.preventDefault();
        startPos = evt.changedTouches[0].pageX;
        console.log(startPos);
        compare();
    }

    function handleMove(evt)
    {
        evt.preventDefault();
        endPos = evt.changedTouches[0].pageX;
        console.log(endPos);
        compare();
    }

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);
    content.addEventListener('touchstart', handleStart);
    content.addEventListener('touchend', handleMove);
    let timerSync = setInterval(sync, 100);
    //let timerSwipe = setInterval(nextSlide, 8000);
});
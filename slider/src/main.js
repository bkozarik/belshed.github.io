document.addEventListener('DOMContentLoaded', function(){
    let content = document.querySelector('.content');
    let list = document.querySelector('.content__list');
    let prev = document.querySelector('.content__prev');
    let next = document.querySelector('.content__next');
    let list_item = document.querySelector('.content__item');
    let list_items = document.querySelectorAll('.content__item');
    
    let px = 0;
    list_items.forEach(function(item, index){
        item.style.width = content.clientWidth + 'px';
    });
    prev.addEventListener('click', function(){
        if(px != 0)
        {
            px +=  (list_item.offsetWidth + 40);
        }
        else
        {
            px = 0;
        }
        list.style.transform = 'translateX(' + px + 'px)';
    });

    next.addEventListener('click', function(){
        if(px != 0 - ((list_item.offsetWidth + 40) * (list_items.length - 1)))
        {
            px -=  (list_item.offsetWidth + 40);
        }
        else
        {
            px = 0;
        }
        list.style.transform = 'translateX(' + px + 'px)';
    });
});
function scrollHandler(){
    document.querySelectorAll('.js-parallax-item').forEach(function(item, index){
        item.style.transform = `translateY(${-1 * window.pageYOffset * (0.1 + 0.1 * index)}px)`;
    });
}

scrollHandler();
window.addEventListener('scroll', scrollHandler);
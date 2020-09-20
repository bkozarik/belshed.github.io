document.addEventListener('DOMContentLoaded', () => {
    let tableCells = document.querySelectorAll('td');

    const portfolioSwiper = new Swiper('.portfolio__container', {
        slidesPerView: 1,
        spaceBetween: 115,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
        }
    });


    tableCells.forEach(cell => {
        if(cell.innerText === "+"){
            cell.style.color = "#8FB83F";
        }
        else if (cell.innerText === "-"){
            cell.style.color = "#777777";
        }
    });
});
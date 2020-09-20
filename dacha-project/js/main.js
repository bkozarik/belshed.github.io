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

    const reportsSwiper = new Swiper('.reports__iphone', {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        navigation: {
            prevEl: '.reports__control_prev',
            nextEl: '.reports__control_next',
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
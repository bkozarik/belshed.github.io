document.addEventListener('DOMContentLoaded', () => {
    let tableCells = document.querySelectorAll('td');
    let quizButtons = document.querySelectorAll('button.button.button_step');
    let quizPages = document.querySelectorAll('.quiz__page');
    let quizInputs = document.querySelectorAll('.quiz__label input');
    let nextBtns = document.querySelectorAll('.button_next');
    let projectButtons = document.querySelectorAll('.button_projects');
    let currPage = 0;

    const constrain = (val, min, max) => {
        return val > max ? max : val < min ? min : val;
    }

    const quizShowPage = page => {
        page = Number(constrain(page, 0, quizPages.length - 1));

        quizButtons.forEach((button, index) => {
            if(button.classList.contains('active')){
                button.classList.remove('active');
            }
        });

        quizPages.forEach(page => {
            if(page.classList.contains('active')){
                page.classList.remove('active');
            }
        });

        quizPages[page].classList.add('active');

        try{
            quizButtons[page].classList.add('active');
            quizButtons[page].classList.add('visited');
            quizButtons[page].classList.remove('disabled');
        }
        catch{}

        currPage = page;
    }

    const quizShowNextPage = () => {

        return quizShowPage(currPage + 1);
    }

    const inputChangeHandler = () => {
        if(event.target.value){
            let nextBtn = quizPages[currPage].querySelector('.button_next');

            nextBtn.classList.add('active');
        }
    }

    const quizButtonHandler = () => {
        let target = event.target;

        quizShowPage(target.dataset.index);
    }

    const projectsPageChange = () => {
        let target = event.target;
        let pages = document.querySelectorAll('.projects__page');

        pages.forEach(page => {
            page.classList.remove('active');
        });

        projectButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        pages[target.dataset.index].classList.add('active');
        projectButtons[target.dataset.index].classList.add('active');
    }

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

    quizButtons.forEach((button, index) => {
        button.classList.add('disabled');

        button.addEventListener('click', quizButtonHandler);
    });

    quizInputs.forEach(input => {
        input.addEventListener('input', inputChangeHandler);
    });

    projectButtons.forEach(btn => {
        btn.addEventListener('click', projectsPageChange);
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', quizShowNextPage);
    });

    quizShowPage(currPage);
});
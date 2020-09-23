document.addEventListener('DOMContentLoaded', () => {
    let tableCells = document.querySelectorAll('td');
    let quizButtons = document.querySelectorAll('button.button.button_step');
    let quizPages = document.querySelectorAll('.quiz__page');
    let quizInputs = document.querySelectorAll('.quiz__label input');
    let nextBtns = document.querySelectorAll('.button_next');
    let projectButtons = document.querySelectorAll('.button_projects');
    let errorItems = document.querySelectorAll('.error__item');
    let mobileErrorsSwiper = document.querySelector('.error__container');
    let mobileErrorsSwiperSW;
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

    const resizeHandler = () => {
        if(window.innerWidth <= 1000){
            document.querySelector('.reports__body').insertBefore(document.querySelector('.reports__swiper'), document.querySelector('.reports__body .banner__info'))
        }
        else{
            document.querySelector('.reports__body').after(document.querySelector('.reports__swiper'));
        }

        if(window.innerWidth <= 640){
            if(mobileErrorsSwiper.dataset.mobile == 'false'){
                document.querySelector('.error__container .swiper-wrapper').insertBefore(errorItems[0], errorItems[1]);
                document.querySelector('.error .container').appendChild(document.querySelector('.error__item_green'));

                let errorsSwiper = new Swiper('.error__container', {
                    spaceBetween: 30,
                    slidesPerView: 1,
                    direction: 'horizontal',
                    updateOnWindowResize: true,
                    navigation: {
                        prevEl: '.error__control_prev',
                        nextEl: '.error__control_next',
                    },
                    pagination: {
                        el: '.error__pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                });
                mobileErrorsSwiper.dataset.mobile = 'true';
                mobileErrorsSwiperSW = mobileErrorsSwiper.swiper;
                errorItems = document.querySelectorAll('.error__item');
            }
        }
        else{
            mobileErrorsSwiper.dataset.mobile = 'false';
    
            if(mobileErrorsSwiper.classList.contains('swiper-container-initialized')){
                mobileErrorsSwiperSW.destroy();
                
                document.querySelector('.error .container').insertBefore(errorItems[0], document.querySelector('.error__container'));
                document.querySelector('.error__container .swiper-wrapper').insertBefore(errorItems[errorItems.length - 1], errorItems[3]);
            }
        }
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

    document.querySelector('.projects__open').addEventListener('click', () => {
        document.querySelectorAll('.projects__container_hidden').forEach(container => {
            container.classList.toggle('active');
        });
    });

    document.querySelector('.js-table-toggle').addEventListener('click', () => {
        document.querySelectorAll('.materials__table_hidden').forEach(table => {
            table.classList.toggle('active');
        });
    });

    window.addEventListener('resize', resizeHandler);

    resizeHandler();
    quizShowPage(currPage);
});
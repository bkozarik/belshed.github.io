document.addEventListener('DOMContentLoaded', () => {
    let tableCells = document.querySelectorAll('td');
    let quizButtons = document.querySelectorAll('button.button.button_step');
    let quizPages = document.querySelectorAll('.quiz__page');
    let quizInputs = document.querySelectorAll('.quiz__label input');
    let nextBtns = document.querySelectorAll('.button_next');
    let projectButtons = document.querySelectorAll('.button_projects');
    let errorItems = document.querySelectorAll('.error__item');
    let mobileErrorsSwiper = document.querySelector('.error__container');
    let popupBtn = document.querySelectorAll('.js-toggle-popup');
    let forms = document.querySelectorAll('form');
    let burgerBtn = document.querySelector('.js-toggle-menu');
    let docButtons = document.querySelectorAll('.js-download');
    let downloadForm = document.querySelector('.js-download-popup form');
    let menu = document.querySelector('.js-menu');
    let scrollLinks = document.querySelectorAll('.js-scroll-link');
    let popupsWrappers = document.querySelectorAll('.popup__wrapper');
    let discussPopupTrigger = document.querySelector('.js-toggle-discuss-popup');
    let requestPopupTrigger = document.querySelector('.js-toggle-request-popup');
    let telInputs = document.querySelectorAll('input[type="tel"]');
    let mobileErrorsSwiperSW;
    let currPage = 0;

    const constrain = (val, min, max) => {
        return val > max ? max : val < min ? min : val;
    }

    const scrollLinkClick = () => {
        event.preventDefault();

        mobieMenuToggle(false);

        let target = event.target;
        
        document.querySelector(target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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

        if(window.innerWidth <= 780){
            if(mobileErrorsSwiper.dataset.mobile == 'false'){
                // try{
                    document.querySelector('.error__container .swiper-wrapper').insertBefore(errorItems[0], errorItems[1]);
                    document.querySelector('.error .container').appendChild(document.querySelector('.error__item_green'));
                // }
                // catch{}

                let errorsSwiper = new Swiper('.error__container', {
                    spaceBetween: 30,
                    direction: 'horizontal',
                    autoHeight: true,
                    loop: true,
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
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                        },
                        200: {
                            slidesPerView: 1,
                        }
                    }
                });
                mobileErrorsSwiper.dataset.mobile = 'true';
                mobileErrorsSwiperSW = mobileErrorsSwiper.swiper;
                // errorItems = document.querySelectorAll('.error__item');
            }
            else{
                mobileErrorsSwiperSW.update();
            }
        }
        else{
            mobileErrorsSwiper.dataset.mobile = 'false';
    
            if(mobileErrorsSwiper.classList.contains('swiper-container-initialized')){
                mobileErrorsSwiperSW.destroy();
                
                document.querySelector('.error .container').insertBefore(errorItems[0], document.querySelector('.error__container'));
                document.querySelector('.error__container .swiper-wrapper').insertBefore(errorItems[errorItems.length - 1], errorItems[2]);
            }
        }
    }

    const downloadCanadian = () => {
        let filePath = './pdf/50-100m.pdf';

        fetch(filePath, {
            method: 'GET',
        })
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "50-100m.pdf";
            document.body.appendChild(a);
            a.click();    
            a.remove();     
        });
    }

    const downloadScandinavian = () => {
        let filePath = './pdf/16-50m.pdf';

        fetch(filePath, {
            method: 'GET',
        })
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "16-50m.pdf";
            document.body.appendChild(a);
            a.click();    
            a.remove();     
        });
    }

    const submitHandler = () => {
        event.preventDefault();

        let targetForm = event.target;
        let formData = new FormData(targetForm);

        let formInputs = targetForm.querySelectorAll('input');
        let request = new XMLHttpRequest();

        request.open('POST', './php/ajax-mail.php');

        request.onreadystatechange = () => {
            
            if(request.readyState === XMLHttpRequest.DONE) {
                var status = request.status;

                closePopup();


                formData.has('hidden_val') ? openPopup('.js-redirect-popup', null) : openPopup('.js-thx-popup', null);
            }
        };

        formInputs.forEach(input => {
            input.value = '';
        });

        request.send(formData);
    }

    const docBtnClick = index => {
        return () => {
            event.preventDefault();
            
            openPopup('.js-download-popup', event.target.dataset.place);
            document.querySelector('.js-download-popup').querySelector('.js-hidden-input').value = index;
        }
    }

    const downloadDoc = index => {
        let path = "./pdf/projects/" + index + ".pdf"
        window.open(path, "_blank");
    }

    const mobieMenuToggle = (state=null) => {
        switch (state) {
            case true:
                burgerBtn.classList.add('active');
                menu.classList.add('active');
                break;

            case false:
                burgerBtn.classList.remove('active');
                menu.classList.remove('active');
                break;
        
            default:
                burgerBtn.classList.toggle('active');
                menu.classList.toggle('active');
                break;
        }
        
    }

    const openPopup = (selector, place) => {

        let popup = document.querySelector(selector);
        popup.classList.add('active');

        switch (place) {
            case "header":
                popup.querySelector('form').addEventListener('submit', () => ym(67488328,'reachGoal','callback_header'));
                break;
            case "project":
                popup.querySelector('form').addEventListener('submit', () => ym(67488328,'reachGoal','download_project'));
                break;
            case "how":
                popup.querySelector('form').addEventListener('submit', () => ym(67488328,'reachGoal','how_we_work'));
                break;
            case "question":
                popup.querySelector('form').addEventListener('submit', () => ym(67488328,'reachGoal','question'));
                break;
            case "footer":
                popup.querySelector('form').addEventListener('submit', () => ym(67488328,'reachGoal','callback_footer'));
                break;
        
            default:
                break;
        }
    }

    const closePopup = () => {
        document.querySelectorAll('.popup__wrapper').forEach(item => item.classList.remove('active'));
    }

    const portfolioSwiper = new Swiper('.portfolio__container', {
        slidesPerView: 1,
        spaceBetween: 115,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.portfolio__container .portfolio__control_next',
            prevEl: '.portfolio__container .portfolio__control_prev',
        }
    });

    const portfolioSwiperHidden = new Swiper('.portfolio__container.portfolio__container_hidden', {
        slidesPerView: 1,
        spaceBetween: 115,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.portfolio__container.portfolio__container_hidden .portfolio__control_next',
            prevEl: '.portfolio__container.portfolio__container_hidden .portfolio__control_prev',
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

    quizInputs.forEach(input => input.addEventListener('input', inputChangeHandler));

    projectButtons.forEach(btn => btn.addEventListener('click', projectsPageChange));

    nextBtns.forEach(btn => btn.addEventListener('click', quizShowNextPage));

    document.querySelector('.projects__more .projects__open').addEventListener('click', () => {
        document.querySelectorAll('.projects__container_hidden').forEach(container => container.classList.toggle('active'));
        event.target.style.display = 'none';
        document.querySelector('.projects__page.active .projects__container_hidden').scrollIntoView({block: 'start',});
    });

    downloadForm.addEventListener('submit', () => downloadDoc(downloadForm.querySelector('.js-hidden-input').value));

    document.querySelector('.js-table-toggle').addEventListener('click', () => {
        document.querySelector('.materials__table_hidden').classList.toggle('active');
        document.querySelector('.materials__table_hidden').scrollIntoView({
            // behavior: 'smooth',
            block: 'start',
        });
        event.target.style.display = "none";
    });

    forms.forEach(form => form.addEventListener('submit', submitHandler));

    document.querySelectorAll('.js-download-canadian').forEach(item => item.addEventListener('click', downloadCanadian));

    document.querySelectorAll('.js-download-scandinavian').forEach(item => item.addEventListener('click', downloadScandinavian));

    burgerBtn.addEventListener('click', mobieMenuToggle);

    docButtons.forEach((item, index) => item.addEventListener('click', docBtnClick(index)));

    scrollLinks.forEach(item => item.addEventListener('click', scrollLinkClick));

    //
    // Попапы
    //

    popupBtn.forEach(btn => btn.addEventListener('click', () => openPopup('.js-common-popup', btn.dataset.place)));

    document.querySelectorAll('.js-close-popup').forEach(btn => btn.addEventListener('click', closePopup));

    document.querySelectorAll('.js-toggle-q_popup').forEach(btn => btn.addEventListener('click', () => openPopup('.js-question-popup', btn.dataset.place)));

    popupsWrappers.forEach(wrapper => wrapper.addEventListener('click', () => event.target.classList.contains('popup__wrapper') ? closePopup() : null));

    discussPopupTrigger.addEventListener('click', () => openPopup('.js-discuss-popup', event.target.dataset.place));

    requestPopupTrigger.addEventListener('click', () => openPopup('.js-request-popup', event.target.dataset.place));

    //
    //
    //

    document.querySelector('.portfolio .button_portfolio').addEventListener('click', () => {
        document.querySelector('.portfolio .portfolio__container_hidden').classList.toggle('active');
        document.querySelector('.portfolio .button_portfolio').style.display = 'none';
    });

    document.querySelector('.banner .button_banner').addEventListener('click', () => document.querySelector('.examples').scrollIntoView({ behavior: 'smooth', block: 'start', }));

    window.addEventListener('resize', resizeHandler);

    telInputs.forEach(input => {
        input.addEventListener('focus', _ => {
            if(!/^\+\d*$/.test(input.value))
              input.value = '+7 (';
        });
          
        input.addEventListener('keypress', event => {
        let currPos = input.value.length;
        if((!/\d/.test(event.key) || (input.value.length == 18))){
            event.preventDefault();
        }
        else if ((input.value.length <= 3)){
            input.value = '+7 (';
        }
        switch (currPos) {
            case 7:
                input.value += ") ";
                break;
            case 12:
                input.value += "-";
                break;
            case 15:
                input.value += "-";
                break;
        
            default:
                break;
        }
        });
    });

    resizeHandler();
    quizShowPage(currPage);
});
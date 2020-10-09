"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const quizPages = document.querySelectorAll('.js-page');
    const quizRequiredInputs = document.querySelectorAll('.js-required-input');
    const quizPrevStepBtns = document.querySelectorAll('.js-quiz-prev-page');
    const quizNextStepBtns = document.querySelectorAll('.js-quiz-next-page');

    const recallTriggers = document.querySelectorAll('.js-recall');
    const orderTriggers = document.querySelectorAll('.js-order');
    const degustationTriggers = document.querySelectorAll('.js-degustation');
    const downloadTriggers = document.querySelectorAll('.js-download');
    const thxTriggers = document.querySelectorAll('.js-thx');
    const closeTriggers = document.querySelectorAll('.js-popup-close');

    const forms = document.querySelectorAll('form');

    let telInputs = document.querySelectorAll('.js-mask');


    const openPopup = (selector, state=null) => {

        if(state == true){
            document.querySelector(selector).classList.add('active');
        }
        else if(state == false){
            document.querySelector(selector).classList.remove('active');
        }
        else {
            return () => {
                document.querySelector(selector).classList.toggle('active');
            }
        }
    }

    const quizShowPage = (pageNum=0) => {
        quizPages.forEach(page => {
            page.classList.remove('active');

            if(page.dataset.page == pageNum) {
                page.classList.add('active');
                return;
            }
        });
    }

    const toggleNextBtn = (state=null) => {
        if(state == true){
            quizNextStepBtns.forEach(btn => btn.classList.add('active'));
        }
        else if(state == false){
            quizNextStepBtns.forEach(btn => {
                if(!btn.parentNode.parentNode.classList.contains('visited')){
                    btn.classList.remove('active');
                }
            });
        }
        else {
            return () => {
                quizNextStepBtns.forEach(btn => btn.classList.toggle('active'));
            }
        }
    }

    const constrain = (val, min, max) => val > max ? max : val < min ? min : val;

    const quizShowNextPage = () => {
        let currPage = 0;

        quizPages.forEach(page => page.classList.contains('active') ? currPage = Number(page.dataset.page) : null);

        currPage = constrain(currPage + 1, 0, 3);

        quizShowPage(currPage);
        quizPages[currPage - 1].classList.add('visited');
        toggleNextBtn(false);
    }

    const quizShowPrevPage = () => {
        let currPage = 0;

        quizPages.forEach(page => page.classList.contains('active') ? currPage = Number(page.dataset.page) : null);

        currPage = constrain(currPage - 1, 0, 3);

        quizShowPage(currPage);
    }

    const closePopup = () => document.querySelectorAll('.popup').forEach(popup => popup.classList.remove('active'));

    const resizeHandler = () => {
        if(window.innerWidth < 730){
            // mainSwiperNode.destroy();
        }
        else{
            mainSwiperNode.update();
        }
        mainSwiperNode.update();
    }

    const formValidate = input => {
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
            case 17:
                // Последняя цифра
                break;
        
            default:
                break;
        }
        });
    }

    const formSubmitHandler = async () => {
        event.preventDefault();

        let targetForm = event.target;
        let formData = new FormData(targetForm);

        let formInputs = targetForm.querySelectorAll('input');
        
        await fetch('./php/ajax-mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if(response.status == 200){
                closePopup();
                openPopup('.js-popup-thx', true);
            }
            else{
                closePopup();
                openPopup('.js-popup-error', true);
            }
        })
        .catch(() => {
            closePopup();
            openPopup('.js-popup-error', true);
        });

        formInputs.forEach(input => {
            input.value = '';
        });
    }

    const mainSwiper = new Swiper('.main', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        updateOnWindowResize: true,
        mousewheel: true,
        direction: 'vertical',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    const mainSwiperNode = document.querySelector('.main').swiper;

    recallTriggers.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-recall')));

    orderTriggers.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-order')));

    degustationTriggers.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-degustation')));

    downloadTriggers.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-download')));

    thxTriggers.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-thx')));

    closeTriggers.forEach(trigger => trigger.addEventListener('click', closePopup));

    quizNextStepBtns.forEach(btn => btn.addEventListener('click', quizShowNextPage));

    quizPrevStepBtns.forEach(btn => btn.addEventListener('click', quizShowPrevPage));

    quizRequiredInputs.forEach(input => input.addEventListener('input', () => toggleNextBtn(true)));

    forms.forEach(form => form.addEventListener('submit', formSubmitHandler));
    
    window.addEventListener('resize', resizeHandler);

    telInputs.forEach(input => formValidate(input));

    resizeHandler();
    quizShowPage();

    // mainSwiperNode.slideTo(1, 0, true);
});
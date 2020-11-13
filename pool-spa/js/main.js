document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.js-usefull-item');
    const filterTriggers = document.querySelectorAll('.js-filter-item');
    const itemCounters = document.querySelectorAll('.js-item-counter');

    const categoriesTrgigger = document.querySelector('.js-categories-trigger');
    const categories = document.querySelector('.js-categories');

    const popupOverlay = document.querySelector('.js-popup-overlay');
    const popupCloseBtns = document.querySelectorAll('.js-popup-close');
    const popupRecallBtns = document.querySelectorAll('.js-open-popup-recall');

    const burger = document.querySelector('.js-menu');

    const whichPage = () => {
        const pageIdentifier = document.querySelector('.js-page-identifier');

        return pageIdentifier.dataset.page;
    }

    const toggleAccordion = (selector, mode = false) => {
        return () => {
            const target = event.target;
            const targetParent = target.parentNode;

            if(!mode){
                document.querySelectorAll(selector).forEach(trigger => trigger.parentNode.classList.remove('active'));
            }
            
            targetParent.classList.toggle('active');
        }
    }

    const constrain = (val, min, max) => {
        return val > max ? max : val < min ? min : val;
    }

    const itemCounterInit = counter => {
        const incrementor = counter.querySelector('.counter__button_inc'), 
              decrementor = counter.querySelector('.counter__button_dec'),
              input = counter.querySelector('.counter__input');
        
        let currVal = parseInt(input.value);

        incrementor.addEventListener('click', () => {
            currVal = constrain(currVal + 1, 1, 1000);
            input.value = currVal;
        });

        decrementor.addEventListener('click', () => {
            currVal = constrain(currVal - 1, 1, 1000);
            input.value = currVal;
        });

        input.addEventListener('input', () => {
            input.value = constrain(input.value, 0, 1000);
        });

        input.addEventListener('change', () => {
            input.value = constrain(input.value, 1, 1000);
        });
    }

    const catalogSwiperInit = () => {
        let catalogSwiper = new Swiper('.catalog__swiper-container', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 40,
            navigation: {
                prevEl: '.catalog__swiper .catalog__swiper-control_prev',
                nextEl: '.catalog__swiper .catalog__swiper-control_next'
            },
        });
    }

    const catalogNoUiInit = () => {
        const noUiSliderNode = document.querySelector('.js-catalog-noui');
        const lowerInput = noUiSliderNode.parentNode.querySelector('.catalog__noui-input_lower');
        const upperInput = noUiSliderNode.parentNode.querySelector('.catalog__noui-input_upper');
        const startVal = parseInt(noUiSliderNode.dataset.min);
        const endVal = parseInt(noUiSliderNode.dataset.max);

        if(!noUiSliderNode.classList.contains('noUi-target')){
            noUiSlider.create(noUiSliderNode, {
                start: [startVal, endVal],
                connect: true,
                step: 1,
                range: {
                    'min': startVal,
                    'max': endVal
                }
            });
        }
        else{            
            noUiSliderNode.noUiSlider.set([startVal, endVal]);
        }

        noUiSliderNode.noUiSlider.on('update', () => {
            const lowerVal = parseInt(noUiSliderNode.noUiSlider.get()[0]);
            const upperVal = parseInt(noUiSliderNode.noUiSlider.get()[1]);

            lowerInput.value = lowerVal;
            upperInput.value = upperVal;
        });

        lowerInput.addEventListener('input', () => {
            const inputValue = event.target.value;
            noUiSliderNode.noUiSlider.set([inputValue, null]);
        });

        upperInput.addEventListener('input', () => {
            const inputValue = event.target.value;
            noUiSliderNode.noUiSlider.set([null, inputValue]);
        });
    }

    const toggleCategories = () => {
        categoriesTrgigger.classList.toggle('active');
        categories.classList.toggle('active');

        document.addEventListener('click', () => {
            if(!event.target.classList.contains('js-categories') && !event.target.classList.contains('js-categories-trigger')){
                toggleCategories();
            }
        });
    }

    const toggleMenu = () => {
        burger.classList.toggle('active');
    }

    const closePopups = () => {
        const popups = popupOverlay.querySelectorAll('.popup');

        popups.forEach(popup => popup.classList.remove('active'));
        popupOverlay.classList.remove('active');
    }

    const openPopup = (selector, state = null) => {
        const targetPopup = popupOverlay.querySelector(selector);

        popupOverlay.addEventListener('click', () => {
            if(event.target.classList.contains('js-popup-overlay')){
                closePopups();
            }
        });

        if(state == null){
            return () => {
                targetPopup.classList.add('active');
                popupOverlay.classList.add('active');
            }
        }
        else if(state == true){
            targetPopup.classList.add('active');
            popupOverlay.classList.add('active');
        }
        else if(state == false){
            targetPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
        }
    }

    const heroSwiperInit = () => {
        let heroSwiper = new Swiper('.hero', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                prevEl: '.slide__control_prev',
                nextEl: '.slide__control_next'
            },
        });
    }

    accordionTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion('.js-usefull-item', false)));
    filterTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion('.js-usefull-item', true)));
    
    popupCloseBtns.forEach(trigger => trigger.addEventListener('click', closePopups));
    popupRecallBtns.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-recall')));

    burger.addEventListener('click', toggleMenu);
    categoriesTrgigger.addEventListener('click', toggleCategories);

    if(whichPage() == 'index'){
        heroSwiperInit();
    }
    else if(whichPage() == 'cart'){
        itemCounters.forEach(counter => itemCounterInit(counter));

        // openPopup('.js-popup-recall', true);
    }
    else if(whichPage() == 'catalog'){
        catalogNoUiInit();
        catalogSwiperInit();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.js-usefull-item');
    const filterTriggers = document.querySelectorAll('.js-filter-item');
    const itemCounters = document.querySelectorAll('.js-item-counter');

    const categoriesTrgigger = document.querySelector('.js-categories-trigger');
    const categories = document.querySelector('.js-categories');

    const popupOverlay = document.querySelector('.js-popup-overlay');
    const popupCloseBtns = document.querySelectorAll('.js-popup-close');
    const popupRecallBtns = document.querySelectorAll('.js-open-popup-recall');
    const popupInstructionBtns = document.querySelectorAll('.js-open-popup-instruction');
    const popupLayoutBtns = document.querySelectorAll('.js-open-popup-layout');

    const burger = document.querySelector('.js-menu');
    const menu = document.querySelector('.js-menu-content');
    const search = document.querySelector('.js-search');
    const searchBtn = document.querySelector('.js-search-button');

    let swiperArrival_1_node;
    let swiperArrival_1;

    let swiperArrival_2_node;
    let swiperArrival_2;

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
            breakpoints: {
                1020: {
                    slidesPerView: 3,
                },
                560: {
                    slidesPerView: 2,
                },
                300: {
                    slidesPerView: 1,
                }
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

    const toggleMenu = (state = null) => {
        if(state == null){
            return () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
            }
        }
        else if(state){
            burger.classList.add('active');
            menu.classList.add('active');
        }
        else{
            burger.classList.remove('active');
            menu.classList.remove('active');
        }
    }

    const toggleSearch = () => {
        search.classList.toggle('active');

        document.addEventListener('click', () => {
            if(event.target.classList.contains('search__close')){
                toggleSearch();
            }
        });
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

    const itemSwiperInit = () => {
        let swiperThumbs = new Swiper('.slider-thumbs', {
            spaceBetween: 10,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                1080: {
                    slidesPerView: 4,
                },
                400: {
                    slidesPerView: 6,
                },
                300: {
                    slidesPerView: 5,
                }
            }
        });

        let swiper = new Swiper('.slider', {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 100,
            loop: true,
            navigation: {
                prevEl: '.slider .slider__control_prev',
                nextEl: '.slider .slider__control_next',
            },
            thumbs: {
                swiper: swiperThumbs,
            }
        });
    }

    const resizeHandler = () => {
        if(whichPage() == 'compare'){
            if(window.innerWidth < 998){
                document.querySelector('.compare>.container').insertBefore(document.querySelector('.table__params'), document.querySelector('.compare__container'));
                document.querySelector('.compare>.container').insertBefore(document.querySelector('.table__head'), document.querySelector('.compare__container'));
            }
            else{
                document.querySelector('.table__head').prepend(document.querySelector('.table__params'));
                document.querySelector('.compare__table.table').prepend(document.querySelector('.table__head'));
            }
        }
        else if(whichPage() == 'item'){
            if(window.innerWidth < 590){
                if(!document.querySelector('.arrival__container_1').classList.contains('swiper-container-initialized')){
                    swiperArrival_1 = new Swiper('.arrival__container_1', {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        navigation: {
                            prevEl: '.arrival__container_1 .arrival__control_prev',
                            nextEl: '.arrival__container_1 .arrival__control_next',
                        },
                        breakpoints: {
                            470: {
                                slidesPerView: 2,
                                centeredSlides: false,
                            },
                            300: {
                                slidesPerView: 1,
                                centeredSlides: true,
                            }
                        }
                    });
                    swiperArrival_1_node = document.querySelector('.arrival__container_1').swiper;
                }

                if(!document.querySelector('.arrival__container_2').classList.contains('swiper-container-initialized')){
                    swiperArrival_2 = new Swiper('.arrival__container_2', {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        navigation: {
                            prevEl: '.arrival__container_2 .arrival__control_prev',
                            nextEl: '.arrival__container_2 .arrival__control_next',
                        },
                        breakpoints: {
                            470: {
                                slidesPerView: 2,
                                centeredSlides: false,
                            },
                            300: {
                                slidesPerView: 1,
                                centeredSlides: true,
                            }
                        }
                    });
                    swiperArrival_2_node = document.querySelector('.arrival__container_2').swiper;
                }
            }
            else {
                if(document.querySelector('.arrival__container_1').classList.contains('swiper-container-initialized')){
                    swiperArrival_1_node.destroy();
                }
                if(document.querySelector('.arrival__container_2').classList.contains('swiper-container-initialized')){
                    swiperArrival_2_node.destroy();
                }
            }
        }

        if(window.innerWidth > 1080){
            toggleMenu(false);
        }

    }

    accordionTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion('.js-usefull-item', false)));
    filterTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion('.js-usefull-item', true)));
    
    popupCloseBtns.forEach(trigger => trigger.addEventListener('click', closePopups));
    popupRecallBtns.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-recall')));
    popupInstructionBtns.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-instruction')));
    popupLayoutBtns.forEach(trigger => trigger.addEventListener('click', openPopup('.js-popup-layout')));

    burger.addEventListener('click', toggleMenu());
    searchBtn.addEventListener('click', toggleSearch);
    categoriesTrgigger.addEventListener('click', toggleCategories);

    window.addEventListener('resize', resizeHandler);

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
    else if(whichPage() == 'item'){
        itemSwiperInit();
    }

    // toggleMenu(true);

    resizeHandler();
});
document.addEventListener("DOMContentLoaded", () => {
    const headerDropdownTriggers = document.querySelectorAll('.js-open-header-dropdown');
    const productCounters = document.querySelectorAll('.product__count');
    const menuBtn = document.querySelector('.js-burger');
    const scrollTopBtn = document.querySelector('.js-scroll-to-top');
    const cart = document.querySelector('.js-open-cart');
    const popupTrigger = document.querySelectorAll('.js-open-recall-popup');
    const headerNavLinks = document.querySelectorAll('.header .nav .nav__link');
    const popupCloseTrigger = document.querySelectorAll('.js-close-popup');
    const pageUrl = window.location.pathname;

    const headerDropdownToggle = (state) => {
        if(state === undefined){
            return () => {
                const headerDropdown = event.target.parentNode.parentNode;
                headerDropdown.classList.toggle('active');
            }
        }
        else if(state === true){
            const headerDropdown = document.querySelector('.header__dropdown');
            headerDropdown.classList.add('active');
        }
        else if(state === false){
            const headerDropdown = document.querySelector('.header__dropdown');
            headerDropdown.classList.remove('active');
        }
    }

    const toggleElement = (elements, state) => { //Передаем строку или массив строк селекторов и состояние
        if(state === undefined){
            return () => {
                if(typeof(elements) == "object"){
                    elements.forEach(elem => {
                        document.querySelector(elem).classList.toggle('active');
                    });
                }
                else if (typeof(elements) == "string"){
                    document.querySelector(elements).classList.toggle('active');
                }
            }
        }
        else if(state === true){
            if(typeof(elements) == "object"){
                elements.forEach(elem => {
                    document.querySelector(elem).classList.add('active');
                });
            }
            else if (typeof(elements) == "string"){
                document.querySelector(elements).classList.add('active');
            }
        }
        else if(state === false){
            if(typeof(elements) == "object"){
                elements.forEach(elem => {
                    document.querySelector(elem).classList.remove('active');
                });
            }
            else if (typeof(elements) == "string"){
                document.querySelector(elements).classList.remove('active');
            }
        }
    }

    const constrain = (val, min, max) => { // Ф-ция ограничивающая число в заданных пределах
        return val > max ? max : val < min ? min : val;
    }

    const scrollTopBtnHandler = () => {
        document.querySelector('#banner').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    const windowResizeHandler = () => {
        if(window.innerWidth <= 940){
            document.querySelector('.header__wrap').insertBefore(menuBtn, document.querySelector('.header__side'));
            document.querySelector('.banner__content').appendChild(document.querySelector('.header__contacts'));

            document.querySelectorAll('.example__body').forEach(example => {
                try{
                    example.insertBefore(example.nextElementSibling, example.querySelector('.example__text'));
                }
                catch{}
            });
        }
        else{
            document.querySelectorAll('.example').forEach(example => {
                example.appendChild(example.querySelector('.example__img'));
            });
            document.querySelectorAll('.header__side')[1].insertBefore(document.querySelector('.header__contacts'), document.querySelector('.header__cart'));

            document.querySelector('.header').insertBefore(menuBtn, document.querySelector('.header .container'));
        }

        try{
            main_PromoSwiperNode.update();
            main_ReviewsSwiperNode.update();
        }
        catch{}
    }

    const windowScrollHandler = () => {
        if(window.pageYOffset > 0){
            toggleElement(['.header', '.js-scroll-to-top'], true);
        }
        else{
            toggleElement(['.header', '.js-scroll-to-top'], false);
        }
    }

    productCounters.forEach(counter => {
        counter.querySelector('.js-product-dec').addEventListener('click', () => {
            let target = event.target;
            let val = Number(target.nextSibling.value);

            val -= 1;

            target.nextSibling.value = constrain(val, 1, 100);
        });
        counter.querySelector('.js-product-inc').addEventListener('click', () => {
            let target = event.target;
            let val = Number(target.previousSibling.value);

            val += 1;

            target.previousSibling.value = constrain(val, 1, 10000);
        });
    });

    //Слайдеры на главной

    try{
        let main_PromoSwiper = new Swiper('.promo__wrapper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            grabCursor: true,
            updateOnWindowResize: true,
            autoplay: {
                delay: 3000,
              },
            pagination: {
                el: ".promo .promo__pagination",
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                720: {
                    spaceBetween: 30,
                }
            }
        });

        let main_ReviewsSwiper = new Swiper('.reviews .reviews__swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            grabCursor: true,
            updateOnWindowResize: true,
            pagination: {
                el: ".reviews .reviews__pagination",
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.reviews__control.reviews__control_next',
                prevEl: '.reviews__control.reviews__control_prev',
            },
            breakpoints: {
                940: {
                    spaceBetween: 30,
                }
            },
        });

        var main_PromoSwiperNode = document.querySelector('.promo .promo__wrapper').swiper;
        var main_ReviewsSwiperNode = document.querySelector('.reviews .reviews__swiper').swiper;
    }
    catch{}   

    //Слайдер на странице с акциями

    try{
        let promoPageSwiper = new Swiper('.promos__swiper', {
            
            spaceBetween: 10,
            loop: true,
            navigation: {
                prevEl: '.promos__control_prev',
                nextEl: '.promos__control_next'
            },
            pagination: {
                el: '.promos__pagination',
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                750: {
                    slidesPerView: 3,
                },
                500: {
                    slidesPerView: 2,
                },
                300: {
                    slidesPerView: 1,
                }
            }
        });
    }
    catch{}

    menuBtn.addEventListener('click', toggleElement(['.js-burger', '.js-menu']));
    headerDropdownTriggers.forEach(trigger => trigger.addEventListener('click', headerDropdownToggle()));
    scrollTopBtn.addEventListener('click', scrollTopBtnHandler);
    cart.addEventListener('click', toggleElement('.js-cart'));
    window.addEventListener('resize', windowResizeHandler);
    window.addEventListener('scroll', windowScrollHandler);

    popupTrigger.forEach(trigger => {
        trigger.addEventListener('click', toggleElement('.js-recall-popup'));
    });

    popupCloseTrigger.forEach(trigger => {
        trigger.addEventListener('click', toggleElement('.js-recall-popup'));
    });

    headerNavLinks.forEach(link => {
        if(pageUrl.endsWith(link.getAttribute('href').replace('.', ''))){
            link.classList.add('active');
        }
        else{
            link.classList.remove('active');
        }
    });

    windowResizeHandler();
    windowScrollHandler();
});
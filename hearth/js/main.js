document.addEventListener("DOMContentLoaded", () => {
    const headerDropdownTrigger = document.querySelector('.js-open-header-dropdown');
    const productCounters = document.querySelectorAll('.product__count');
    const menuBtn = document.querySelector('.js-burger');
    const cart = document.querySelector('.js-open-cart');

    const headerDropdownToggle = (state) => {
        if(state === undefined){
            return () => {
                const headerDropdown = document.querySelector('.header__dropdown');
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
            toggleElement('.header', true);
        }
        else{
            toggleElement('.header', false);
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

    menuBtn.addEventListener('click', toggleElement(['.js-burger', '.js-menu']));
    headerDropdownTrigger.addEventListener('click', headerDropdownToggle());
    cart.addEventListener('click', toggleElement('.js-cart'));
    window.addEventListener('resize', windowResizeHandler);
    window.addEventListener('scroll', windowScrollHandler);

    windowResizeHandler();
    windowScrollHandler();
});
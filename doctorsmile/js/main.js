"use strict";

document.addEventListener('DOMContentLoaded', () => {
    let popupTriggers = document.querySelectorAll('.popup-request-open');
    let popupFAQTriggers = document.querySelectorAll('.popup-faq-open');
    let popupCloseTriggers = document.querySelectorAll('.popup-close');
    let popups = document.querySelectorAll('.popup');
    let popupSucsessTrigger = document.querySelectorAll('.popup-sucsess-open');
    let menuBtn = document.querySelector('.menu-open');
    let sliders = document.querySelectorAll('.uk-slider-container');
    let spoilerLink = document.querySelector('.spoiler-link');
    let forms = document.querySelectorAll('form');
    let mobileSwiper = document.querySelector('.faqs__themes');
    let mobileSwiperSW = document.querySelector('.faqs__themes');
    const pagePath = window.location.pathname;

    const toggleSpoiler = () => {
        event.preventDefault();

        let parent = event.target.parentNode;

        while(!parent.classList.contains('spoiler-text')){
            parent = parent.parentNode
        }

        let textContainer = parent.querySelector('.about__text-wrap');

        let textContainerChildren = Array.from(textContainer.children);

        let totalHeight = 200;

        textContainerChildren.forEach(item => {
            totalHeight += item.offsetHeight;
        });

        textContainer.classList.toggle('open');
        if(textContainer.classList.contains('open')){
            textContainer.style.maxHeight = totalHeight + "px";
        }
        else{
            textContainer.removeAttribute('style');
        }
    }

    const updSlidersPagination = () => { // Пагинация у слайдеров
        setTimeout(() => {
            try{
                sliders.forEach(slider => {
                    try{
                        let paginationTotal = slider.querySelectorAll('.slider__pagination-total');
                        let sliderItems = slider.querySelectorAll('.uk-slider-items li');
                        let sliderItemsActive = slider.querySelectorAll('li.uk-active');
        
                        paginationTotal.forEach(item => {
                            item.innerText = sliderItems.length - sliderItemsActive.length + 1;
                        });
    
                        let counter = 0,
                            activePos;
    
                        sliderItems.forEach(item => {
                            if(item.classList.contains('uk-active') && activePos == undefined){
                                activePos = counter;
                            }
                            counter += 1;
                        });
                        let paginationActive = slider.querySelectorAll('.slider__pagination-active');
                        paginationActive.forEach(span => {
                            span.innerText = activePos + 1;
                        });
    
                    }   
                    catch{}
        
                    UIkit.slider(slider, {finite: true});
    
                    slider.addEventListener('itemshow', () => {
                        let target = event.target;
                        let targetWrap = target.parentNode;
    
                        let sliderItems = targetWrap.querySelectorAll('li');
                        let counter = 0,
                            activePos;
    
                        sliderItems.forEach(item => {
                            if(target == item){
                                activePos = counter;
                            }
                            counter += 1;
                        });
    
                        let paginationActive = slider.querySelectorAll('.slider__pagination-active');
                        paginationActive.forEach(span => {
                            span.innerText = activePos + 1;
                        });
                    });
                });
            }
            catch{}

        }, 200);
    }

    const faqActiveCategorySync = () => {
        let path = pagePath;

        if(path.indexOf('faq/') + 1){

            document.querySelector('.faqs__wrap').querySelectorAll('.faqs__theme').forEach(theme => {
                theme.classList.remove('active');
            });

            document.querySelector('.faqs__wrap').querySelector(`a[href="${path}"]`).classList.add('active');;
        }
    }

    const accordionTitleClick = () => {
        let target = event.target;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }

    const toggleMenu = (btnState) => {
        const burgerBtn = document.querySelector('.menu-open');
        const menu = document.querySelector('.mobile-menu');
        
        if(typeof(btnState) != 'boolean'){
            if(burgerBtn.classList.contains('active')){
                burgerBtn.classList.remove('active');
                menu.classList.remove('active');
            }
            else{
                burgerBtn.classList.add('active');
                menu.classList.add('active');
            }
        }
        else{
            if(btnState){
                burgerBtn.classList.add('active');
                menu.classList.add('active');
                
                return;
            }
            burgerBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    }

    const mobileSwiperCheck = () => {
        try{
            if(window.innerWidth <= 1160 && mobileSwiper.dataset.mobile == 'false'){
                    let faqSwiper = new Swiper('.faqs__themes', {
                        spaceBetween: 30,
                        direction: 'horizontal',
                        updateOnWindowResize: true,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'progressbar',
                        },
                        breakpoints: {
                            920: {
                                slidesPerView: 5,
                            },
                            720: {
                                slidesPerView: 4,
                            },
                            600: {
                                slidesPerView: 3,
                            },
                            300: {
                                slidesPerView: 2,
                            }
                        }
                    });
                    mobileSwiper.dataset.mobile = 'true';
                    mobileSwiperSW = mobileSwiper.swiper;
            }
        }
        catch{}
        
        if(window.innerWidth > 1160){
            try{
                mobileSwiper.dataset.mobile = 'false';
    
                if(mobileSwiper.classList.contains('swiper-container-initialized')){
                    mobileSwiperSW.destroy();
                    // delete mobileSwiper;
                }
            }
            catch{}
        }
    }

    const scrollHandler = () => {
        if(window.innerWidth < 1100){
            let header = document.querySelector('.header');
            let mobileMenu = document.querySelector('.mobile-menu');

            if(window.pageYOffset > 0){
                header.classList.add('fixed');
                mobileMenu.style.paddingTop = "60px";
            }
            else{
                header.classList.remove('fixed');
                mobileMenu.style.paddingTop = "60px";
            }
        }
    }

    const mobileCheck = () => {
        let headerItems = document.querySelectorAll('.header__item');

        if(window.innerWidth <= 1100){
            let mobileMenuContainer = document.querySelector('.mobile-menu');

            headerItems.forEach(item => {
                mobileMenuContainer.appendChild(item);
            });
        }
        else{
            let menuWrap = document.querySelector('.header__content');

            headerItems.forEach(item => {
                menuWrap.appendChild(item);
            });
        }
        
        addServices();
        
        if(window.innerWidth <= 990){
            let mobileMenuContainer = document.querySelector('.mobile-menu');
            let navBar = document.querySelector('.nav');

            mobileMenuContainer.insertBefore(navBar, document.querySelector('.mobile-menu__services'));
            mobileMenuContainer.insertBefore(headerItems[headerItems.length - 1], headerItems[headerItems.length - 2]);
            document.querySelector('.mobile-menu .header__dropdown-span img').setAttribute('src', '/dentko/img/info-w.svg');
        }
        else{
            let header = document.querySelector('.header');
            let navBar = document.querySelector('.nav');

            header.after(navBar);
            toggleMenu(false);
        }

        if(window.innerWidth <= 660) {
            let doctorNames = document.querySelectorAll('.doctor__name');

            doctorNames.forEach(name => {
                let words = name.innerText.split(' ');
                let newWords = [];
                words.forEach( (word, index) => {
                    if(index > 0){
                        word = word[0] + ".";
                    }
                    newWords.push(word);
                });
                newWords = newWords.join(' ');
                name.innerText = newWords;
            });
        }
        else{
            try{
                let doctorNames = document.querySelectorAll('.doctor__name');

                doctorNames.forEach((name, index) => {
                    name.innerText = prevDoctorNames[index].innerText;
                    console.log(prevDoctorNames[index].innerText);
                });
            }
            catch{}
        }

        mobileSwiperCheck();
    }

    const addServices = () => {
        let servicesLink = document.querySelector('.nav__dropdown-link');
        if(window.innerWidth <= 990){
            servicesLink.parentNode.style.display = "none";
        }
        else{
            servicesLink.parentNode.removeAttribute('style');
        }
    }

    const openPopup = (popupSelector) => { // Открывается попап с переданным спец-классом
        return () => {
            event.preventDefault();

            let popup = document.querySelector(popupSelector);
            let popupItem = popup.children[0];

            closePopup();

            popup.classList.add('active');
            popupItem.classList.add('active');
        }
    }

    const closePopup = () => { // Закрываются все попапы
        event.preventDefault();

        popups.forEach(item => {
            item.classList.remove('active');
            item.parentElement.classList.remove('active');
        });
    }

    const formSubmit = () => {
        event.preventDefault();

        let isFormValid = true;

        let targetForm = event.target;
        let formData = new FormData(targetForm);
        let formFields = ['name', 'tel', 'mail'];
        let formRegExp = [/[а-яА-я]{2}/i, /\d{12}/, /\w+\@\w{1,}\.\w{1,}/i];

        formFields.forEach((field, index) => {
            if(formData.has(field)){
                let fieldData = formData.get(field).toLowerCase();
                let fieldInput = targetForm.querySelector('input[name="' + field + '"]');
                if(formRegExp[index].exec(fieldData) === null){
                    isFormValid = false;
                    
                    fieldInput.parentNode.classList.add('valid-err');
                    fieldInput.focus();
                }
                else{
                    fieldInput.parentNode.classList.remove('valid-err');
                }
            }
        });
        
        if(isFormValid){
            let formInputs = targetForm.querySelectorAll('input.uk-input');
            let request = new XMLHttpRequest();

            request.open('POST', '/dentko/ajax-mail.php');

            request.onreadystatechange = function () {
                
                if(request.readyState === XMLHttpRequest.DONE) {
                    var status = request.status;

                    closePopup();

                    if (status === 0 || (status >= 200 && status < 400)) {
                        openPopup('.popup-sucsess')();
                    } else {
                        openPopup('.popup-error')();
                    }
                }
            };

            formInputs.forEach(input => {
                input.value = '';
            });

            request.send(formData);
        }
    }

    forms.forEach(form => {
        form.addEventListener('submit', formSubmit);
    });

    menuBtn.addEventListener('click', toggleMenu);

    popupTriggers.forEach(item => {
        item.addEventListener('click', openPopup('.popup-request'));
    });

    popupFAQTriggers.forEach(item => {
        item.addEventListener('click', openPopup('.popup-faq'));
    });

    popupSucsessTrigger.forEach(item => {
        item.addEventListener('click', openPopup('.popup-sucsess'));
    });

    popupCloseTriggers.forEach(item => {
        item.addEventListener('click', closePopup);
    });

    window.addEventListener('scroll', scrollHandler);
    
    window.addEventListener('resize', mobileCheck);

    if(1){
        new Swiper('.js-doctors-swiper', {
            speed: 600,
            navigation: {
                nextEl: '.doctors .slider-next',
                prevEl: '.doctors .slider-prev',
            },
            pagination: {
                type: 'bullets',
                el: '.doctors__navigation',
                clickable: true,
            }
        });
    }

    try{
        let bannerSwiper = new Swiper('.js-hero-swiper', {
            spaceBetween: 0,
            loop: true,
            slidesPerView: 1,
            updateOnWindowResize: true,
            speed: 600,
            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            }
        });

        let galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 30,
            slidesPerView: 3,
            updateOnWindowResize: true,
            freeMode: true,
            direction: 'horizontal',
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                860: {
                    direction: 'vertical',
                }
            }
        });
    
        let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 30,
        direction: 'horizontal',
        slidesPerView: 1,
        updateOnWindowResize: true,
        loop: true,
        navigation: {
            nextEl: 'a.swiper.slider-next',
            prevEl: 'a.swiper.slider-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        },
        breakpoints: {
            860: {
                direction: 'vertical',
            }
        }
        });

        let reviewsSlider = document.querySelector('.reviews__slider_main').swiper;
        document.querySelector('.swiper__pagination-total').innerText = reviewsSlider.slides.length - 2;
        reviewsSlider.on('slideChange', () => {
            document.querySelector('.swiper__pagination-active').innerText = reviewsSlider.realIndex + 1;
        });
    }
    catch{}

    try{
        let aboutSlider = new Swiper('.about__slider-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: '.about__slider-next',
                prevEl: '.about__slider-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
        });
    }
    catch{}

    try{
        spoilerLink.addEventListener('click', toggleSpoiler);
    }
    catch{}

    try{
        document.querySelector('.reviews__header .button_big').addEventListener('click', () => {
            event.preventDefault();
    
            document.querySelector('#form').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
    catch{}

    try{
        document.querySelectorAll('.reviews__control_disabled').forEach(control => {
            control.addEventListener('click', () => {
                event.preventDefault();
            });
        });
    }
    catch{}

    try{
        document.querySelectorAll('.uk-accordion li').forEach(title => {
            title.addEventListener('click', accordionTitleClick);
        });
    }
    catch{}

    try{
        document.querySelector('.accordion .uk-accordion-title').click();
    }
    catch{}

    try{
        document.querySelector('.faqs__list .uk-accordion-title').click();
    }
    catch{}
    
    faqActiveCategorySync();
    mobileCheck();
    scrollHandler();
    updSlidersPagination();
});
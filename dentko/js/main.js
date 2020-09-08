document.addEventListener('DOMContentLoaded', () => {
    let popupTriggers = document.querySelectorAll('.popup-request-open');
    let popupCloseTriggers = document.querySelectorAll('.popup-close');
    let popups = document.querySelectorAll('.popup');
    let popupSucsessTrigger = document.querySelectorAll('.popup-sucsess-open');
    let menuBtn = document.querySelector('.menu-open');
    let sliders = document.querySelectorAll('.uk-slider-container');
    let spoilerLink = document.querySelector('.spoiler-link');

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

        console.log(totalHeight);

        textContainer.classList.toggle('open');
        if(textContainer.classList.contains('open')){
            textContainer.style.maxHeight = totalHeight + "px";
        }
        else{
            textContainer.removeAttribute('style');
        }
    }

    const updSlidersPagination = () => { // Пагинация у слайдеров
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
    }

    const toggleMenu = () => {
        event.preventDefault();

        let target = event.target;
        let mobileMenu = document.querySelector('.mobile-menu');

        target.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }

    const scrollHandler = () => {
        let header = document.querySelector('.header');
        let mobileMenu = document.querySelector('.mobile-menu');

        if(window.pageYOffset > 0){
            header.classList.add('fixed');
            mobileMenu.style.paddingTop = "60px";
        }
        else{
            header.classList.remove('fixed');
            mobileMenu.style.paddingTop = "80px";
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
            let menuWrap = document.querySelector('.header__wrap');

            headerItems.forEach(item => {
                menuWrap.appendChild(item);
            });
        }

        if(window.innerWidth <= 990){
            let mobileMenuContainer = document.querySelector('.mobile-menu');
            let navBar = document.querySelector('.nav');

            mobileMenuContainer.insertBefore(navBar, headerItems[0]);
            mobileMenuContainer.insertBefore(headerItems[headerItems.length - 1], headerItems[headerItems.length - 2]);
            document.querySelector('.mobile-menu .header__dropdown-span img').setAttribute('src', './img/info-w.svg');

        }
        else{
            let header = document.querySelector('.header');
            let navBar = document.querySelector('.nav');

            header.after(navBar);
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

    try{
        let galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 30,
            slidesPerView: 3,
            updateOnWindowResize: true,
            freeMode: true,
            direction: 'vertical',
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
    
        let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 30,
        direction: 'vertical',
        slidesPerView: 1,
        updateOnWindowResize: true,
        loop: true,
        navigation: {
            nextEl: 'a.swiper.slider-next',
            prevEl: 'a.swiper.slider-prev',
        },
        thumbs: {
            swiper: galleryThumbs
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

    menuBtn.addEventListener('click', toggleMenu);

    popupTriggers.forEach(item => {
        item.addEventListener('click', openPopup('.popup-request'));
    });

    popupSucsessTrigger.forEach(item => {
        item.addEventListener('click', openPopup('.popup-sucsess'));
    });

    popupCloseTriggers.forEach(item => {
        item.addEventListener('click', closePopup);
    });

    window.addEventListener('scroll', () => {
        scrollHandler();
    });

    window.addEventListener('resize', () => {
        mobileCheck();
    });

    try{
        document.querySelector('.uk-accordion-title').click();
    }
    catch{}

    mobileCheck();
    scrollHandler();
    updSlidersPagination();
});
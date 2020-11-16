document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.js-menu');
    const burger = document.querySelector('.js-burger');

    const unrollBtns = document.querySelectorAll('.js-button-more');

    const requestOpen = document.querySelectorAll('.js-open-request');
    const popupCloseBtns = document.querySelectorAll('.js-popup-close');

    const forms = document.querySelectorAll('form');

    const picsetButtons = document.querySelectorAll('.js-picture-button');

    const bandito = document.querySelector('.js-bandito');

    const whichPage = () => {
        const pageIdentifier = document.querySelector('.js-page-identifier');

        return pageIdentifier.dataset.page;
    }

    const constrain = (val, min, max) => {
        return val > max ? max : val < min ? min : val;
    }

    const unrollBtnClick = () => {
        const button = event.target;
        const targetSelector = button.dataset.target;

        const targetNode = document.querySelector(`.${targetSelector}`);

        targetNode.classList.toggle('active');

        button.innerText = targetNode.classList.contains('active') ? 'less news' : 'more news';
    }

    const scrollHandler = () => {
        window.pageYOffset > 40 ? document.querySelector('.header').classList.add('fixed') : document.querySelector('.header').classList.remove('fixed');

    }

    const resizeHandler = () => {
        
        if(whichPage() == 'index'){
            banditoWatch();
        }

        if(window.innerWidth >= 980) toggleMenu(false);

        if(window.innerWidth >= 880){
            if(whichPage() == 'game'){
                document.querySelector('.game-page__description').appendChild(document.querySelector('.js-play-demo'));
            }
        }
        else if(window.innerWidth <= 880 && window.innerWidth > 680) {
            if(whichPage() == 'game'){
                document.querySelector('.game-page__info').prepend(document.querySelector('.js-play-demo'));
            }
        }
        else{
            if(whichPage() == 'about'){
                document.querySelector('.about-page__top').prepend(document.querySelector('.js-about-img'));
            }
            else if(whichPage() == 'game'){
                document.querySelector('.game-page__text').prepend(document.querySelector('.js-play-demo'));            
            }
        }

        if(window.innerWidth <= 770){
            if(whichPage() == 'index'){
                document.querySelector('.slide__data').insertBefore(document.querySelector('.slide__images'), document.querySelector('.slide__controls'))
            }   
        }
    }

    const closePopup = () => {
        const popupOverlay = document.querySelector('.js-popup-overlay');

        popupOverlay.classList.remove('active');
        popupOverlay.querySelectorAll('.popup').forEach(popup => popup.classList.remove('active'));
    }

    const togglePopup = (selector, state = null) => {
        const targetPopup = document.querySelector(selector);
        const popupOverlay = document.querySelector('.js-popup-overlay');


        if(state === null){
            return () => {
                toggleMenu(false);
                targetPopup.classList.add('active');
                popupOverlay.classList.add('active');
    
                popupOverlay.addEventListener('click', () => {
                    if(event.target.classList.contains('js-popup-overlay')){
                        closePopup();
                    }
                });
            }
        }
        else if(state === true) {
            targetPopup.classList.add('active');
            popupOverlay.classList.add('active');
        }
        else{
            targetPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
        }
        toggleMenu(false);

        popupOverlay.addEventListener('click', () => {
            if(event.target.classList.contains('js-popup-overlay')){
                closePopup();
            }
        });
    }

    const showSliderPage = (page = 1) => {
        const slider = document.querySelector('.js-slider');
        const sliderMaxPages = parseInt(slider.dataset.pages);
        page = constrain(page, 1, sliderMaxPages);
        slider.dataset.page = page;

        const pageData = slider.querySelectorAll('.js-slider-changable');

        pageData.forEach(data => data.classList.remove('active'));

        let targetPageData = Array.prototype.slice.call(pageData).filter(item => item.dataset.slide == page) || pageData[sliderMaxPages - 1];

        targetPageData.forEach(data => data.classList.add('active'));
    }

    const getActiveSliderPage = () => {
        const slider = document.querySelector('.js-slider');

        return parseInt(slider.dataset.page);
    }

    const getMaxSliderPage = () => {
        const slider = document.querySelector('.js-slider');

        return parseInt(slider.dataset.pages);
    }

    const formSubmitHandler = () => {

        event.preventDefault();

        const targetForm = event.target;
        const url = '';

        const formData = new FormData(targetForm);

        // fetch(url, {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => {
            // targetForm.reset();
            // closePopup();
            // togglePopup('.js-popup-thx', true);
            // setTimeout(closePopup, 1500);
        // });

        targetForm.reset();
        closePopup();
        togglePopup('.js-popup-thx', true);
        setTimeout(closePopup, 1500);
    }

    const toggleMenu = (state = null) => {
        if(typeof(state) == 'object'){
            return () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
            }
        }
        else{
            state ? menu.classList.add('active') : menu.classList.remove('active');
            state ? burger.classList.add('active') : burger.classList.remove('active');
        }
    }

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const picsetButtonClick = () => {
        let button = event.target;
        let picture = document.querySelector('.js-picture');

        picture.querySelectorAll('source').forEach(source => source.remove());

        while(!button.classList.contains('js-picture-button')){
            button = button.parentNode;
        }

        picture.querySelector('img').setAttribute('src', button.dataset.imgSrc);
        picture.querySelector('img').setAttribute('alt', "Скрин игры");

        if(button.dataset.imgSrcWebp != undefined && button.dataset.imgSrcWebp.length > 0){
            let source = document.createElement('source');
            source.setAttribute('type', 'image/webp');
            source.setAttribute('srcset', button.dataset.imgSrcWebp);

            picture.prepend(source);
        }
    }

    const banditoWatch = () => {
        const marginTop = parseInt(getComputedStyle(bandito.querySelectorAll('.bandito__item')[1]).marginTop);

        bandito.querySelectorAll('.bandito__item').forEach(item => {
            let height = Math.ceil(bandito.querySelector('.bandito__body').getBoundingClientRect().height - 2 * marginTop) / 3;

            item.style.height = `${height}px`;
        });

        const itemDementions = {
            width: bandito.querySelector('.bandito__item').getBoundingClientRect().width,
            height: bandito.querySelector('.bandito__item').getBoundingClientRect().height
        };

        return itemDementions;
    }

    const banditoInit = () => {
        const banditoCols = bandito.querySelectorAll('.bandito__col');


        const banditoAnimate = () => {
            const itemDementions = banditoWatch();
            const targetItems = [ random(5, banditoCols[0].querySelectorAll('.bandito__item').length - 5), random(5, banditoCols[1].querySelectorAll('.bandito__item').length - 5), random(5, banditoCols[2].querySelectorAll('.bandito__item').length - 5)];

            banditoCols.forEach((col, index) => {
                const marginTop = parseInt(getComputedStyle(bandito.querySelectorAll('.bandito__item')[1]).marginTop);

                const pos = (targetItems[index] * (itemDementions.height + marginTop));

                col.style.transform = !!(index % 2) ? `translateY(${-pos}px)` : `translateY(${-pos}px)`;

                setTimeout(() => col.querySelectorAll('.bandito__item.active').forEach(item => item.classList.remove('active')), 1000);
                setTimeout(() => col.querySelectorAll('.bandito__item')[targetItems[index] + 1].classList.add('active'), 1000 + index * 500);
            });
        }

        banditoAnimate();

        setInterval(banditoAnimate, 4000);
    }

    unrollBtns.forEach( button => button.addEventListener('click', unrollBtnClick));

    picsetButtons.forEach( button => button.addEventListener('click', picsetButtonClick));

    popupCloseBtns.forEach( button => button.addEventListener('click', closePopup));
    requestOpen.forEach( button => button.addEventListener('click', togglePopup('.js-popup-request')));

    forms.forEach( button => button.addEventListener('submit', formSubmitHandler));

    burger.addEventListener('click', toggleMenu());

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    scrollHandler();
    resizeHandler();

    if(whichPage() == 'index'){
        banditoInit();
        showSliderPage();

        // setInterval(() => getActiveSliderPage() == getMaxSliderPage() ? showSliderPage() : showSliderPage(getActiveSliderPage() + 1), 4000);

        document.querySelector('.js-slider-prev').addEventListener('click', () => showSliderPage(getActiveSliderPage() - 1));
        document.querySelector('.js-slider-next').addEventListener('click', () => showSliderPage(getActiveSliderPage() + 1));
    }
});
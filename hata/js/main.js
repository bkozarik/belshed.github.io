document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    const heroTabTriggers = document.querySelectorAll('.js-tab-trigger');
    const heroBgItems = document.querySelectorAll('.js-hero-bg');
    const heroTabs = document.querySelectorAll('.js-tab');

    const objectsTriggers = document.querySelectorAll('.js-objects-trigger');
    const objectsTabs = document.querySelectorAll('.js-object');

    const typesTrigger = document.querySelector('.js-types');

    const willBeCutted = document.querySelectorAll('.js-excerpt');

    const filterTrigger = document.querySelector('.js-filter-trigger');
    const filterMoreTrigger = document.querySelector('.js-filter-more-trigger');

    const resultsTriggers = document.querySelectorAll('.js-results-trigger');
    const results = document.querySelectorAll('.js-result');

    const apartmentsSwipers = document.querySelectorAll('.js-swiper');

    const scrollToTop = document.querySelector('.js-scroll');

    const burger = document.querySelector('.js-burger');
    const mobileMenu = document.querySelector('.js-menu');

    const filterPopupTriggers = document.querySelectorAll('.js-filter-popup');
    const popupItems = document.querySelectorAll('.js-popup-item');
    const popupClose = document.querySelectorAll('.js-popup-close');

    const setExcerpt = target => {

        let targetText = target.innerText;

        let dataLength = parseInt(target.dataset.length);
        let currLength = parseInt(targetText.length);

        if(currLength > dataLength){
            let cuttedText = targetText.slice(0, dataLength);

            cuttedText += "...";

            target.innerText = cuttedText;
        }
    }

    const whichPage = () => {
        let main = document.querySelector('main.main');
        let pageName = main.dataset.page;

        return pageName;
    }

    const swipersInit = item => {
        let swiper = new Swiper(item.querySelector('.top__head') || item.querySelector('.apartment__slider'), {
            slidesPerView: 1,
            loop: true,
            navigation: {
                prevEl: '.top__control_prev',
                nextEl: '.top__control_next',
            },
        });
    }

    const heroTabTriggerClick = () => {
        let trigger = event.target;
        let triggersUnderline = document.querySelector('.js-tab-underline');

        let targetTab = Number(trigger.dataset.target) - 1;

        heroTabTriggers.forEach(trigger => trigger.classList.remove('active'));
        heroTabs.forEach(trigger => trigger.classList.remove('active'));
        heroBgItems.forEach(item => item.classList.remove('active'));

        let triggerWidth = trigger.getBoundingClientRect().width;
        trigger.classList.toggle('active');
        triggersUnderline.style.width = triggerWidth * 0.7 + "px";
        triggersUnderline.style.left = trigger.offsetLeft + (triggerWidth / 2) + "px";
        
        heroTabs[targetTab].classList.toggle('active');
        heroBgItems[targetTab].classList.toggle('active');
    }

    const heroTabTriggerInit = () => {
        let firstTrigger = heroTabTriggers[0];
        let triggersUnderline = document.querySelector('.js-tab-underline');
        
        let triggerWidth = firstTrigger.getBoundingClientRect().width;
        
        firstTrigger.classList.toggle('active');
        triggersUnderline.style.width = triggerWidth * 0.7 + "px";
        triggersUnderline.style.left = firstTrigger.offsetLeft + (triggerWidth / 2) + "px";

        heroTabs[0].classList.add('active');
        heroBgItems[0].classList.add('active');
    }

    const objectsTriggerClick = () => {
        let trigger = event.target;
        let triggersUnderline = document.querySelector('.js-objects-underline');
        let typesTriggersLength = Array.prototype.slice.call(objectsTriggers).filter(trigger => trigger.classList.contains('js-scroll-link')).length;

        let targetTab = Number(trigger.dataset.target) - 1;

        trigger = objectsTriggers[typesTriggersLength + targetTab];

        objectsTriggers.forEach(trigger => trigger.classList.remove('active'));
        objectsTabs.forEach(trigger => trigger.classList.remove('active'));
        
        let triggerWidth = trigger.getBoundingClientRect();
        trigger.classList.toggle('active');
        triggersUnderline.style.width = triggerWidth.width * 0.8 + "px";
        triggersUnderline.style.left = trigger.offsetLeft + (triggerWidth.width / 2) + "px";

        objectsTabs[targetTab].classList.toggle('active');
    }

    const objectsTriggerInit = () => {
        let typesTriggersLength = Array.prototype.slice.call(objectsTriggers).filter(trigger => trigger.classList.contains('js-scroll-link')).length;
        
        let firstTrigger = objectsTriggers[typesTriggersLength];
        let triggersUnderline = document.querySelector('.js-objects-underline');

        let triggerWidth = firstTrigger.getBoundingClientRect();

        firstTrigger.classList.add('active');
        triggersUnderline.style.width = triggerWidth.width * 0.8 + "px";
        triggersUnderline.style.left = firstTrigger.offsetLeft + (triggerWidth.width / 2) + "px";

        objectsTabs[0].classList.add('active');
    }

    const typesTriggerClick = () => {
        let button = event.target;
        let dropdown = document.querySelector('.js-types-dropdown');
        let windowWidth = window.innerWidth;
        let containerWidth = document.querySelector('.header .container').getBoundingClientRect().width;

        let buttonX = button.getBoundingClientRect().x
        let buttonY = button.getBoundingClientRect().y

        dropdown.classList.toggle('active');

        dropdown.style.left = (buttonX - (windowWidth - containerWidth) / 2) + "px";

        document.addEventListener('click', () => {
            let target = event.target;

            if(!target.classList.contains('js-types-dropdown') && !target.classList.contains('js-types') ){
                dropdown.classList.remove('active');
            }
        })
    }
    
    const burgerClick = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');


    }

    const filterTriggerClick = () => {
        filterTrigger.classList.toggle('active');

        const filtersOverlay = document.querySelector('.js-filter-overlay');

        const filterBody = document.querySelector('.js-filter-body');
        const filterHidden = document.querySelector('.js-filter-hidden');

        
        filtersOverlay.classList.toggle('active');
        filterHidden.classList.toggle('active');
        
        filterBody.querySelector('.button_green.button_search').classList.toggle('hidden');
        
        filtersOverlay.addEventListener('click', () => {
            filterTrigger.click();
        });
    }

    const resultsTriggerClick = () => {
        let targetTrigger = event.target;
        let triggersUnderline = document.querySelector('.js-results-underline');

        let targetResult = Number(targetTrigger.dataset.target) - 1;

        resultsTriggers.forEach(trigger => trigger.classList.remove('active'));
        results.forEach(trigger => trigger.classList.remove('active'));

        targetTrigger.classList.add('active');
        let triggerWidth = targetTrigger.getBoundingClientRect().width;

        triggersUnderline.style.width = triggerWidth * 1.2 + "px";
        triggersUnderline.style.left = targetTrigger.offsetLeft + (triggerWidth / 2) + "px";

        results[targetResult].classList.add('active');
    }

    const resultsTriggerInit = () => {
        let firstTrigger = resultsTriggers[0];
        let firstResult = results[0];
        let triggersUnderline = document.querySelector('.js-results-underline');
        
        let triggerWidth = firstTrigger.getBoundingClientRect();

        firstResult.classList.add('active');
        firstTrigger.classList.add('active');
        triggersUnderline.style.width = triggerWidth.width * 1.2 + "px";
        triggersUnderline.style.left = firstTrigger.offsetLeft + (triggerWidth.width / 2) + "px";

        resultsTriggers[0].classList.add('active');
    }

    const scrollLinkClick = () => {
        event.preventDefault();

        let href = event.target.getAttribute('href');

        document.querySelector(href).scrollIntoView({behavior: "smooth"});
    }
    
    const scrollHandler = () => {
        window.pageYOffset > 400 ? scrollToTop.classList.add('active') : scrollToTop.classList.remove('active');
    }

    const filterMoreTriggerClick = () => {
        let hiddenFilter = document.querySelector('.js-filter-more');

        hiddenFilter.classList.toggle('active');
        filterMoreTrigger.classList.toggle('active');
    }

    const filterPopupTriggerClick = () => {
        let trigger = event.target;
        let triggerData = trigger.dataset.popup;
        let popupWrapper = document.querySelector('.js-popup');
        
        popupItems.forEach(item => item.classList.remove('active'));
        filterPopupTriggers.forEach(item => item.classList.remove('active'));

        let targetPopup = Array.prototype.slice.call(popupItems).filter(item => item.dataset.popup == triggerData)[0];
        let activeTriggers = Array.prototype.slice.call(filterPopupTriggers).filter(item => item.dataset.popup == triggerData);

        activeTriggers.forEach(item => item.classList.add('active'));

        targetPopup.classList.add('active');
        popupWrapper.classList.add('active');

        document.addEventListener('click', () => {
            let target = event.target;

            if(target.classList.contains('js-popup') && !target.classList.contains('js-popup-item') ){
                popupWrapper.classList.remove('active');
                popupItems.forEach(item => item.classList.remove('active'));
            }
        });
    }

    const popupCloseClick = () => {
        let popupWrapper = document.querySelector('.js-popup');

        popupWrapper.classList.remove('active');
        popupItems.forEach(item => item.classList.remove('active'));
        filterPopupTriggers.forEach(item => item.classList.remove('active'));
    }

    willBeCutted.forEach(item => setExcerpt(item));
    apartmentsSwipers.forEach(item => swipersInit(item));
    
    burger.addEventListener('click', burgerClick);
    typesTrigger.addEventListener('click', typesTriggerClick);

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    heroTabTriggers.forEach(trigger => trigger.addEventListener('click', heroTabTriggerClick));
    objectsTriggers.forEach(trigger => trigger.addEventListener('click', objectsTriggerClick));
    resultsTriggers.forEach(trigger => trigger.addEventListener('click', resultsTriggerClick));
    filterPopupTriggers.forEach(trigger => trigger.addEventListener('click', filterPopupTriggerClick));
    popupClose.forEach(trigger => trigger.addEventListener('click', popupCloseClick));

    window.addEventListener('scroll', scrollHandler);
    
    if(whichPage() == 'index'){
        objectsTriggerInit();
        heroTabTriggerInit();
    }
    else if(whichPage() == 'apartments'){
        filterTrigger.addEventListener('click', filterTriggerClick);
        filterMoreTrigger.addEventListener('click', filterMoreTriggerClick);
    }
    else if(whichPage() == 'item'){
        resultsTriggerInit();
    }
    scrollHandler();
});
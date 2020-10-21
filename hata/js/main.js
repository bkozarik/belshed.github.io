document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    const heroTabTriggers = document.querySelectorAll('.js-tab-trigger');
    const heroTabs = document.querySelectorAll('.js-tab');

    const objectsTriggers = document.querySelectorAll('.js-objects-trigger');
    const objectsTabs = document.querySelectorAll('.js-object');

    const typesTrigger = document.querySelector('.js-types');

    const willBeCutted = document.querySelectorAll('.js-excerpt');

    const filterTriggers = document.querySelectorAll('.js-filter-trigger');

    const resultsTriggers = document.querySelectorAll('.js-results-trigger');
    const results = document.querySelectorAll('.js-result');

    const apartmentsSwipers = document.querySelectorAll('.js-swiper');

    const scrollToTop = document.querySelector('.js-scroll');

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

    const swipersInit = item => {
        let swiper = new Swiper(item.querySelector('.top__head') || item.querySelector('.apartment__slider'), {
            slidesPerView: 1,
            loop: true,
        });
    }

    const heroTabTriggerClick = () => {
        
        try{
            let trigger = event.target;
            let triggersUnderline = document.querySelector('.js-tab-underline');

            let targetTab = Number(trigger.dataset.target) - 1;

            heroTabTriggers.forEach(trigger => trigger.classList.remove('active'));
            heroTabs.forEach(trigger => trigger.classList.remove('active'));

            let triggerWidth = trigger.getBoundingClientRect().width;
            trigger.classList.toggle('active');
            triggersUnderline.style.width = triggerWidth * 0.7 + "px";
            triggersUnderline.style.left = trigger.offsetLeft + (triggerWidth / 2) + "px";
            
            heroTabs[targetTab].classList.toggle('active');
        }
        catch{}
    }

    const heroTabTriggerInit = () => {
        try{
            let firstTrigger = heroTabTriggers[0];
            let triggersUnderline = document.querySelector('.js-tab-underline');
            
            let triggerWidth = firstTrigger.getBoundingClientRect();

            firstTrigger.classList.toggle('active');
            triggersUnderline.style.width = triggerWidth.width * 0.7 + "px";
            triggersUnderline.style.left = firstTrigger.offsetLeft + (triggerWidth.width / 2) + "px";

            heroTabs[0].classList.add('active');
        }
        catch{}
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
    
    const filterTriggerClick = () => {
        filterTriggers.forEach(trigger => trigger.classList.toggle('active'));

        const filtersOverlay = document.querySelector('.js-filter-overlay');

        const filterBody = document.querySelector('.js-filter-body');
        const filterHidden = document.querySelector('.js-filter-hidden');

        
        filtersOverlay.classList.toggle('active');
        filterHidden.classList.toggle('active');
        
        filterBody.querySelector('.button_green.button_search').classList.toggle('hidden');
        
        filtersOverlay.addEventListener('click', () => {
            filterTriggers[0].click();
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
        try{
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
        catch{}
    }

    const scrollLinkClick = () => {
        event.preventDefault();

        let href = event.target.getAttribute('href');

        document.querySelector(href).scrollIntoView({behavior: "smooth"});
    }
    
    const scrollHandler = () => {
        window.pageYOffset > 400 ? scrollToTop.classList.add('active') : scrollToTop.classList.remove('active');
    }

    willBeCutted.forEach(item => setExcerpt(item));
    apartmentsSwipers.forEach(item => swipersInit(item));
    
    typesTrigger.addEventListener('click', typesTriggerClick);

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    filterTriggers.forEach(trigger => trigger.addEventListener('click', filterTriggerClick));
    heroTabTriggers.forEach(trigger => trigger.addEventListener('click', heroTabTriggerClick));
    objectsTriggers.forEach(trigger => trigger.addEventListener('click', objectsTriggerClick));
    resultsTriggers.forEach(trigger => trigger.addEventListener('click', resultsTriggerClick));

    window.addEventListener('scroll', scrollHandler);
    
    scrollHandler();
    heroTabTriggerInit();
    objectsTriggerInit();
    resultsTriggerInit();
});
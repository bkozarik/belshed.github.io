document.addEventListener('DOMContentLoaded', () => {
    const heroTabTriggers = document.querySelectorAll('.js-tab-trigger');
    const objectsTriggers = document.querySelectorAll('.js-objects-trigger');
    const heroTabs = document.querySelectorAll('.js-tab');
    const objectsTabs = document.querySelectorAll('.js-object');

    const typesTrigger = document.querySelector('.js-types');

    const willBeCutted = document.querySelectorAll('.js-excerpt');

    const filterTriggers = document.querySelectorAll('.js-filter-trigger');

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

    const heroTabTriggerClick = () => {
        
        try{
            let trigger = event.target;
            let triggersUnderline = document.querySelector('.js-tab-underline');

            let targetTab = Number(trigger.dataset.target) - 1;

            heroTabTriggers.forEach(trigger => trigger.classList.remove('active'));
            heroTabs.forEach(trigger => trigger.classList.remove('active'));

            let triggerWidth = trigger.getBoundingClientRect();
            trigger.classList.toggle('active');
            triggersUnderline.style.width = triggerWidth.width * 0.7 + "px";
            triggersUnderline.style.left = trigger.offsetLeft + (triggerWidth.width / 2) + "px";
            
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
        try{
            let trigger = event.target;
            let triggersUnderline = document.querySelector('.js-objects-underline');

            let targetTab = Number(trigger.dataset.target) - 1;

            objectsTriggers.forEach(trigger => trigger.classList.remove('active'));
            objectsTabs.forEach(trigger => trigger.classList.remove('active'));
            
            let triggerWidth = trigger.getBoundingClientRect();
            trigger.classList.toggle('active');
            triggersUnderline.style.width = triggerWidth.width * 0.8 + "px";
            triggersUnderline.style.left = trigger.offsetLeft + (triggerWidth.width / 2) + "px";

            objectsTabs[targetTab].classList.toggle('active');
        }
        catch{}
    }

    const objectsTriggerInit = () => {
        try{
            let firstTrigger = objectsTriggers[0];
            let triggersUnderline = document.querySelector('.js-objects-underline');
            
            let triggerWidth = firstTrigger.getBoundingClientRect();

            firstTrigger.classList.add('active');
            triggersUnderline.style.width = triggerWidth.width * 0.8 + "px";
            triggersUnderline.style.left = firstTrigger.offsetLeft + (triggerWidth.width / 2) + "px";

            objectsTabs[0].classList.add('active');
        }
        catch{}
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
    
    const filterTriggerClich = () => {
        event.target.classList.toggle('active');

        const filtersOverlay = document.querySelector('.js-filter-overlay');

        const filterBody = document.querySelector('.js-filter-body');
        const filterHidden = document.querySelector('.js-filter-hidden');

        
        filtersOverlay.classList.toggle('active');
        filterHidden.classList.toggle('active');
        
        filterBody.querySelector('.button_green.button_search').classList.toggle('hidden');
    }

    heroTabTriggers.forEach(trigger => trigger.addEventListener('click', heroTabTriggerClick));
    objectsTriggers.forEach(trigger => trigger.addEventListener('click', objectsTriggerClick));
    filterTriggers.forEach(trigger => trigger.addEventListener('click', filterTriggerClich));
    typesTrigger.addEventListener('click', typesTriggerClick);
    willBeCutted.forEach(item => setExcerpt(item));

    heroTabTriggerInit();
    objectsTriggerInit();
});
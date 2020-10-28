document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const burgerBtn = document.querySelector('.js-burger');

    const menuItems = document.querySelectorAll('.js-menu-item');

    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    const popupItem = document.querySelectorAll('.js-popup-item');
    const popupTriggers = document.querySelectorAll('.js-popup-open');
    const popupCloseTriggers = document.querySelectorAll('.js-popup-close');

    const toggleMenu = (state = null) => {
        if(typeof(state) == 'object'){
            return () => {
                burgerBtn.classList.toggle('active');

                menuItems.forEach((item, index) => {
                    item.classList.toggle('active');
                    item.style.top = item.classList.contains('active') ? document.querySelector('.header').getBoundingClientRect().height + index * item.getBoundingClientRect().height + "px" : "0px";
                });

                document.addEventListener('click', () => {
                    let target = event.target;
        
                    if(!target.classList.contains('js-menu-item') && !target.classList.contains('js-burger')){
                        toggleMenu(false);
                    }
                });
            }
        }
        else{
            state ? burgerBtn.classList.add('active') : burgerBtn.classList.remove('active');

            menuItems.forEach((item, index) => {
                state ? item.classList.add('active') : item.classList.remove('active');
                item.style.top = state ? document.querySelector('.header').getBoundingClientRect().height + index * item.getBoundingClientRect().height + "px" : '0px';
            });
        }
    }

    const aosInit = () => {
        AOS.init({
            once: true,
            offset: 80,
        });
    }

    const scrollHandler = () => {
        window.pageYOffset > 100 ? header.classList.add('scrolled') : header.classList.remove('scrolled');

    }

    const scrollLinkClick = () => {
        toggleMenu(false);
        event.preventDefault();

        let link = event.target;
        let href;

        while(!link.classList.contains('js-scroll-link')){
            link = link.parentNode;
        }
        
        href = link.getAttribute('href');
        
        window.scrollTo({
            top: document.querySelector(href).offsetTop - 70,
            behavior: 'smooth'
        });
    }

    const closePopup = () => {
        let popupOverlay = document.querySelector('.js-popup');
        popupOverlay.classList.remove('active');
        popupItem.forEach(item => item.classList.remove('active'));
        document.querySelectorAll("video").forEach(item => item.pause());
    }

    const popupTriggerClick = () => {

        let target = event.target;

        if(target.tagName == "A" || target.classList.contains('item__holder')){
            return;
        }

        let popupOverlay = document.querySelector('.js-popup');
        popupOverlay.classList.add('active');

        while(!target.classList.contains('js-popup-open')){
            target = target.parentNode;
        }

        let targetName = target.dataset.name;

        popupItem.forEach(item => {
            if(item.dataset.name == targetName){
                item.classList.add('active');
                
                item.querySelector('video').play();
            }
            else{
                item.classList.remove('active')
            }
        });

        document.addEventListener('click', () => {
            if(event.target.classList.contains('js-popup'))
                closePopup();
        });
    }

    window.addEventListener('scroll', scrollHandler);
    burgerBtn.addEventListener('click', toggleMenu());

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    popupTriggers.forEach(trigger => trigger.addEventListener('click', popupTriggerClick));
    popupCloseTriggers.forEach(trigger => trigger.addEventListener('click', closePopup));

    aosInit();
});
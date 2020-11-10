document.addEventListener('DOMContentLoaded', () => {
    const languageCheckbox = document.querySelectorAll('.js-language-radio');
    const scrollLinks = document.querySelectorAll('.js-scroll-link');
    
    const projects = document.querySelector('.js-projects');
    const projectsBtn = document.querySelector('.js-projects-button');

    const burger = document.querySelector('.js-burger');
    const menu = document.querySelector('.js-menu');

    const telInputs = document.querySelectorAll('input[type="tel"]');
    const formTrigger = document.querySelector('.js-form-trigger');
    const policyTrigger = document.querySelector('.js-policy-trigger');

    const closeButtons = document.querySelectorAll('.js-close-popup');

    const contactForm = document.querySelector('.js-contact-form');

    let mainSwiper, mainSwiperNode;

    const languageCheckboxChange = () => {

    }

    const toggleMenu = (state = null) => {
        if(typeof(state) == 'object'){
            return () => {
                menu.classList.toggle('active');
                burger.classList.toggle('active');
            };
        }
        else{
            state ? menu.classList.add('active') : menu.classList.remove('active');
            state ? burger.classList.add('active') : burger.classList.remove('active');
        }
    }

    const scrollLinkClick = () => {
        event.preventDefault();

        const targetLink = event.target;
    
        scrollLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');

        if(mainSwiper.classList.contains('swiper-container-initialized')){
            const targetPage = parseInt(targetLink.dataset.page) - 1;
    
            mainSwiperNode.slideTo(targetPage, 500, true);
        }
        else{
            toggleMenu(false);
            let href;
            
            href = targetLink.getAttribute('href');
            
            window.scrollTo({
                top: document.querySelector(href).offsetTop + 30,
                behavior: 'smooth'
            });
        }
    }

    const switchScrollLink = index => {
        const targetLink = scrollLinks[index];

        scrollLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
    }

    const mainSwiperInit = () => {
        const swiper = new Swiper('.js-main-swiper', {
            updateOnWindowResize: true,
            direction: 'vertical',
            roundLengths: true,
            spaceBetween: 100,
            slidesPerView: 1,
            mousewheel: true,
            speed: 500,
        });

        mainSwiperNode = document.querySelector('.js-main-swiper').swiper;

        swiper.on('slideChange', () => switchScrollLink(swiper.activeIndex));
    }

    const resizeHandler = () => {
        if(window.innerWidth < 770){
            mainSwiper = document.querySelector('.js-main-swiper');

            if(mainSwiper.classList.contains('swiper-container-initialized')){
                mainSwiperNode.destroy();
                scrollHandler();
            }
        }
        else{
            mainSwiper = document.querySelector('.js-main-swiper');

            if(!mainSwiper.classList.contains('swiper-container-initialized')){
                mainSwiperInit();
            }
        }

        if(window.innerWidth < 630){
            menu.appendChild(document.querySelector('.nav'));
            menu.appendChild(document.querySelector('.language'));
        }
        else{
            toggleMenu(false);
            document.querySelector('.header__wrap').appendChild(document.querySelector('.nav'));
            document.querySelector('.header__wrap').appendChild(document.querySelector('.language'));
        }
    }

    const scrollHandler = () => {
        if(!mainSwiper.classList.contains('swiper-container-initialized')){
            scrollLinks.forEach(link => {
                let linkRect = document.querySelector(link.getAttribute('href')).getBoundingClientRect();
    
                linkRect.top < 100 && linkRect.bottom > 100 ? link.classList.add('active') : link.classList.remove('active');
            });
        }
    }

    const projectsBtnClick = () => {
        projects.classList.toggle('active');

        projectsBtn.innerText = projects.classList.contains('active') ? "Скрыть проекты" : "Показать все проекты";
    }

    const maskInit = () => {
        telInputs.forEach(input => {
            input.addEventListener('focus', _ => {
                if(!/^\+\d*$/.test(input.value)){
                    input.value = '+7 (';
                }
            });
              
            input.addEventListener('keypress', event => {
                const currPos = input.value.length;

                if((!/\d/.test(event.key) || (input.value.length == 18))){
                    event.preventDefault();
                }
                else if ((input.value.length <= 3)){
                    input.value = '+7 (';
                }

                switch (currPos) {
                    case 7:
                        input.value += ") ";
                        break;
                    case 12:
                        input.value += "-";
                        break;
                    case 15:
                        input.value += "-";
                        break;
                }
            });
        });
    }

    const openPopup = selector => {
        const targetPopup = document.querySelector(selector);
        const popupOverlay = document.querySelector('.js-popup-overlay');

        targetPopup.classList.add('active');
        popupOverlay.classList.add('active');

        popupOverlay.addEventListener('click', () => {
            if(event.target.classList.contains('js-popup-overlay')){
                closePopup();
            }
        });
    }

    const closePopup = () => {
        document.querySelector('.js-popup-overlay').classList.remove('active');
        document.querySelectorAll('.popup').forEach(popup => popup.classList.remove('active'));
    }

    const contactFormSubmitHandler = () => {
        event.preventDefault();

        openPopup('.js-success-popup');
    }

    burger.addEventListener('click', toggleMenu());
    projectsBtn.addEventListener('click', projectsBtnClick);

    policyTrigger.addEventListener('click', () => openPopup('.js-documents-popup'));

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    closeButtons.forEach(button => button.addEventListener('click', closePopup));
    languageCheckbox.forEach(checkbox => checkbox.addEventListener('input', languageCheckboxChange));

    contactForm.addEventListener('submit', contactFormSubmitHandler);

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    resizeHandler();
    scrollHandler();
    maskInit();

    mainSwiperNode.slideTo(1, 500, true);
});
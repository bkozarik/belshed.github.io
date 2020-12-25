document.addEventListener('DOMContentLoaded', () => {
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

        const setCursorPosition = (pos, elem) => {
            elem.focus();
            if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
            else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        }

        function mask(event) {
            var matrix = "+7 (___) ___ __ __",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");

            if (def.length >= val.length) val = def;

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/g.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
            });
            
            if (event.type == "blur") {
                if (this.value.length == 2) this.value = "";
            } 
            else{
                setCursorPosition(this.value.length, this);
            }
        };  

        telInputs.forEach(input => {
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
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

        contactForm.querySelectorAll('.form__fields input').forEach(input => {
            if(input.value.length == 0){
                input.classList.add('form__input_err');

                input.addEventListener('input', () => {
                    if(event.target.value.length != 0) event.target.classList.remove('form__input_err');
                });
            }

            if(input.getAttribute('type') == 'tel' && input.value.length != 18){
                input.classList.add('form__input_err');
                
                input.addEventListener('input', () => {
                    if(event.target.value.length == 18) event.target.classList.remove('form__input_err');
                });
            }
            else if(input.getAttribute('type') == 'email' && input.value.indexOf('@') < 0){
                input.classList.add('form__input_err');

                input.addEventListener('input', () => {
                    if(input.value.indexOf('@') > 0) event.target.classList.remove('form__input_err');
                });
            }
        });

        if(contactForm.querySelector('.form__input_err')){
            contactForm.querySelector('.form__input_err').focus();
            return;
        }

        openPopup('.js-success-popup');
        setTimeout(closePopup, 1500);
        contactForm.reset();
        checkState();
    }

    const checkState = () => {
        const formButton = document.querySelector('.js-form-button');
        const formCheckbox = document.querySelector('.js-form-checkbox');

        if(!formCheckbox.checked){
            formButton.classList.add('form__button_disabled');
            formButton.setAttribute('disabled', true);
        }
        else{
            formButton.classList.remove('form__button_disabled');
            formButton.removeAttribute('disabled');
        }
    }

    const checkboxInit = () => {
        const formCheckbox = document.querySelector('.js-form-checkbox');

        checkState();
        formCheckbox.addEventListener('input', checkState);
    }

    burger.addEventListener('click', toggleMenu());
    projectsBtn.addEventListener('click', projectsBtnClick);

    policyTrigger.addEventListener('click', () => openPopup('.js-documents-popup'));

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    closeButtons.forEach(button => button.addEventListener('click', closePopup));

    contactForm.addEventListener('submit', contactFormSubmitHandler);

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    resizeHandler();
    scrollHandler();
    maskInit();
    checkboxInit();
});
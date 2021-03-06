document.addEventListener('DOMContentLoaded', () => {
    const languageSelets = document.querySelectorAll('.js-language');
    const servicesBtn = document.querySelectorAll('.js-services-btn');
    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    const houseTypeInputs = document.querySelectorAll('.js-house-type-input');

    const calcForm = document.querySelector('.js-calc-form');

    const burger = document.querySelector('.js-burger');
    const menu = document.querySelector('.js-menu');

    const popupTriggers = document.querySelectorAll('.js-toggle-popup');
    const popupCloseTriggers = document.querySelectorAll('.js-popup-close');

    const forms = document.querySelectorAll('form:not(.js-calc-form)');

    const telInputs = document.querySelectorAll('input[type="tel"]');

    const portfolioTabs = document.querySelectorAll('.js-tab-header');
    const portfolioContainer = document.querySelector('.js-tab-container');

    const serviceRoll = document.querySelector('.js-services-roll');
    
    const whichPage = () => {
        return document.querySelector('.js-page-id').dataset.page;
    }

    const createOptionPopupItem = (option, index) => {
        let languagePopupItem = document.createElement('li');
        languagePopupItem.classList.add('language__value');
        languagePopupItem.setAttribute('tabindex', 0);

        languagePopupItem.innerText = option.innerText;
        languagePopupItem.dataset.index = index;

        return languagePopupItem;
    }

    const toggleScroll = (state = null) => {
        const html = document.querySelector('html');
        const body = document.querySelector('body');
        if(state == null){
            html.classList.toggle('fixed');
            body.classList.toggle('fixed');
        }
        else{
            state ? html.classList.remove('fixed') : html.classList.add('fixed');
            state ? body.classList.remove('fixed') : body.classList.add('fixed');
        }
    }

    const toggleServicesMenu = () => {
        event.stopImmediatePropagation();
        servicesBtn.forEach(btn => btn.classList.toggle('active'));

        document.addEventListener('click', () => {
            // if(servicesBtn.classList.contains('active')){
            servicesBtn.forEach(btn => btn.classList.remove('active'));
            // }
        });
    }

    const togglePopup = (selector, state = null) => {
        const targetPopup = document.querySelector(`.${selector}`);

        if(state == null){
            return () => {
                targetPopup.classList.add('active');
                toggleMenu(false);
                toggleScroll(false);
            };
        }
        else{
            state ? targetPopup.classList.add('active') : targetPopup.classList.remove('active');
            state ? toggleScroll(false) : toggleScroll(true);
            toggleMenu(false);
        }
    }

    const closePopups = () => {
        let popups = document.querySelectorAll('.popup');

        popups.forEach(popup => {
            popup.classList.remove('active');
        });
        toggleScroll(true);
    }

    const calcFormCount = () => {
        event.preventDefault();

        const var_meterPrice = 1000;

        let formData = new FormData(calcForm);

        document.querySelector('.js-calc-btn').classList.add('animate');

        let totalPrice;

        if(formData.get('house_type') == 1){
            let var_a = parseFloat(formData.get('house_a')) || 0;
            let var_b = parseFloat(formData.get('house_b')) || 0;
            let var_h1 = parseFloat(formData.get('house_h1')) || 0;
            let var_h2 = parseFloat(formData.get('house_h2')) || 0;
            totalPrice = var_a * var_b * (var_h1 + var_h2) * 0.5 * var_meterPrice;
        }
        else if(formData.get('house_type') == 2){
            let var_a = parseFloat(formData.get('house_a-1')) || 0;
            let var_b = parseFloat(formData.get('house_b-1')) || 0;
            let var_h = parseFloat(formData.get('house_h')) || 0;

            totalPrice = var_a * var_b * var_h * var_meterPrice;
        }

        setTimeout(() => {
            calcForm.reset();
            document.querySelector('.js-calc-btn').classList.remove('animate');
            if(totalPrice){
                document.querySelector('.js-calc-price').innerHTML = totalPrice + ' ??????';
            }
        }, 1550);
    }

    const animationInit = () => {
        AOS.init({
            once: true,
            disable: 'mobile',
        });
    }

    const scrollLinkClick = () => {
        event.preventDefault();

        const targetLink = event.target;
    
        toggleMenu(false);
        let href;
        let offset = -100;
        
        href = targetLink.getAttribute('href');
        
        window.scrollTo({
            top: document.querySelector(href).offsetTop + offset,
            behavior: 'smooth'
        });
    }

    const toggleMenu = (state = null) => {
        if(state == null){
            return () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
                toggleScroll();
            };
        }
        else{
            state ? burger.classList.add('active') : burger.classList.remove('active');
            state ? menu.classList.add('active') : menu.classList.remove('active');
            state ? toggleScroll(false) : toggleScroll(true);
        }
    }

    const languageSelectInit = languageItems => {
        languageItems.forEach(item => {
            const options = item.querySelectorAll('option');
            options[0].selected = true;
            
            let languageTrigger = document.createElement('button');
            languageTrigger.classList.add('button', 'language__trigger', 'js-language-select');
            languageTrigger.setAttribute('type', 'button');
            
            let languageText = document.createElement('span');
            languageText.classList.add('language__trigger-text');
            languageText.innerText = options[0].innerText;

            let languagePopupList = document.createElement('ul');
            languagePopupList.classList.add('language__list');

            options.forEach((option, index) => {
                if(option.value != 'none'){
                    let languagePopupItem = createOptionPopupItem(option, index);
                    languagePopupList.appendChild(languagePopupItem);

                    languagePopupItem.addEventListener('click', () => {
                        let targetItem = event.target;
                        event.stopImmediatePropagation();
            
                        while(!targetItem.classList.contains('language__value')){
                            targetItem.parentNode;
                        }
                        targetItemIndex = parseInt(targetItem.dataset.index);
            
                        options[targetItemIndex].selected = true;
            
                        options.forEach(option => {
                            if(option.selected) languageText.innerText = option.innerText;
                        });
                        languagePopupList.classList.remove('active');
                        languageTrigger.classList.remove('active');
                    });
                }
            });

            languageTrigger.appendChild(languageText);

            item.appendChild(languageTrigger);
            item.appendChild(languagePopupList);

            languageTrigger.addEventListener('click', () => {
                event.stopImmediatePropagation();
                let target = event.target;

                while(!target.classList.contains('js-language-select')){
                    target = target.parentNode;
                }

                target.classList.toggle('active');
                languagePopupList.classList.toggle('active');

                document.addEventListener('click', () => {
                    let target = event.target;
                    if(!target.parentNode.classList.contains('js-language-select') && !target.classList.contains('js-language-select')){
                        document.querySelectorAll('.language__list').forEach(item => item.classList.remove('active'));
                        document.querySelectorAll('.js-language-select').forEach(item => item.classList.remove('active'));
                    }
                }, {onse: true});
            });

            item.querySelector('select').addEventListener('change', () => {
                let targetOption = event.target;

                options.forEach(option => {
                    if(option.selected) languageText.innerText = option.innerText;
                });
            });
        });
    }

    const maskInit = input => {
        input.addEventListener('focus', _ => {
            if(!/^\+\d*$/.test(input.value))
              input.value = '+3 (';
        });
          
        input.addEventListener('keypress', event => {
        let currPos = input.value.length;
        if((!/\d/.test(event.key) || (input.value.length == 18))){
            event.preventDefault();
        }
        else if ((input.value.length <= 3)){
            input.value = '+3 (';
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
        
            default:
                break;
        }
        });
    }

    const portfolioTabsInit = tabs => {
        const getPosts = async () => {
            const resp =  await fetch('./js/data.json');

            if (resp.ok) return resp.json();            
        }

        const calcUnderlinePos = (activeTabHeader) => {
            const portfolioUnderline = document.querySelector('.js-tab-underline');

            let underlineWidth = Math.ceil(activeTabHeader.getBoundingClientRect().width) * 1.1;
            let underlineLeft = Math.ceil(activeTabHeader.offsetLeft);

            portfolioUnderline.style.width = underlineWidth + 'px';
            portfolioUnderline.style.left = underlineLeft + 'px';
        }

        const createPreview = data => {
            const portfolioItem = document.createElement('a');
            portfolioItem.setAttribute('herf', '#');
            portfolioItem.classList.add('button', 'portfolio__item');

            const portfolioItemImg = document.createElement('img');
            portfolioItemImg.classList.add('portfolio__item-img');
            portfolioItemImg.setAttribute('src', data.preview);
            portfolioItemImg.setAttribute('loading', 'lazy');

            portfolioItem.appendChild(portfolioItemImg);
            portfolioContainer.appendChild(portfolioItem);
        }

        const fillPortfolioContainer = (activeTabHeader, count = -1, start = 0) => {
            const targetHeading = activeTabHeader.dataset.heading.toLowerCase();

            getPosts()
                .then(response => {
                    const posts = response["data"].filter(heading => targetHeading == heading.heading)[0];

                    try{
                        posts.items.forEach((item, index) => {if((index < count || count == -1) && index >= start) createPreview(item)});
                    }
                    catch(err){
                        const errItem = document.createElement('div');
                        errItem.classList.add('portfolio__err-item');
                        errItem.innerHTML = "????????????????, ?????????? ?? ???????? ?????????????????? ???? ??????????????!";


                        portfolioContainer.appendChild(errItem);
                    }
                });
        }

        tabs.forEach((tab, index) => {
            if(index == 0){
                tab.classList.add('active');
                calcUnderlinePos(tab);
                fillPortfolioContainer(tab, 12);
            };            

            tab.addEventListener('click', () => {
                document.querySelector('.js-tab-more').style.display = 'block';

                while (portfolioContainer.firstChild) {
                    portfolioContainer.removeChild(portfolioContainer.firstChild);
                }

                tabs.forEach(tab => tab.classList.remove('active'));
                event.target.classList.add('active');
                const activeTabHeader = Array.from(tabs).filter(tab => tab.classList.contains('active'))[0];

                calcUnderlinePos(activeTabHeader);
                fillPortfolioContainer(activeTabHeader, 12);
            });
        });

        document.querySelector('.js-tab-more').addEventListener('click', () => {
            document.querySelector('.js-tab-more').style.display = 'none';
            const activeTabHeader = Array.from(tabs).filter(tab => tab.classList.contains('active'))[0];
            fillPortfolioContainer(activeTabHeader);
        })

        window.addEventListener('resize', () => calcUnderlinePos(document.querySelector('.js-tab-header.active')));
    }

    const indexSwiperInit = () => {
        let indexSwiper = new Swiper('.index-portfolio__slider', {
            
            spaceBetween: 30,
            loop: true,
            preloadImages: false,
            navigation: {
                prevEl: '.index-portfolio__control_prev',
                nextEl: '.index-portfolio__control_next',
            },
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
            },
            breakpoints: {
                1250: {
                    slidesPerView: 4,
                },
                900: {
                    slidesPerView: 3,
                },
                600: {
                    slidesPerView: 2,
                },
                300: {
                    slidesPerView: 1,
                },
            }
        });
    }

    const houseTypeInputChange = () => {
        if(event.target.value){
            document.querySelectorAll('.calc__type-item').forEach(item => item.classList.remove('active'));

            event.target.parentNode.parentNode.classList.add('active');

            document.querySelectorAll('.js-house-type').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.js-house-type')[parseInt(event.target.value) - 1].classList.add('active');
        }
    }

    const scrollHandler = () => {
        window.pageYOffset > 60 ? document.querySelector('.header').classList.add('fixed') : document.querySelector('.header').classList.remove('fixed');
    }

    const resizeHandler = () => {
        if(window.innerWidth <= 1360){
            document.querySelectorAll('.footer .footer__col .button').forEach(btn => {
                document.querySelector('.footer .footer__col').insertBefore(btn, document.querySelector('.footer .footer__col .footer__social'));
            });
        }
        else{
            document.querySelectorAll('.footer .footer__col .button').forEach(btn => {
                document.querySelectorAll('.footer .footer__col')[document.querySelectorAll('.footer .footer__col').length - 1].appendChild(btn);
            });
        }

        if(window.innerWidth <= 1080){
            document.querySelector('.js-transit-parent').appendChild(document.querySelector('.js-transit-child'));
        }
        else{
            document.querySelector('.footer__wrap').insertBefore(document.querySelector('.js-transit-child'), document.querySelector('.js-transit-sibling'));
        }

        if(window.innerWidth >= 1360){
            toggleMenu(false);
        }
    }

    const formSubmitHandler = () => {
        event.preventDefault();

        const targetForm = event.target;
        const url = '';

        const formData = new FormData(targetForm);
        formData.set('action', 'ajax_form_handler');

        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if(response.ok){
                closePopups();
                togglePopup('js-popup-thx', true);
                setTimeout(closePopups, 2000);
            }
        })
        .catch(response => {
            closePopups();
            togglePopup('js-popup-err', true);
            setTimeout(closePopups, 2000);
        });

        closePopups();
        togglePopup('js-popup-thx', true);
        setTimeout(closePopups, 2000);
    }

    const serviceRollClick = () => {
        let roll = event.target;
        
        while(!roll.classList.contains('js-services-roll')){
            roll = roll.parentNode;
        }

        roll.classList.toggle('active');
    }

    forms.forEach(form => form.addEventListener('submit', formSubmitHandler));

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    houseTypeInputs.forEach(input => input.addEventListener('change', houseTypeInputChange));

    servicesBtn.forEach(btn => btn.addEventListener('click', toggleServicesMenu));
    burger.addEventListener('click', toggleMenu());

    popupTriggers.forEach(trigger => trigger.addEventListener('click', togglePopup(trigger.dataset.targetPopup)));

    popupCloseTriggers.forEach(trigger => trigger.addEventListener('click', () => {
        event.stopPropagation();
        if(event.target.classList.contains('js-popup-close')){
            closePopups();
        }
    }));

    telInputs.forEach(input => maskInit(input));

    languageSelectInit(languageSelets);

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    scrollHandler();
    resizeHandler();
    animationInit();

    if(whichPage() == 'main'){
        indexSwiperInit();
        calcForm.addEventListener('submit', calcFormCount);
    }
    else if(whichPage() == 'portfolio'){
        portfolioTabsInit(portfolioTabs);
    }
    else if(whichPage() == 'main' || whichPage() == 'calculator'){
        calcForm.addEventListener('submit', calcFormCount);
    }
    else if(whichPage() == 'service'){
        serviceRoll.addEventListener('click', serviceRollClick);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const dropdownItems = document.querySelectorAll('.js-dropdown');

    const burger = document.querySelector('.js-burger');
    const menu = document.querySelector('.js-menu');

    const mouseMoveElements = document.querySelectorAll('.js-mouse-move');
    const parallaxElements = document.querySelectorAll('.js-parallax');

    const forms = document.querySelectorAll('form');
    const mainForm = document.querySelector('.js-main-form');
    const popupForm = document.querySelector('.js-popup-form');
    const telInputs = document.querySelectorAll('input[type="tel"]');

    const portfolioItems = document.querySelectorAll('.js-portfolio-item');
    const serviceItems = document.querySelectorAll('.js-service-item');

    const popupTriggers = document.querySelectorAll('.js-toggle-popup');
    const popupCloseTriggers = document.querySelectorAll('.js-popup-close');
    const popups = document.querySelectorAll('.js-popup');
    let logosSwiper_swiper;
    
    const logosSwiperInit = () => {
        const logosSwiper = document.querySelector('.js-logos-swiper');

        let logosSwiperObj = new Swiper(logosSwiper, {
            spaceBetween: 20,
            freeMode: true,
            loop: true,
            grabCursor: true,
            breakpoints: {
                1510: {
                    slidesPerView: 8,
                },
                1310: {
                    slidesPerView: 7,
                },
                1110: {
                    slidesPerView: 6,
                },
                880: {
                    slidesPerView: 5,
                },
                590: {
                    slidesPerView: 4,
                },
                490: {
                    slidesPerView: 3,
                },
                300: {
                    slidesPerView: 2,
                },
            }
        });

        logosSwiper_swiper = logosSwiper.swiper;
    }

    const dropdownSelectInit = (dropdownItems) => {

        const createOptionPopupItem = (option, index) => {
            const dropdownPopupItem = document.createElement('li');
            dropdownPopupItem.classList.add('dropdown__item');
            dropdownPopupItem.setAttribute('tabindex', 0);
            
            dropdownPopupItem.innerHTML = option.innerHTML;
            dropdownPopupItem.dataset.index = index;
    
            return dropdownPopupItem;
        }

        const setTriggerText = (item, data) => {
            return item.dataset.triggerVal == 'text' ? data.textContent : data.innerHTML;
        }

        dropdownItems.forEach(item => {
            const options = item.querySelectorAll('.js-dropdown-select li');
            options[0].dataset.selected = true;
            
            const dropdownTrigger = document.createElement('button');
            dropdownTrigger.classList.add('button', 'dropdown__trigger', 'js-dropdown-trigger');
            dropdownTrigger.setAttribute('type', 'button');
            
            const dropdownText = document.createElement('span');
            dropdownText.classList.add('dropdown__trigger-text');
            dropdownText.innerHTML = setTriggerText(item, options[0]);

            const dropdownPopupList = document.createElement('ul');
            dropdownPopupList.classList.add('dropdown__list');

            const dropdownSelect = document.createElement('select');
            dropdownSelect.setAttribute('name', item.dataset.selectName)

            options.forEach((option, index) => {
                if(option.dataset.value != 'none' && !option.hasAttribute('hidden')){
                    const dropdownPopupItem = createOptionPopupItem(option, index);
                    dropdownPopupList.appendChild(dropdownPopupItem);

                    const dropdownOption = document.createElement('option');
                    dropdownOption.innerHTML = option.textContent;
                    dropdownOption.value = option.dataset.value;

                    dropdownSelect.appendChild(dropdownOption);

                    dropdownPopupItem.addEventListener('click', () => {

                        let targetItem = event.target;
                        while(targetItem.tagName != 'LI'){
                            targetItem = targetItem.parentNode;
                        }

                        targetItem.dataset.selected = true;
                        targetItemIndex = parseInt(targetItem.dataset.index);
                        
                        dropdownSelect.querySelectorAll('option')[targetItemIndex - 1].selected = true;

                        dropdownText.innerHTML = setTriggerText(item, dropdownPopupItem);
                    });
                }
            });

            dropdownTrigger.appendChild(dropdownText);

            item.appendChild(dropdownTrigger);
            item.appendChild(dropdownPopupList);
            item.appendChild(dropdownSelect);

            dropdownTrigger.addEventListener('click', () => {
                event.stopImmediatePropagation();

                let target = event.target;

                while(!target.classList.contains('js-dropdown-trigger')){
                    target = target.parentNode;
                }

                target.classList.toggle('active');
                dropdownPopupList.classList.toggle('active');

                document.addEventListener('click', () => {
                    const target = event.target;
                    
                    event.stopImmediatePropagation();

                    if(!target.parentNode.classList.contains('js-dropdown-trigger') && !target.classList.contains('js-dropdown-trigger')){
                        document.querySelectorAll('.dropdown__list').forEach(item => item.classList.remove('active'));
                        document.querySelectorAll('.js-dropdown-trigger').forEach(item => item.classList.remove('active'));
                    }
                });
            });

            item.querySelector('select').addEventListener('change', () => {
                const targetOption = event.target;

                options.forEach(option => {
                    if(option.selected) dropdownText.innerHTML = setTriggerText(item, option);
                });
            });
        });
    }

    const resizeHandler = () => {
        if(window.innerWidth <= 920){
            serviceItems.forEach(item => {
                const content = item.querySelector('.service-item__content');
                const description = item.querySelector('.service-item__description');
                const media = item.querySelector('.service-item__media');

                content.insertBefore(media, description);
            });
        }
        else{
            serviceItems.forEach(item => {
                const media = item.querySelector('.service-item__media');

                item.appendChild(media);
            });
        }

        if(window.innerWidth <= 770){
            portfolioItems.forEach(item => {
                const content = item.querySelector('.project__content');
                const description = item.querySelector('.js-project-description');
                const swiper = item.querySelector('.js-project-swiper');

                content.insertBefore(swiper, description);
            });
        }
        else{
            portfolioItems.forEach(item => {
                const swiper = item.querySelector('.js-project-swiper');

                item.appendChild(swiper);
            });
        }

        if(window.innerWidth > 740) {
            toggleMenu(false);
        }
    }

    const countUp = () => {
        document.querySelectorAll('.js-count-up').forEach(item => {

            let target = parseInt(item.dataset.target);
            let count = 0
            const increment = () => { 
                let [_, num, suffix] = String(count).match(/^(.*?)((?:[,.]\d+)?|)$/);
                
                let string = num.replace(/\B(?=(?:\d{3})*$)/g, ' ');

                item.innerHTML = item.dataset.format.replace('-/-', string);

                count += target < 1000 ? 1 : 2500;

                if(count <= target){
                    setTimeout(increment, parseInt(item.dataset.time) / target);
                }
            }

            increment();
        });
    }

    const toggleMenu = (state = null) => {
        if(state == null){
            return () => {
                burger.classList.toggle('active');
                menu.classList.toggle('active');
            }
        }
        else{
            state ? burger.classList.add('active') : burger.classList.remove('active');
            state ? menu.classList.add('active') : menu.classList.remove('active');
        }
    }

    const parallax = () => {
        parallaxElements.forEach(element => {
            let itemYCoord = element.getBoundingClientRect().y * 100;

            if(element.dataset.speed) itemYCoord *= parseFloat(element.dataset.speed);

            if(element.dataset.center == "true"){
                element.style.transform = `translate(-50%, ${(-itemYCoord / window.innerHeight) - 50}%`;
            }
            else{
                element.style.transform = `translate(0, ${-itemYCoord / window.innerHeight}%`;
            }
        });
    }

    const scrollHandler = () => {
        window.pageYOffset > 60 ? header.classList.add('fixed') : header.classList.remove('fixed');

        parallax();

        logosSwiper_swiper.setTranslate(-1 * window.pageYOffset * 0.5);
    }

    const articlesSwiperInit = () => {

        const articlesSwiper = new Swiper('.js-articles-swiper', {
            spaceBetween: 30,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 4,
                loadOnTransitionStart: true,
            },
            navigation: {
                prevEl: '.articles__control_prev',
                nextEl: '.articles__control_next',
            },
            breakpoints: {
                1210: {
                    slidesPerView: 'auto',
                },
                660: {
                    slidesPerView: 3,
                },
                465: {
                    slidesPerView: 2,
                },
                300: {
                    slidesPerView: 1,
                },
            }
        });
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
            var matrix = !this.classList.contains('js-hero-tel') ? "+7 (___) ___ __ __" : "(___) ___ __ __";

            var i = 0,
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

        const herTelInput = document.querySelector('.js-hero-tel');

        herTelInput.addEventListener('change', () => checkInputState(event.target));
        herTelInput.addEventListener('input', () => checkInputState(event.target));
        herTelInput.addEventListener('blur', () => checkInputState(event.target));
    }

    const portfolioSwipersInit = () => {
        portfolioItems.forEach((item, index) => {

            const portfolioSlides = item.querySelectorAll('.swiper-slide');

            if(portfolioSlides.length > 1){
                const itemSwiper = item.querySelector('.js-project-swiper');
                const autoplayDuration = 3000;

                function changeActivePagination() {
                    const itemSwiperPaginationItems = itemSwiper.querySelectorAll('.project__pagination-item');

                    if(itemSwiperPaginationItems.length){

                        itemSwiperPaginationItems[this.activeIndex].classList.remove('active');
                        itemSwiperPaginationItems[this.activeIndex].querySelector('.project__pagination-progress').style.transitionDuration = `0ms`;

                        if(this.isBeginning){
                            itemSwiperPaginationItems.forEach(item => {
                                item.querySelector('.project__pagination-progress').style.transitionDuration = '0s';
                                item.classList.remove('active');
                            });
                        }

                        itemSwiperPaginationItems.forEach((item, index) => {
                            itemSwiperPaginationItems[index].querySelector('.project__pagination-progress').style.transitionDuration = `0ms`;

                            if(index >= this.realIndex){
                                itemSwiperPaginationItems[index].classList.remove('active');
                                itemSwiperPaginationItems[index].querySelector('.project__pagination-bg').classList.remove('loaded');
                            }
                            else{
                                itemSwiperPaginationItems[index].classList.add('active');
                                itemSwiperPaginationItems[index].querySelector('.project__pagination-bg').classList.add('loaded');
                            }
                        });

                        setTimeout(() => {
                            itemSwiperPaginationItems[this.realIndex].querySelector('.project__pagination-progress').style.transitionDuration = `${this.slides[this.realIndex].dataset.swiperAutoplay}ms`;
                            itemSwiperPaginationItems[this.realIndex].classList.add('active');
                        }, 100)
                    }
                }

                const itemSwiperObj = new Swiper(itemSwiper, {
                    slidesPerView: 1,
                    preloadImages: false,
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    lazy: {
                        loadPrevNext: true,
                        loadOnTransitionStart: true,
                    },
                    on: {
                        autoplayStart: changeActivePagination,
                        slideChange: changeActivePagination,
                    }
                });

                itemSwiperObj.autoplay.stop();

                const pagination = item.querySelector('.js-project-swiper-pagination');

                for (let i = 0; i < itemSwiperObj.slides.length; i++) {
                    itemSwiperObj.slides[i].dataset.swiperAutoplay = autoplayDuration;

                    const paginationItem = document.createElement('span');
                    const paginationItemProgress = document.createElement('span');
                    const paginationItemBg = document.createElement('span');

                    paginationItem.setAttribute('tabindex', 0);
                    paginationItem.classList.add('project__pagination-item');
                    paginationItem.dataset.index = i;

                    paginationItemProgress.classList.add('project__pagination-progress');
                    paginationItemBg.classList.add('project__pagination-bg');

                    paginationItem.appendChild(paginationItemBg);
                    paginationItemBg.appendChild(paginationItemProgress);
                    pagination.appendChild(paginationItem);

                    paginationItem.addEventListener('click', () => {
                        let target = event.target;

                        while(!target.classList.contains('project__pagination-item')){
                            target = target.parentNode;
                        }
                        
                        if(target.dataset.index) itemSwiperObj.slideTo( target.dataset.index, 350, true);
                    });
                }

                setTimeout(itemSwiperObj.autoplay.start, index * 500);
            }
            else if(portfolioSlides.length == 1){
                const slideImg = portfolioSlides[0].querySelector('.project__slide-img');
                portfolioSlides[0].querySelector('.swiper-lazy-preloader').remove();

                slideImg.setAttribute('srcset', slideImg.dataset.srcset);
                slideImg.setAttribute('src', slideImg.dataset.src);
            }
        });
    }

    const mousemoveHandler = () => {
        mouseMoveElements.forEach(element => {
            const coords = {
                xCoord: event.clientX,
                yCoord: event.clientY,
            }

            for (coord in coords){
                coords[coord] *= 100;

                if(element.dataset.speed) coords[coord] *= parseFloat(element.dataset.speed);

                if(element.dataset.direction) element.dataset.direction == 'vertical' ? coords.xCoord = 0 : element.dataset.direction == 'horizontal' ? coords.yCoord = 0 : null;
            }

            if(element.dataset.center == "true"){
                element.style.transform = `translate( ${(coords.xCoord / window.innerWidth) - 55}%, ${(coords.yCoord / window.innerHeight) - 55}%)`;
            }
            else{
                element.style.transform = `translate( ${coords.xCoord / window.innerWidth}%, ${coords.yCoord / window.innerHeight}%)`;
            }
        });
    }

    const formSubmitHandler = async () => {
        event.preventDefault();

        const url = '';
        const targetForm = event.target;

        targetForm.querySelectorAll('input').forEach(input => {
            if(!input.parentNode.classList.contains('valid')) {
                input.parentNode.classList.add('invalid');
                input.addEventListener('input', () => checkInputState(event.target))
            }
        });

        if(targetForm.querySelector('.invalid')){
            targetForm.querySelector('.invalid input').focus();
            return;
        }

        const formData = new FormData(targetForm);

        // await fetch(url, {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => if(response.ok) response.json())
        // .then(response => {
        //     closePopup();   
        //     if(response.status == 1){
        //         openPopup('.js-popup-thx');
        //     }
        //     else{
        //         openPopup('.js-popup-err');
        //     }
        // })
        // .catch(response => {
        //     console.log(response);
        // });

        targetForm.reset();
        targetForm.querySelectorAll('input').forEach(input => checkInputState(input));

        closePopup();
        openPopup('.js-popup-thx');
        setTimeout(closePopup, 1500);
    }

    const checkInputState = (input) => {
        input.parentNode.classList.remove('invalid');

        switch (input.getAttribute('type')) {
            case 'text':
                input.value.length > 0 ? input.parentNode.classList.add('valid') : input.parentNode.classList.remove('valid');
                break;
            case 'email':
                if(input.value.length > 0 && /\w+@(\w[^@])+\.(\w[^@])+/g.test(input.value)){
                    input.parentNode.classList.add('valid');
                }
                else{
                    input.parentNode.classList.remove('valid');
                }
                break;
            case 'tel':
                const inputLength = input.classList.contains('js-hero-tel') ? 15 : 18;
                
                input.value.length >= inputLength ? input.parentNode.classList.add('valid') : input.parentNode.classList.remove('valid');
                break;
        }

        return input.parentNode.classList.contains('valid');
    }

    mainForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => checkInputState(event.target));
        input.addEventListener('input', () => checkInputState(event.target));
        input.addEventListener('blur', () => checkInputState(event.target));
    });

    popupForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => checkInputState(event.target));
        input.addEventListener('input', () => checkInputState(event.target));
        input.addEventListener('blur', () => checkInputState(event.target));
    });

    const openPopup = target => {
        toggleMenu(false);

        const targetPopup = document.querySelector(target);

        targetPopup.classList.add('active');

        if(targetPopup.querySelector('input')) targetPopup.querySelector('input').focus();
    }

    const closePopup = () => {
        popups.forEach(popup => popup.classList.remove('active'));
    }

    const animationInit = () => {
        AOS.init();
    }

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    document.addEventListener('mousemove', mousemoveHandler);

    forms.forEach(form => form.addEventListener('submit', formSubmitHandler));

    popupTriggers.forEach(trigger => trigger.addEventListener('click', () => openPopup(trigger.dataset.target)));
    popupCloseTriggers.forEach(trigger => trigger.addEventListener('click', event => {
        if(event.target.classList.contains('js-popup-close')) popups.forEach(popup => popup.classList.remove('active'));
    }));

    openPopup('.js-popup-main')

    burger.addEventListener('click', toggleMenu());

    countUp();
    maskInit();
    animationInit();
    resizeHandler();
    logosSwiperInit();
    scrollHandler();
    mousemoveHandler();
    articlesSwiperInit();
    portfolioSwipersInit();
    dropdownSelectInit(dropdownItems);
    
});
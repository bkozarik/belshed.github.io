document.addEventListener('DOMContentLoaded', () => {
    let subsliderItems = document.querySelectorAll('.subslider__item');
    let faqLinks = document.querySelectorAll('.faq');
    let burgerBtn = document.querySelector('.menu-toggle');
    let navLinks = document.querySelectorAll('.nav__link');
    let popupClose = document.querySelectorAll('.popup__close');
    let popups = document.querySelectorAll('.popup');
    let openRecall = document.querySelectorAll('.open-recall');
    let openSucsess = document.querySelectorAll('.open-sucsess');
    let openCalculate = document.querySelectorAll('.open-calculate');
    let slideDown = document.querySelectorAll('.slide-down');
    
    const headerLinkClick = () => {

        let target = event.target;

        event.preventDefault();

        const id = target.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    const slideDownHandle = () => {
        event.preventDefault();

        let target = event.target.parentNode.previousSibling.previousSibling;

        target.classList.toggle('slide');
    }

    const openPopup = (popupSelector) => { // Открывается попап с переданным спец-классом
        return () => {
            event.preventDefault();

            let popup = document.querySelector(popupSelector);
            let popupItem = popup.children[0];

            popupCloseClick();

            if(popupSelector == ".popup_calculate"){
                let bigForm = document.querySelector('.calculate .calculate__form');
                let smallForm = document.querySelector('.popup_calculate .calculate__form');
                let fields = bigForm.querySelectorAll('.form__input');
                let hiddenFields = smallForm.querySelectorAll('.form__hidden');

                console.log(smallForm);

                let i = 0;
                fields.forEach(field => {
                    hiddenFields[i].value = field.value;
                    i += 1;
                });

            }

            popup.classList.add('active');
            popupItem.classList.add('active');
        }
    }

    const popupCloseClick = () => { // Закрываются все попапы
        event.preventDefault();

        popups.forEach(item => {
            item.classList.remove('active');
            item.parentElement.classList.remove('active');
        });
    }

    const resizeHandler = () => {
        if(window.innerWidth < 1060){
            let mobileMenu = document.querySelector('.mobile-menu__wrapper');
            let mobileItems = document.querySelectorAll('.is_moving');

            mobileItems.forEach(item => {
                mobileMenu.appendChild(item);
            });
        }
        else{
            let mobileItems = document.querySelectorAll('.is_moving');
            let headerWrap = document.querySelector('.header__wrap');

            mobileItems.forEach(item => {
                headerWrap.appendChild(item);
            });
        }

        if(window.innerWidth < 760){
            let nav = document.querySelector('.nav');
            let mobileMenu = document.querySelector('.mobile-menu');

            mobileMenu.insertBefore(nav, document.querySelector('.mobile-menu__wrapper'));
        }
        else{
            let nav = document.querySelector('.nav');
        }
    }
    
    const scrollHandler = () => {
        if(window.innerWidth < 1060){
            let yOffset = window.pageYOffset;
            let header = document.querySelector('.header');
            let main = document.querySelector('.main');

            if(yOffset > 0){
                header.classList.add('fixed');
                main.classList.add('fixed');
            }
            else{
                header.classList.remove('fixed');
                main.classList.remove('fixed');
            }
        }
    }

    const toggleMenu = (btnState) => {

        const menu = document.querySelector('.mobile-menu');

        if(typeof(btnState) != 'boolean'){
            if(burgerBtn.classList.contains('active')){
                burgerBtn.classList.remove('active');
                menu.classList.remove('active');
            }
            else{
                burgerBtn.classList.add('active');
                menu.classList.add('active');
            }
        }
        else{
            if(btnState){
                burgerBtn.classList.add('active');
                menu.classList.add('active');
                
                return;
            }
            burgerBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    }

    const faqLinkClick = () => {
        event.preventDefault();

        let target = event.target;

        while(!target.classList.contains('faq')){
            target = target.parentNode;
        }

        target.classList.toggle('active');
    }

    const subsliderItemClick = () => {
        let target = event.target;

        subsliderItems.forEach(item => {
            if(item.classList.contains('active')){
                item.classList.remove('active');
            }
        });

        while(!target.classList.contains('subslider__item')){
            target = target.parentNode;
        }

        target.classList.toggle('active');
    }

    const syncCounter = () => {
        let counter = document.querySelector('.subslider__counter span');

        counter.innerText = bannerSwiperNode.realIndex + 1;

        bannerSwiperNode2.slideTo(bannerSwiperNode.realIndex)
    }

    let subSwiper = new Swiper('.subslider__container', {
        spaceBetween: 40,
        slidesPerView: 6,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        navigation: {
            nextEl: '.subslider_next',
            prevEl: '.subslider_prev',
        },
        pagination: {
            el: '.subslider__pagination>.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            1200: {
                slidesPerView: 6,
            },
            1050: {
                slidesPerView: 5,
            },
            900: {
                slidesPerView: 4,
            },
            650: {
                slidesPerView: 3,
            },
            420: {
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 20,
                centeredSlides: false,
                slidesPerView: 1,
            }
        }
    });

    let bannerSwiper = new Swiper('.banner__slider', {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
    });

    let serviceSwiper = new Swiper('.services__swiper', {
        spaceBetween: 40,
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: '.services_next',
            prevEl: '.services_prev',
        },
        pagination: {
            el: '.services__pagination>.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            1000: {
                slidesPerView: 3,
            },
            700: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
        }
    });

    let docsSwiper = new Swiper('.docs__swiper', {
        spaceBetween: 40,
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: '.docs_next',
            prevEl: '.docs_prev',
        },
        pagination: {
            el: '.docs__pagination>.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            700: {
                spaceBetween: 40,
                slidesPerView: 3,
            },
            400: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
        }
    });

    let specterSwiper = new Swiper('.specter__swiper', {
        spaceBetween: 40,
        slidesPerView: 4,
        loop: true,
        navigation: {
            nextEl: '.specter_next',
            prevEl: '.specter_prev',
        },
        pagination: {
            el: '.specter__pagination>.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            740: {
                spaceBetween: 40,
                slidesPerView: 3,
            },
            430: {
                spaceBetween: 20,
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
        }
    });

    let bigSwiper = new Swiper('.slider', {
        spaceBetween: 2,
        slidesPerView: 5,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.slider_next',
            prevEl: '.slider_prev',
        },
        pagination: {
            el: '.slider__pagination>.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            1100: {
                spaceBetween: 2,
                slidesPerView: 5,
                centeredSlides: true,
            },
            640: {
                spaceBetween: 10,
                slidesPerView: 3,
            },
            430: {
                centeredSlides: false,
                spaceBetween: 10,
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 20,
                slidesPerView: 1,
            },
        }
    });

    let bannerSwiperNode = document.querySelector('.subslider__container').swiper;

    let bannerSwiperNode2 = document.querySelector('.banner__slider').swiper;

    bannerSwiperNode.on('slideChange', syncCounter);

    burgerBtn.addEventListener('click', toggleMenu);

    slideDown.forEach(item => {
        item.addEventListener('click', slideDownHandle);
    });

    openRecall.forEach(item => {
        item.addEventListener('click', openPopup('.popup_recall'));
    });

    openSucsess.forEach(item => {
        item.addEventListener('click', openPopup('.popup_sucsess'));
    });

    openCalculate.forEach(item => {
        item.addEventListener('click', openPopup('.popup_calculate'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', headerLinkClick);
    });

    popupClose.forEach(item => {
        item.addEventListener('click', popupCloseClick);
    });

    faqLinks.forEach(item => {
        item.addEventListener('click', faqLinkClick);
    });

    subsliderItems.forEach(item => {
        item.addEventListener('click', subsliderItemClick);
    });

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', scrollHandler);

    syncCounter();
    resizeHandler();
    scrollHandler();
});
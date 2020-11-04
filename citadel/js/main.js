document.addEventListener('DOMContentLoaded', () => {
    const languageCheckbox = document.querySelectorAll('.js-language-radio');
    const scrollLinks = document.querySelectorAll('.js-scroll-link');
    
    const projects = document.querySelector('.js-projects');
    const projectsBtn = document.querySelector('.js-projects-button');

    const burger = document.querySelector('.js-burger');
    const menu = document.querySelector('.js-menu');

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
            }
        }
        else{
            mainSwiper = document.querySelector('.js-main-swiper');

            if(!mainSwiper.classList.contains('swiper-container-initialized')){
                mainSwiperInit();
            }
        }

        if(window.innerWidth < 630){

        }
        else{
            toggleMenu(false);
        }
    }

    const projectsBtnClick = () => {
        projects.classList.toggle('active');

        projectsBtn.innerText = projects.classList.contains('active') ? "Скрыть проекты" : "Показать все проекты";
    }

    burger.addEventListener('click', toggleMenu());
    projectsBtn.addEventListener('click', projectsBtnClick);
    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    languageCheckbox.forEach(checkbox => checkbox.addEventListener('input', languageCheckboxChange));

    window.addEventListener('resize', resizeHandler);

    resizeHandler();
});
document.addEventListener('DOMContentLoaded', () => {
    const languageCheckbox = document.querySelectorAll('.js-language-radio');
    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    let mainSwiperNode;

    const languageCheckboxChange = () => {

    }

    const scrollLinkClick = () => {
        event.preventDefault();

        const targetLink = event.target;
        const targetPage = parseInt(targetLink.dataset.page) - 1;

        scrollLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');

        mainSwiperNode.slideTo(targetPage, 500, true);
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

    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    languageCheckbox.forEach(checkbox => checkbox.addEventListener('input', languageCheckboxChange));

    mainSwiperInit();
});
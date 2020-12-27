document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const dropdownItems = document.querySelectorAll('.js-dropdown');
    
    const logosSwiperInit = () => {
        const logosSwiper = document.querySelector('.js-logos-swiper');

        let logosSwiperObj = new Swiper(logosSwiper, {
            slidesPerView: 8,
            freeMode: true,
            loop: true,
            grabCursor: true,
        })
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

    const scrollHandler = () => {
        window.pageYOffset > 6 ? header.classList.add('fixed') : header.classList.remove('fixed');


    }

    const articlesSwiperInit = () => {

        const articlesSwiper = new Swiper('.js-articles-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 4,
                loadOnTransitionStart: true,
            },
            navigation: {
                prevEl: '.articles__control_prev',
                nextEl: '.articles__control_next',
            }
        });
    }

    const portfolioSwipersInit = () => {
        document.querySelectorAll('.js-portfolio-item').forEach((item, index) => {

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

    window.addEventListener('scroll', scrollHandler);

    dropdownSelectInit(dropdownItems);
    scrollHandler();
    logosSwiperInit();
    articlesSwiperInit();
    portfolioSwipersInit();
});
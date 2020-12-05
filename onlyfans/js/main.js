document.addEventListener('DOMContentLoaded', () => {
    const headerSearch = document.querySelector('.js-head-search');

    const filterTrigger = document.querySelector('.js-filters-trigger');
    const filter = document.querySelector('.js-filters');

    const filterItems = document.querySelectorAll('.js-filter-item');

    const mainNode = document.querySelector('.main');

    const headerSearchFocus = () => {
        headerSearch.parentNode.classList.toggle('focus');
    }

    const whichPage = () => {
        const pageIdentifier = document.querySelector('.js-page-identifier');

        return pageIdentifier.dataset.page;
    }

    const indexSwiperInit = () => {

        let indexSwiperNode = document.querySelector('.js-index-slider');

        const checkSliderPos = () => {
            let indexSwiperSw = indexSwiperNode.swiper;

            document.querySelectorAll('.slider__control').forEach(btn => {
                btn.classList.add('active');
            });

            if(indexSwiperSw.isBeginning){
                document.querySelector('.slider__control.slider__control_prev').classList.remove('active');
            }
            else if(indexSwiperSw.isEnd){
                document.querySelector('.slider__control.slider__control_next').classList.remove('active');
            }
            else{
                document.querySelectorAll('.slider__control').forEach(btn => {
                    btn.classList.add('active');
                });
            }
        }

        let indexSwiper = new Swiper(indexSwiperNode, {
            slidesPerView: 1,
            slidesPerColumn: 3,
            spaceBetween: 25,
            navigation: {
                prevEl: '.slider__control.slider__control_prev',
                nextEl: '.slider__control.slider__control_next',
            }
        });
        
        checkSliderPos();
        indexSwiper.on('slideChange', checkSliderPos);
    }

    const toggleFilter = (state = null) => {

        if(state == null){
            return () => {
                filter.classList.toggle('active');
                filterTrigger.classList.toggle('active');
                document.querySelector('.js-index-slider-container').classList.toggle('slide');
                document.querySelector('.filter').classList.toggle('active');
            }
        }
        else{
            state ? filter.classList.add('active') : filter.classList.remove('active');
            state ? filterTrigger.classList.add('active') : filterTrigger.classList.remove('active');
            state ? document.querySelector('.js-index-slider-container').classList.add('slide') : document.querySelector('.js-index-slider-container').classList.remove('slide');
            state ? document.querySelector('.filter').classList.add('active') : document.querySelector('.filter').classList.remove('active');
        }
    }

    const filterSelectInit = filterItems => {
        filterItems.forEach(item => {
            const options = item.querySelectorAll('option');
            options[0].selected = true;
            
            let filterTrigger = document.createElement('button');
            filterTrigger.classList.add('button', 'filter__trigger', 'js-filters-select');
            filterTrigger.setAttribute('type', 'button');
            
            let filterText = document.createElement('span');
            filterText.classList.add('filter__trigger-text');
            filterText.innerText = options[0].innerText;

            let filterIcon = document.createElement('span');
            filterIcon.classList.add('filter__trigger-icon');
            filterIcon.innerHTML = `
                <svg width="16" height="8">
                    <use width="16" height="8" xlink:href="./img/icons.svg#arrow"></use>
                </svg>
            `;

            let filterPopupList = document.createElement('ul');
            filterPopupList.classList.add('filter__item-list');

            options.forEach((option, index) => {
                if(option.value != 'none'){
                    let filterPopupItem = document.createElement('li');
                    filterPopupItem.classList.add('filter__item-value');
    
                    filterPopupItem.innerText = option.innerText;
                    filterPopupItem.dataset.index = index;
    
                    filterPopupList.appendChild(filterPopupItem);

                    filterPopupItem.addEventListener('click', () => {
                        let targetItem = event.target;

                        while(!targetItem.classList.contains('filter__item-value')){
                            targetItem.parentNode;
                        }
                        targetItemIndex = parseInt(targetItem.dataset.index);

                        options[targetItemIndex].selected = true;

                        options.forEach(option => {
                            if(option.selected) filterText.innerText = option.innerText;
                        });
                    });
                }
            });

            filterTrigger.appendChild(filterText);
            filterTrigger.appendChild(filterIcon);

            item.appendChild(filterTrigger);
            item.appendChild(filterPopupList);

            filterTrigger.addEventListener('click', () => {
                let target = event.target;

                while(!target.classList.contains('js-filters-select')){
                    target = target.parentNode;
                }

                target.classList.toggle('active');
                filterPopupList.classList.toggle('active');

                document.addEventListener('click', () => {
                    let target = event.target;

                    if(!target.parentNode.classList.contains('js-filters-select')){
                        document.querySelectorAll('.filter__item-list').forEach(item => item.classList.remove('active'));
                        document.querySelectorAll('.js-filters-select').forEach(item => item.classList.remove('active'));
                    }
                });
            });

            item.querySelector('select').addEventListener('change', () => {
                let targetOption = event.target;

                options.forEach(option => {
                    if(option.selected) filterText.innerText = option.innerText;
                });
            });
        });
    }

    const resizeHandler = () => {
        if(whichPage() == 'index'){
            if(window.innerWidth < 1020){
                mainNode.appendChild(document.querySelector('.about__main'));
                mainNode.insertBefore(document.querySelector('.filter'), document.querySelector('.prices'));
            }
            else{
                mainNode.prepend(document.querySelector('.filter'));
                document.querySelector('.about__wrap').appendChild(document.querySelector('.about__main'));
            }
        }
        
        if(whichPage() == 'item' || whichPage() == 'index'){
            
            if(window.innerWidth < 960){
                mainNode.prepend(document.querySelector('.nav'));
            }
            else{
                document.querySelector('.header__wrap').insertBefore(document.querySelector('.nav'), document.querySelector('.js-head-search-wrap'));
            }

        }
    }

    window.addEventListener('resize', resizeHandler);
    
    if(whichPage() == 'index'){
        indexSwiperInit();
        filterSelectInit(filterItems);

        headerSearch.addEventListener('focus', headerSearchFocus);
        headerSearch.addEventListener('focusout', headerSearchFocus);

        filterTrigger.addEventListener('click', toggleFilter());
    }
    else if(whichPage() == 'item'){

    }

    resizeHandler();
});
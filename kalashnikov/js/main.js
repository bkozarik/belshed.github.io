document.addEventListener('DOMContentLoaded', function(){
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }
    
    var header = document.querySelector('.js-header');

    var burger = document.querySelector('.js-burger');
    var menu = document.querySelector('.js-menu');

    var scrollLinks = document.querySelectorAll('.js-scroll-link');

    var timer = document.querySelector('.js-timer');

    var formFile = document.querySelector('.js-form-file');

    var galleryImg = document.querySelectorAll('.js-gallery-item');

    var customSelects = document.querySelectorAll('.js-dorpdown');

    function scrollHandler(){
        if(window.innerWidth < 900){
            window.pageYOffset >= 160 ? header.classList.add('fixed') : header.classList.remove('fixed');
        }

        document.querySelectorAll('.js-parallax-item').forEach(function(item){
            item.style.top = -1 * window.pageYOffset * 0.2 + 'px';
        });
    }

    function toggleMenu(state){
        state = state || null;

        if(state == null){
            return function(){
                burger.classList.toggle('active');
                menu.classList.toggle('active');
            }
        }
        else{
            state ? burger.classList.add('active') : burger.classList.remove('active');
            state ? menu.classList.add('active') : menu.classList.remove('active');
        }
    }

    function dropdownSelectInit (dropdownItems){

        function createOptionPopupItem (option, index){
            var dropdownPopupItem = document.createElement('li');
            dropdownPopupItem.classList.add('dropdown__value');
            dropdownPopupItem.setAttribute('tabindex', 0);
            
            dropdownPopupItem.innerHTML = option.innerHTML;
            dropdownPopupItem.dataset.index = index;
    
            return dropdownPopupItem;
        }

        dropdownItems.forEach(function(item){
            var options = item.querySelectorAll('option');
            options[0].selected = true;
            
            var dropdownTrigger = document.createElement('button');
            dropdownTrigger.classList.add('button', 'dropdown__trigger', 'js-dropdown-trigger');
            dropdownTrigger.setAttribute('type', 'button');
            
            var dropdownText = document.createElement('span');
            dropdownText.classList.add('dropdown__trigger-text');
            dropdownText.innerText = options[0].innerText;

            var dropdownPopupList = document.createElement('ul');
            dropdownPopupList.classList.add('dropdown__list');

            options.forEach(function(option, index){
                if(option.value != 'none' && !option.hasAttribute('hidden')){
                    var dropdownPopupItem = createOptionPopupItem(option, index);
                    dropdownPopupList.appendChild(dropdownPopupItem);
                    
                    dropdownPopupItem.addEventListener('click', function(){
                        let targetItem = event.target;

                        targetItemIndex = parseInt(targetItem.dataset.index);

                        options[targetItemIndex].selected = true;

                        options.forEach(function(option){
                            if(option.selected) dropdownText.innerText = option.innerText;
                        });
                    });
                }
            });

            dropdownTrigger.appendChild(dropdownText);

            item.appendChild(dropdownTrigger);
            item.appendChild(dropdownPopupList);

            dropdownTrigger.addEventListener('click', function(){
                event.stopImmediatePropagation();
                var target = event.target;

                while(!target.classList.contains('js-dropdown-trigger')){
                    target = target.parentNode;
                }

                target.classList.toggle('active');
                dropdownPopupList.classList.toggle('active');

                document.addEventListener('click', function(){
                    var target = event.target;
                    if(!target.parentNode.classList.contains('js-dropdown-trigger') && !target.classList.contains('js-dropdown-trigger')){
                        document.querySelectorAll('.dropdown__list').forEach(function(item){item.classList.remove('active')});
                        document.querySelectorAll('.js-dropdown-trigger').forEach(function(item){item.classList.remove('active')});
                    }
                }, {once: true});
            });

            item.querySelector('select').addEventListener('change', () => {
                var targetOption = event.target;

                options.forEach(option => {
                    if(option.selected) dropdownText.innerText = option.innerText;
                });
            });
        });
    }

    function fileUpload(){
        var fileName = document.querySelector('.js-form-file-name');

        fileName.parentNode.classList.add('active');
        fileName.innerText = this.files[0].name;
    }

    function timerInit(){
        var targetDate = new  Date(2020, 11, 24, 17, 0, 0, 0);

        var sec = 1000;
        var min = sec * 60;
        var hour = min * 60;
        var day = hour * 24;

        var captionsArr = ['дни', 'часы', 'минуты', 'секунды'];
        var timerItems = timer.querySelectorAll('.timer__item');

        function countTime(){
            var currDate = new Date();
            var dateDifff = targetDate - currDate;
            var days = String(Math.floor(dateDifff / day));
            var hours = String(Math.floor((dateDifff - days * day) / hour));
            var mins = String(Math.floor((dateDifff - days * day - hours * hour) / min));
            var secs = String(Math.floor((dateDifff - days * day - hours * hour - mins * min) / sec));
            
            var dateArr = [days, hours, mins, secs];

            dateArr.forEach(function(num, index){
                timerItems[index].innerHTML = num.length > 1 ? 
                    '<span class="timer__num"><span>' + num[0] + 
                    '</span></span><span class="timer__num"><span>' + num[1] + 
                    '</span></span><span class="timer__item-caption">' + captionsArr[index] + 
                    '</span>':
                    '<span class="timer__num"><span>0</span></span><span class="timer__num"><span>' + num[0] + 
                    '</span></span><span class="timer__item-caption">' + captionsArr[index] + 
                    '</span>';
            });

            setTimeout(countTime, 1000);
        }

        countTime();
    }

    function swiperInit(){
        var popupSwiper = new Swiper('.js-popup-swiper', {
            spaceBetween: 100,
            speed: 700,
            watchSlidesVisibility: true,
            observer: true,
            centeredSlides: true,
            breakpoints: {
                1200: {
                    slidesPerView: 2,
                },
                300: {
                    slidesPerView: 1,
                }
            },
            lazy: {
                loadOnTransitionStart: true,
                loadPrevNext: true,
            },
            navigation: {
                prevEl: '.swiper__control_prev',
                nextEl: '.swiper__control_next',
            },
        });


    }

    function scrollLinkClick(){
        event.preventDefault();

        var targetLink = event.target;
    
        scrollLinks.forEach(function(link){link.classList.remove('active')});

        toggleMenu(false);

        var href;
        var offset = 80;
        
        href = targetLink.getAttribute('href');
        
        window.scroll({
            top: document.querySelector(href).offsetTop - offset,
            behavior: 'smooth'
        });
    }

    function galleryImgClick(){
        var targetItem = this;

        while(!targetItem.classList.contains('js-gallery-item')){
            targetItem = targetItem.parentNode;
        }

        var popupSwiper = document.querySelector('.js-popup-swiper').swiper;
        popupSwiper.slideTo(targetItem.dataset.index, 0, true);

        document.querySelector('.js-popup').classList.add('active');

        document.querySelector('.js-popup-close').addEventListener('click', function(event){
            document.querySelector('.js-popup').classList.remove('active');
        });
    }

    window.addEventListener('scroll', scrollHandler);

    burger.addEventListener('click', toggleMenu());
    scrollLinks.forEach(function(link){link.addEventListener('click', scrollLinkClick)});
    galleryImg.forEach(function(img){img.addEventListener('click', galleryImgClick)});
    
    polyfill();

    try{
        dropdownSelectInit(customSelects);
    }
    catch(e){}

    try{
        formFile.addEventListener('change', fileUpload);
    }
    catch(e){}

    try{
        timerInit();
    }
    catch(e){}
    
    try{
        swiperInit();
    }
    catch(e){}
});
document.addEventListener('DOMContentLoaded', function(){
    var header = document.querySelector('.js-header');

    var burger = document.querySelector('.js-burger');
    var menu = document.querySelector('.js-menu');

    var scrollLinks = document.querySelectorAll('.js-scroll-link');

    var timer = document.querySelector('.js-timer');

    var formFile = document.querySelector('.js-form-file')

    function scrollHandler(){
        window.pageYOffset >= 60 ? header.classList.add('fixed') : header.classList.remove('fixed');
    }

    function toggleMenu(state = null){
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

    function fileUpload(){
        var fileName = document.querySelector('.js-form-file-name');

        fileName.parentNode.classList.add('active');
        fileName.innerText = event.target.files[0].name;
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
                    `<span class="timer__num">
                        <span>${num[0]}</span>
                    </span>
                    <span class="timer__num">
                        <span>${num[1]}</span>
                    </span>
                    <span class="timer__item-caption">${captionsArr[index]}</span>` :
                        `<span class="timer__num">
                            <span>0</span>
                        </span>
                        <span class="timer__num">
                            <span>${num[0]}</span>
                        </span>
                        <span class="timer__item-caption">${captionsArr[index]}</span>`;
            });

            setTimeout(countTime, 1000);
        }

        countTime();
    }

    function scrollLinkClick(){
        event.preventDefault();

        var targetLink = event.target;
    
        scrollLinks.forEach(function(link){link.classList.remove('active')});

        toggleMenu(false);

        var href;
        var offset = 120;
        
        href = targetLink.getAttribute('href');
        
        window.scrollTo({
            top: document.querySelector(href).offsetTop - offset,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', scrollHandler);
    formFile.addEventListener('change', fileUpload);

    burger.addEventListener('click', toggleMenu());
    scrollLinks.forEach(function(link){link.addEventListener('click', scrollLinkClick)});
    
    timerInit();
});
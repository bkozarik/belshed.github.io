document.addEventListener('DOMContentLoaded', function(){
    const header = document.querySelector('.js-header');

    const burger = document.querySelector('.js-burger');
    const menu = document.querySelector('.js-menu');

    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    const timer = document.querySelector('.js-timer');

    const formFile = document.querySelector('.js-form-file')

    const scrollHandler = () => {
        window.pageYOffset >= 60 ? header.classList.add('fixed') : header.classList.remove('fixed');
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

    const fileUpload = () => {
        let fileName = document.querySelector('.js-form-file-name');

        fileName.parentNode.classList.add('active');
        fileName.innerText = event.target.files[0].name;
    }

    const timerInit = () => {
        const targetDate = new  Date(2020, 11, 24, 17, 0, 0, 0);

        const sec = 1000;
        const min = sec * 60;
        const hour = min * 60;
        const day = hour * 24;

        let captionsArr = ['дни', 'часы', 'минуты', 'секунды'];
        let timerItems = timer.querySelectorAll('.timer__item');

        const countTime = () => {
            const currDate = new Date();
            let dateDifff = targetDate - currDate;
            let days = String(Math.floor(dateDifff / day));
            let hours = String(Math.floor((dateDifff - days * day) / hour));
            let mins = String(Math.floor((dateDifff - days * day - hours * hour) / min));
            let secs = String(Math.floor((dateDifff - days * day - hours * hour - mins * min) / sec));
            
            let dateArr = [days, hours, mins, secs];

            dateArr.forEach((num, index) => {
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

    const scrollLinkClick = () => {
        event.preventDefault();

        const targetLink = event.target;
    
        scrollLinks.forEach(link => link.classList.remove('active'));

        toggleMenu(false);

        let href;
        const offset = 120;
        
        href = targetLink.getAttribute('href');
        
        window.scrollTo({
            top: document.querySelector(href).offsetTop - offset,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', scrollHandler);
    formFile.addEventListener('change', fileUpload);

    burger.addEventListener('click', toggleMenu());
    scrollLinks.forEach(link => link.addEventListener('click', scrollLinkClick));
    
    timerInit();
});
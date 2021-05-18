window.onload = () => {
    const isDev = false;

    const preloader = document.querySelector('.js-preloader');
    const preloaderVideo = preloader.querySelector('.preloader__video');
    const header = document.querySelector('.js-header');
    const logo = header.querySelector('.header__logo');

    const pathsArr = preloaderVideo.dataset.videos.split(', ');

    if(!isDev){    
        const createSource = (path, type) => {
            const source = document.createElement('source');
            source.setAttribute('src', path + `.${type}`);
            source.setAttribute('type', `video/${type}`);
    
            return source;
        }
    
        if(!preloaderVideo.childElementCount){
            const index = Number(Math.random() >= 0.5);
    
            preloaderVideo.appendChild(createSource(pathsArr[index], 'webm'));
            preloaderVideo.appendChild(createSource(pathsArr[index], 'mp4'));
        }
    
        setTimeout(() => {
            preloaderVideo.style.maxWidth = logo.getBoundingClientRect().width + 50 + 'px';
            preloader.classList.add('loaded');
        }, 2500);
    }
    else{
        preloader.classList.add('loaded');
    }

    
};
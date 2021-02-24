const lazyVideos = document.querySelectorAll('.review');

const findVideos = () => {
    lazyVideos.forEach(video => setupVideo(video));
}

const setupVideo = video => {
    let link = video.querySelector('.review__link');
    let media = video.querySelector('.review__media');
    let button = video.querySelector('.review__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
        let iframe = createIframe(id);

        while(video.firstChild){
            video.firstChild.remove();
        }
        video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('review--enabled');
}

const parseMediaURL = media => {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

const createIframe = id => {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('review__media');

    return iframe;
}

const generateURL = id => {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
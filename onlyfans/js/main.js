document.addEventListener('DOMContentLoaded', () => {
    const headerSearch = document.querySelector('.js-head-search');

    const headerSearchFocus = () => {
        headerSearch.parentNode.classList.toggle('focus');
    }

    headerSearch.addEventListener('focus', headerSearchFocus);
    headerSearch.addEventListener('focusout', headerSearchFocus);
});
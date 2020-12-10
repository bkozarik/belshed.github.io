document.addEventListener('DOMContentLoaded', () => {
    const languageSelets = document.querySelectorAll('.js-language')

    const createOptionPopupItem = (option, index) => {
        let languagePopupItem = document.createElement('li');
        languagePopupItem.classList.add('language__value');
        languagePopupItem.setAttribute('tabindex', 0);

        languagePopupItem.innerText = option.innerText;
        languagePopupItem.dataset.index = index;

        return languagePopupItem;
    }

    const languageSelectInit = languageItems => {
        languageItems.forEach(item => {
            const options = item.querySelectorAll('option');
            options[0].selected = true;
            
            let languageTrigger = document.createElement('button');
            languageTrigger.classList.add('button', 'language__trigger', 'js-language-select');
            languageTrigger.setAttribute('type', 'button');
            
            let languageText = document.createElement('span');
            languageText.classList.add('language__trigger-text');
            languageText.innerText = options[0].innerText;

            let languagePopupList = document.createElement('ul');
            languagePopupList.classList.add('language__list');

            options.forEach((option, index) => {
                if(option.value != 'none'){
                    let languagePopupItem = createOptionPopupItem(option, index);
                    languagePopupList.appendChild(languagePopupItem);

                    languagePopupItem.addEventListener('click', () => {
                        let targetItem = event.target;
            
                        while(!targetItem.classList.contains('language__value')){
                            targetItem.parentNode;
                        }
                        targetItemIndex = parseInt(targetItem.dataset.index);
            
                        options[targetItemIndex].selected = true;
            
                        options.forEach(option => {
                            if(option.selected) languageText.innerText = option.innerText;
                        });
                    });
                }
            });

            languageTrigger.appendChild(languageText);

            item.appendChild(languageTrigger);
            item.appendChild(languagePopupList);

            languageTrigger.addEventListener('click', () => {
                let target = event.target;

                while(!target.classList.contains('js-language-select')){
                    target = target.parentNode;
                }

                target.classList.toggle('active');
                languagePopupList.classList.toggle('active');

                document.addEventListener('click', () => {
                    let target = event.target;
                    if(!target.parentNode.classList.contains('js-language-select') && !target.classList.contains('js-language-select')){
                        document.querySelectorAll('.language__list').forEach(item => item.classList.remove('active'));
                        document.querySelectorAll('.js-language-select').forEach(item => item.classList.remove('active'));
                    }
                }, {onse: true});
            });

            item.querySelector('select').addEventListener('change', () => {
                let targetOption = event.target;

                options.forEach(option => {
                    if(option.selected) languageText.innerText = option.innerText;
                });
            });
        });
    }

    const scrollHandler = () => {
        window.pageYOffset > 60 ? document.querySelector('.header').classList.add('fixed') : document.querySelector('.header').classList.remove('fixed');
    }

    languageSelectInit(languageSelets);

    window.addEventListener('scroll', scrollHandler);
});
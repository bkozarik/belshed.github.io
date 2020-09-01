document.addEventListener('DOMContentLoaded', () => {
    let menuBtn = document.querySelector('.open_menu');
    let closeMenuBtn = document.querySelector('.close_menu');
    let progressData = document.querySelector('.progress_data');
    let removableItems = document.querySelectorAll('.item__removable');
    let removeLinks = document.querySelectorAll('.remove_row');
    let touchStartX;

    const touchMoveHandler = () => {
        event.preventDefault();

        let touch = event.changedTouches[0];

        let touchTarget = event.target;
        let xPos = touch.clientX;
        let diff = touchStartX - xPos;
        let windowWidth = window.innerWidth;
        let persentage = (diff / windowWidth) * 100;

        while(!touchTarget.classList.contains("table__row-link")){
            touchTarget = touchTarget.parentElement;
        }

        touchTarget.style.transform = "translateX(-" + diff + "px)";

        if(persentage > 20){
            touchTarget.classList.add('table__row_remove');
            touchTarget.removeAttribute('style');
        }
        else if (persentage < -20){
            touchTarget.classList.remove('table__row_remove');
            touchTarget.removeAttribute('style');
        }

    }

    const touchStartHandler = () => {

        let touch = event.changedTouches[0];
        
        touchStartX = touch.clientX;

        let touchTarget = event.target;
        while(!touchTarget.classList.contains("table__row-link")){
            touchTarget = touchTarget.parentElement;
        }
        touchTarget.classList.add('active');
    }

    const touchEndHandler = () => {
        
        let touchTarget = event.target;
        while(!touchTarget.classList.contains("table__row-link")){
            touchTarget = touchTarget.parentElement;
        }
        touchTarget.removeAttribute('style');
        touchTarget.classList.remove('active');
    }   

    const removeRow = () => {
        event.preventDefault();

        let toRemove = event.target;

        while(!toRemove.classList.contains("table__row")){
            toRemove = toRemove.parentElement;
        }

        toRemove.remove();
    }

    const updateProgress = () => {
        try{
            let stPprogressData = progressData.innerText;
            let progressDataSpan = document.querySelector('.progress_data_span');

            let currentAmount = stPprogressData.split('/')[0], 
                targetAmount = stPprogressData.split('/')[1];

            currentAmount = Number(currentAmount.replace(' ', ''));
            targetAmount = Number(targetAmount.replace(' ', ''));

            let percentage = (currentAmount / targetAmount) * 100;

            percentage = constrain(percentage, 0, 100);

            progressDataSpan.style.width = percentage + '%';
        }
        catch{}
    }

    const toggleMenu = (state) => {
        event.preventDefault();

        const menu = document.querySelector('.menu');

        if(typeof(btnState) != 'boolean'){
            if(menuBtn.classList.contains('active')){
                menuBtn.classList.remove('active');
                menu.classList.remove('active');
            }
            else{
                menuBtn.classList.add('active');
                menu.classList.add('active');
            }
        }
        else{
            if(btnState){
                menuBtn.classList.add('active');
                menu.classList.add('active');
                
                return;
            }
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    }

    const closeMenu = () => {
        return toggleMenu(false);
    }

    const constrain = (val, min, max) => {
        return val > max ? max : val < min ? min : val;
    }

    updateProgress();

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    
    removeLinks.forEach(item => {
        item.addEventListener('click', removeRow);
    });

    removableItems.forEach(item => {
        item.addEventListener('touchmove', touchMoveHandler);
        item.addEventListener('touchstart', touchStartHandler);
        item.addEventListener('touchend', touchEndHandler);

        item.insertAdjacentHTML('beforeend', '');
    });
});
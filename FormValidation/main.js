let form = document.querySelector('.form__body');
let formTel = form.querySelector('input[type="tel"]');
let mask = "+7(___) ___-__-__";
let curPos = 3

const formSubmitHandler = () => {
    event.preventDefault();

    console.log('Submit!!!');
}

const formTelFocusHandler = () => {
    let input = event.target;
    setTimeout(() => {
    
        input.value = mask;
        input.selectionStart = input.selectionEnd = curPos;
    });
}

const formTelInputHandler = () => {
    let input = event.target;
    event.preventDefault();

    console.log(event.key);
    mask = mask.split('');
    let posInText = input.selectionStart;
    if(mask[posInText] == '_'){
        mask[posInText] = event.key;
    }
    else{
        while (mask[posInText] != "_" && posInText < input.value.length) {
            posInText += 1;
        }
        mask[posInText] = event.key;
    }
    mask = mask.join('');
    input.value = mask;
    curPos += 1;
    input.selectionStart = input.selectionEnd = curPos;
    
    input.focus();
}

form.addEventListener('submit', formSubmitHandler);
formTel.addEventListener('click', formTelFocusHandler);
// formTel.addEventListener('input', formTelInputHandler);
formTel.addEventListener('keydown', formTelInputHandler);
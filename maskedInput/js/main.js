document.addEventListener('DOMContentLoaded', () => {
    const telInputs = document.querySelectorAll('.js-tel-input');

    const initMask = inputs => {
        const setCursorPosition = (pos, elem) => {
            elem.focus();
            if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
            else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        }

        const setMask = event => {
            const input = event.target;
            const inputFirstNum = input.value.split('')[0];

            let inputMask;

            switch(inputFirstNum){
                case '+':
                    inputMask = '+7 (___) ___ __ __';
                    break;
                case '8':
                default:
                    inputMask = '8 (___) ___ __ __';
                    break;
            }

            setCursorPosition( , input)

            console.log(inputMask.replace(/_/g, (str) => {

            }));
        }

        inputs.forEach(input => {
            input.addEventListener('input', setMask);
        });
    }

    initMask(telInputs);
});
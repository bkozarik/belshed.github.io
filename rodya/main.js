document.addEventListener('DOMContentLoaded', () => {

    const mainList = document.querySelector('.js-main-list');
    const url = './data.json'; // путь к файлу, сюда можно вставить и адрес сервера, который отдает эту строку

    const getData = () => { // получаем строку с сервера
    
        return JSON.parse('[{"name": "test", "child": []}, {"name": "Capacitors", "child": [{"name": "Other", "child": [{"name": "test", "child": []}, {"name": "test", "child": [{"name": "test", "child": []}]}]}]}, {"name": "Connectors", "child": [{"name": "Samtec", "child": []}, {"name": "Harwin", "child": []}, {"name": "Other", "child": []}, {"name": "Molex", "child": []}, {"name": "TE", "child": []}]}, {"name": "Cristals", "child": []}, {"name": "Diodes", "child": []}, {"name": "FPGA", "child": [{"name": "Intel", "child": []}, {"name": "VZPPS", "child": []}]}, {"name": "ICs", "child": []}, {"name": "Inductors", "child": [{"name": "Murata", "child": []}]}, {"name": "Interface", "child": [{"name": "VideoDecoder", "child": []}, {"name": "USB", "child": []}, {"name": "RS232/422/485", "child": []}, {"name": "VideoEncoder", "child": []}]}, {"name": "Led", "child": [{"name": "LED_SMD", "child": []}]}, {"name": "MC", "child": []}, {"name": "Memory", "child": []}, {"name": "Oscillators", "child": []}, {"name": "Power", "child": []}, {"name": "Resistors", "child": [{"name": "Р1-12_ШКАБ", "child": []}]}, {"name": "Transformens", "child": []}, {"name": "Transistors", "child": []}]');
    }


    // по клику на кнопку, добавляем класс "active" родителю кнопки
    const listButtonClick = () => {
        let item = event.target;

        item.parentNode.classList.toggle('active');

        if(!item.parentNode.classList.contains('active')){
            item.parentNode.querySelectorAll('.list__item').forEach(item => item.classList.remove('active'));
        }
    }

    const data = getData(url);

    console.log(data);

    const buildTree = data => {
        let listItems = new Array();

        data.forEach(item => {
            // создаем элемент списка
            let listItem = document.createElement('li');
            listItem.classList.add('list__item');

            // создаем кнопку и вставляем имя папки во внутренний текст
            let listbutton = document.createElement('button');
            listbutton.classList.add('list__button');
            listbutton.innerText = item.name;
            listItem.appendChild(listbutton);

            // если есть дети, то мы создаем в элементе списка еще один список, и вызываем ф-цию buildTree, которая возвращает список детей, обернутых в html
            if(item.child.length > 0){
                let innerList = document.createElement('ul');
                innerList.classList.add('list');

                listItem.classList.add('list__item_has-children');
                buildTree(item.child).forEach(item => innerList.appendChild(item));
                listItem.appendChild(innerList);

            }
            // если детей нет - добавляем класс "list__item_has-no-children"
            else{ 
                listItem.classList.add('list__item_has-no-children');
            }

            listItems.push(listItem); // Добавляем элемент в список элементов, который вернет ф-ция
        });

        return listItems;
    }

    if(typeof(data) == 'object'){ // проверяем, что ответ от сервера это объект( массив в js - тоже объект )
        const list = buildTree(data);
        
        list.forEach(item => mainList.appendChild(item)); // mainList - основной список на странице, тут мы добавляем вы него всех детей, что возвращает buildTree
    }
    else{
        alert("Че бля?");
    }
    let listItems = document.querySelectorAll('.list__button');

    listItems.forEach(item => item.addEventListener('click', listButtonClick)); // добавляем обработку события клика по кнопке
});
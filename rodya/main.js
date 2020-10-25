document.addEventListener('DOMContentLoaded', () => {

    const mainList = document.querySelector('.js-main-list');
    const url = './data.json'; // путь к файлу, сюда можно вставить и адрес сервера, который отдает эту строку

    const getData = async (url) => { // получаем строку с сервера
    
        const resp = await fetch(url) // fetch - ф-ция для получения инфы от сервера
        
        if (resp.ok) {
            
            return resp.json(); // если все ок, то парсим строку в json и возвращаем
        }
        else{
            alert("Ошибка!!");
        }
    }


    // по клику на кнопку, добавляем класс "active" родителю кнопки
    const listButtonClick = () => {
        let item = event.target;

        item.parentNode.classList.toggle('active');
    }

    getData(url) // getData - фсинхронная ф-ция, так что работать с ней нужне немного иначе, она возвращает не переменную, а promise
        .then(data => {
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
                buildTree(data).forEach(item => mainList.appendChild(item)); // mainList - основной список на странице, тут мы добавляем вы него всех детей, что возвращает buildTree
            }
            else{
                alert("Че бля?");
            }
            
        })
        .then(() => {

            let listItems = document.querySelectorAll('.list__button');
        
            listItems.forEach(item => item.addEventListener('click', listButtonClick)); // добавляем обработку события клика по кнопке

        });
});
// const url = 'http://dream-towers.ru/SAPI/objects/';
const url = './js/data.json';
const login = 'dt';
const pass = '123456';
let table = document.querySelector('.table-styled tbody');

const floorPlan = "floor";
const apartmentsPlan = "apartments-plan";

const getData = async (url, login, pass) => {

    let h = new Headers();
    const auth = `Basic ${btoa(login + ":" + pass)}`;
    h.append('Authorization', auth);

    const options = {
        credentials: 'include',
        headers: h,
    }

    const resp = await fetch(url, options)
    
    if (resp.ok) {
        
        return resp.json();
    }
}

const getApData = (floor, tower, apId) => {
    let data = getData(url, login, pass).then(resp => {
        
        let apartments = resp['apartments'];

        let targetApart = apartments.filter(apartment => (apartment.floor == floor && apartment.tower == tower && apartment.id == apId));
        
        sessionStorage.setItem('appId', targetApart[0].id);

        return targetApart[0];
    });

    return data;
}

const getFloorData = async (floor, tower) => {
    
    let data = await getData(url, login, pass).then(resp => {

        let apartments = new Array();

        resp['apartments'].forEach(apartment => (apartment.floor == floor) && (apartment.tower == tower) ? apartments.push(apartment) : null)

        let freeApCount = apartments.filter(apartment => (apartment.status == "Свободна")).length;

        let roomAms = new Array();

        apartments.forEach(apartment => {
            roomAms.push(Number(apartment.rooms));
        });

        let uniqueRoomAms = [...new Set(roomAms)];

        let roomDada = '';
        let floorRoomCountInfo = new Array();

        uniqueRoomAms.forEach(item => {
            let count = 0;
            apartments.forEach(apartment => {
                if(item == Number(apartment.rooms)){
                    count += 1;
                }
            });
            roomDada += `<li>${item} к. - <span>${count}</span></li>`;
            floorRoomCountInfo.push(item);
        });

        let info = {
            totalAp: apartments.length,
            freeAp: freeApCount,
            apInfo: roomDada,
            floorRoomCountInfo: floorRoomCountInfo,

            toString() {
                return `{"totalAp": "${this.totalAp}", "freeAp": "${this.freeAp}", "apInfo": "${this.apInfo}", "floorRoomCountInfo": "${this.floorRoomCountInfo}"}`;
            }
        }
        
        sessionStorage.setItem('floor', floor);
        sessionStorage.setItem('tower', tower);
        sessionStorage.setItem('floorData', info.toString());

        return info;
    });
        
    return data;
}

const getFullFloorData = (floor=null, tower=null) => {
    if(floor != null){
        getFloorData(floor, tower);
    }

    try {
        let roomList = document.querySelector('.js-room-list');
        while(roomList.firstChild){
            roomList.firstChild.remove();
        }

        let floorData = JSON.parse(sessionStorage.getItem('floorData'));

        let floorRoomCountInfo = floorData.floorRoomCountInfo.split(',');

        floorRoomCountInfo.forEach(floorRoomCount => {
            let li = document.createElement("li");
            li.innerHTML = `
                <li>
                    <div class="check check-styled">
                        <label>
                            <input type="radio" name="group-room">
                            <i></i>
                            <span class="number">${floorRoomCount}</span>
                            комнаты
                        </label>
                    </div>
                </li>
            `;
            roomList.appendChild(li);
        });
        
    } catch{}

}

const fillPng = async (floor, tower) => {

    if(tower != 3){
        if(floor == 24 || floor == 23){
            document.querySelectorAll('.plan-help-penthouse').forEach(item => item.classList.add('active'));
            document.querySelector('.plan-help-container').style.display = "flex";
        }
        else{
            document.querySelector('.plan-help-tower').classList.add('active');
        }
    }
    else{
        document.querySelector('.plan-help-corpus').classList.add('active');
        window.addEventListener('resize', () => {
            if(window.innerWidth > 767){
                document.querySelector('.floor-plan').style.padding = "3.2rem 11.6rem 2.5rem";

            }
            else{
                document.querySelector('.floor-plan').style.padding = "0";
            }
        });
        if(window.innerWidth > 767){
            document.querySelector('.floor-plan').style.padding = "3.2rem 11.6rem 2.5rem";

        }
        else{
            document.querySelector('.floor-plan').style.padding = "0";
        }
    }

    let data = await getData(url, login, pass).then(resp =>{
        const rec = resp => {
            let apartments = resp['apartments'];

            let apartsPng = document.querySelectorAll('.plan-help.active .js-apartment-img');

            let floorAparts = apartments.filter(apartment => (apartment.floor == floor && apartment.tower == tower));

            floorAparts.forEach((apart, index) => {
                apartsPng[index].dataset.apid = apart.id;
                apartsPng[index].dataset.rooms = apart.rooms;
                apartsPng[index].classList.add('visible');
                if(floor == 24 || floor == 23){
                    apartsPng[index + 10].dataset.apid = apart.id;
                    apartsPng[index + 10].dataset.rooms = apart.rooms;
                    apartsPng[index + 10].classList.add('visible');
                }
                if(apartsPng[index].classList.contains('visible')){
                    // console.log(apartsPng[index]);

                }
            });
            if(floor == 24 || floor == 23){
                apartsPng.forEach(apart => {
                    if(apart.dataset.apid && apart.classList.contains('visible')){
                        apart.addEventListener('mouseover', () => {
                            let target = event.target;

                            while(!target.classList.contains('js-apartment-img')){
                                target = target.parentNode;
                            }

                            let similarApartments = Array.prototype.slice.call(apartsPng).filter(ap => ap.dataset.apid == target.dataset.apid);

                            similarApartments.forEach(item => item.classList.add('active'));
                        });

                        apart.addEventListener('mouseleave', () => {
                            let target = event.target;

                            while(!target.classList.contains('js-apartment-img')){
                                target = target.parentNode;
                            }

                            let similarApartments = Array.prototype.slice.call(apartsPng).filter(ap => ap.dataset.apid == target.dataset.apid);

                            similarApartments.forEach(item => item.classList.remove('active'));
                        });
                    }
                });
            }
        }
        rec(resp);
    });
}

const filterInit = (minValSq, maxValSq, minValPr, maxValPr) => {
    let dragSliderSQ = document.querySelector('.DragSlider.DragSliderPl');
    let dragSliderPr = document.querySelector('.DragSlider.DragSliderPrice');

    dragSliderSQ.dataset.min = minValSq;
    dragSliderSQ.dataset.start = minValSq;

    dragSliderSQ.dataset.max = maxValSq;
    dragSliderSQ.dataset.end = maxValSq;

    dragSliderPr.dataset.min = minValPr;
    dragSliderPr.dataset.start = minValPr;

    dragSliderPr.dataset.max = maxValPr;
    dragSliderPr.dataset.end = maxValPr;

    $('.DragSlider').each(function(i, elem) {
        if(!$(this).hasClass('noUi-horizontal')){
            var El = $(elem),
            ElSlider = El[0],
            ElValue = El.closest('.DragSliderSection').find('.DragSliderValue'),
            ElMuch = El.closest('.DragSliderSection').find('.DragSliderMuch'),
            DataMin = parseInt(El.attr('data-min')),
            DataStart = parseInt(El.attr('data-start')),
            DataEnd = parseInt(El.attr('data-end')),
            DataMax = parseInt(El.attr('data-max'));

            El.closest('.DragSliderSection').find('.SliderGridMin').html(DataMin);
            El.closest('.DragSliderSection').find('.SliderGridMax').html(DataMax);

            if(isNaN(DataMin)) {var DataMin = 0;}
            if(isNaN(DataMinStart)) {var DataMinStart = DataMin;}
            if(isNaN(DataMax)) {var DataMax = 1000;}
            if(isNaN(DataMaxStart)) {var DataMaxStart = DataMax;}
    
            noUiSlider.create(ElSlider , {
                start: [DataStart, DataEnd],
                connect: true,
                tooltips: true,
                step: 1,
                range: {
                    'min': DataMin,
                    'max': DataMax,
                    
                },
                format: wNumb({
                    decimals: 0,
                    thousand: ' '
                })
            });

            ElSlider.noUiSlider.on('set', () => {
                filterTable();
            })
        }
        
    });
    
}


const showApPage = () => {
    event.preventDefault();
    let tr = event.target;

    while(tr.tagName != 'TR'){
        tr = tr.parentNode;
    }

    let appId = Number(tr.querySelector('td .number').innerText);
    let floor = Number(tr.querySelectorAll('td')[4].innerText);

    sessionStorage.setItem('appId', appId);
    sessionStorage.setItem('floor', floor);

    window.location.assign(apartmentsPlan.replace(/./, ''));
}

const fillTable = (floorCount=null) => {    
    while (table.firstChild) {
        table.firstChild.remove();
    }

    let tower = Number(sessionStorage.getItem('tower'));

    let featuresListNode = document.querySelector('.list-check-line');
    let necessaryFeatures = [];
    if(window.location.href.includes('home-plan.html')){
        featuresListNode.querySelectorAll('label').forEach(label => {
            if(label.querySelector('input').checked){
                necessaryFeatures.push(label.querySelector('span').innerText);
            }
        });
    }

    


    let data = getData(url, login, pass).then(resp => {
        let squareArr = new Array();
        let priceArr = new Array();


        const rec = resp => {
            if(typeof(floorCount) == 'number' || typeof(floorCount) == 'string'){
                for(let key in resp){
                    if (typeof(resp[key]) == 'object' ){
                        if(key == 'apartments'){
                            resp[key].forEach(item => {
                                if(item.status == "Свободна" && item.floor == floorCount && item.tower == tower){
                                    let tr = document.createElement("tr");
                                    tr.classList.add('table-styled__tr');
                                    tr.classList.add('js-ap-page');
                                    tr.classList.add('visible');
                                    tr.innerHTML = `
                                        <td><div class="number">${item.id}</div></td>
                                        <td>${item.square}</td>
                                        <td>${item.rooms}</td>
                                        <td>${item.side}</td>
                                        <td>${item.floor}</td>
                                        <td>Башня ${item.tower}</td>
                                        <td>${item.price} р.</td>
                                    `;
                                    if(item.tower == 3){
                                        tr.innerHTML = `
                                            <td><div class="number">${item.id}</div></td>
                                            <td>${item.square}</td>
                                            <td>${item.rooms}</td>
                                            <td>${item.side}</td>
                                            <td>${item.floor}</td>
                                            <td>Корпус 1</td>
                                            <td>${item.price} р.</td>
                                        `;
                                    }
                                    table.appendChild(tr);
                                }
                            });
                        }
                        rec(resp[key]);
                    }
                    else{
                        return;
                    }
                }
            }
        }

        rec(resp);
        
        let tr = document.querySelectorAll('.js-ap-page');
        tr.forEach(item => item.addEventListener('click', showApPage));
    });
}

const filterTable = () => {

    while (table.firstChild) {
        table.firstChild.remove();
    }
    
    
    setTimeout(() => {
        let squareArr = new Array();
        let priceArr = new Array();
        let data = getData(url, login, pass).then(resp => {

            let minSquare = document.querySelectorAll('.DragSliderPl .noUi-tooltip')[0].innerText.replace(/\s+/g, '');
            let maxSquare = document.querySelectorAll('.DragSliderPl .noUi-tooltip')[1].innerText.replace(/\s+/g, '');
            let minPrice = document.querySelectorAll('.DragSliderPrice .noUi-tooltip')[0].innerText.replace(/\s+/g, '');
            let maxPrice = document.querySelectorAll('.DragSliderPrice .noUi-tooltip')[1].innerText.replace(/\s+/g, '');

            let necessaryFeaturesList = Array.prototype.slice.call(document.querySelectorAll('.list-check-line label')).filter(label => label.querySelector('input:checked')).map(item => item.querySelector('span').innerText);

            let location = 0;
            let type = 0;

            switch (document.querySelector('div.js-location .selected').innerText) {
                case "Все корпусы":
                    location = 0;
                    break;
                case "Башня 1":
                    location = 1;
                    break;
                case "Башня 2":
                    location = 2;
                    break;
                case "Корпус 1":
                    location = 3;
                    break;
            
                default:
                    location = 0;
                    break;
            }

            switch (document.querySelector('div.js-objects .selected').innerText) {
                case "Все объекты":
                    type = 0;
                    break;
                case "1 комнатные":
                    type = 1;
                    break;
                case "2-х комнатные":
                    type = 2;
                    break;
                case "3-х комнатные":
                    type = 3;
                    break;
                case "4-х комнатные":
                    type = 4;
                    break;
                case "Пентхаусы":
                    type = 5;
                    break;
            
                default:
                    type = 0;
                    break;
            }

            let filterParams = {
                minPrice: Number(minPrice),
                maxPrice: Number(maxPrice),
                minSquare: Number(minSquare),
                maxSquare: Number(maxSquare),
                type: type,
                location: location,
                features: necessaryFeaturesList
            }

            resp['apartments'].forEach(item => {
                if(item.status == "Свободна"){
                    if((item.price <= filterParams.maxPrice) && (item.price >= filterParams.minPrice) && (item.square <= filterParams.maxSquare) && (item.square >= filterParams.minSquare) && (necessaryFeaturesList.filter(feature => item.features.includes(feature)).length == necessaryFeaturesList.length)){
                        let tr = document.createElement("tr");
                        tr.classList.add('table-styled__tr');
                        tr.classList.add('js-ap-page');
                        tr.classList.add('visible');
                        tr.innerHTML = `
                            <td><div class="number">${item.id}</div></td>
                            <td>${item.square}</td>
                            <td>${item.rooms}</td>
                            <td>${item.side}</td>
                            <td>${item.floor}</td>
                            <td>Башня ${item.tower}</td>
                            <td>${item.price} р.</td>
                        `;
                        if(item.tower == 3){
                            tr.innerHTML = `
                                <td><div class="number">${item.id}</div></td>
                                <td>${item.square}</td>
                                <td>${item.rooms}</td>
                                <td>${item.side}</td>
                                <td>${item.floor}</td>
                                <td>Корпус 1</td>
                                <td>${item.price} р.</td>
                            `;
                        }
                        if((filterParams.type == 0) || (filterParams.type == 5 && item.floor >= 23) || (filterParams.type == item.rooms)){
                            if((filterParams.location == 0) || (filterParams.location == item.tower)){
                                table.appendChild(tr);
                            }
                        }
                    }
                }
            });
        
            let tr = document.querySelectorAll('.js-ap-page');
            tr.forEach(item => item.addEventListener('click', showApPage));
        });
    }, 150)

}

getFullFloorData();

if(window.location.href.endsWith('home-plan.html') || window.location.href.endsWith('plan') || window.location.href.endsWith('plan/') && !window.location.href.includes('apartments-plan')){
    let data = getData(url, login, pass).then(resp => {
        let squareArr = new Array();
        let priceArr = new Array();

        resp['apartments'].forEach(item => {
            if(item.status == "Свободна"){
                squareArr.push(item.square);
                priceArr.push(item.price);
            }
        });

        let minSquare = squareArr.reduce((a, b) => Math.min(a, b));
        let maxSquare = squareArr.reduce((a, b) => Math.max(a, b));
        let minPrice = priceArr.reduce((a, b) => Math.min(a, b));
        let maxPrice = priceArr.reduce((a, b) => Math.max(a, b));
        
        filterInit(minSquare, maxSquare, minPrice, maxPrice);

        filterTable();

        document.querySelectorAll('.js-filter-trigger').forEach(input => input.addEventListener('change', filterTable));
    });
}
else if(window.location.href.includes(floorPlan)){

    let currFloor, currTower;

    if(isNaN(Number(document.querySelector('.floor-plan').dataset.floor)) == false){
        currFloor = Number(document.querySelector('.floor-plan').dataset.floor);
        currTower = Number(document.querySelector('.floor-plan').dataset.tower);
        
        sessionStorage.setItem('floor', currFloor);
        sessionStorage.setItem('tower', currTower);
    }
    else{
        currFloor = Number(sessionStorage.getItem('floor'));
        currTower = Number(sessionStorage.getItem('tower'));
    }

    fillPng(currFloor, currTower);
    fillTable(currFloor);

    let filterInputs = document.querySelectorAll('.js-room-list input');
    filterInputs.forEach(input => input.addEventListener('change', () => {
        let chosenRoomAmount = Number(input.parentNode.querySelector('.number').innerText);

        document.querySelectorAll('.js-apartment-img').forEach(img => {
            img.classList.remove('active');

            if(Number(img.dataset.rooms) == chosenRoomAmount){
                img.classList.add('active');
            }
        });
    }));
    

}
else if(window.location.href.includes(apartmentsPlan.replace(/[./]/g, ''))){

    let currFloor, currAp, currTower;

    if(isNaN(Number(document.querySelector('.room-one').dataset.ap)) == false){
        currFloor = Number(document.querySelector('.room-one').dataset.floor);
        currTower = Number(document.querySelector('.room-one').dataset.tower);
        currAp = Number(document.querySelector('.room-one').dataset.ap);
        
        sessionStorage.setItem('floor', currFloor);
        sessionStorage.setItem('tower', currTower);
        sessionStorage.setItem('appId', currAp);
    }
    else{
        currAp = Number(sessionStorage.getItem('appId'));
        currFloor = Number(sessionStorage.getItem('floor'));
        currTower = Number(sessionStorage.getItem('tower'));
    }

    document.querySelector('.section-title h1').innerText = "Квартира №" + currAp;

    document.querySelector('.room-name span').innerText = currFloor;

    getApData(currFloor, currTower, currAp).then(apartment => {
        
        document.querySelector('.js-room-img').setAttribute('src', apartment.png_path);
        document.querySelector('.js-load').setAttribute('href', apartment.doc_png_path);
        document.querySelector('.js-rooms').innerText = apartment.rooms;
        document.querySelector('.js-square').innerText = apartment.square;
        document.querySelector('.js-features').innerText = apartment.features;
        document.querySelector('.js-isReady').innerText = apartment.isReady;
        document.querySelector('.js-price').innerText = apartment.price;
        document.querySelector('.js-description').innerText = apartment.description;

    });
}

document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', () => {
        event.preventDefault(); 
        document.querySelectorAll('.js-scroll-link').forEach(item => item.classList.toggle('active'));            

        document.querySelector(event.target.getAttribute('href')).scrollIntoView({block:"start",behavior:"smooth"});
    });
});
    const url = './js/data.json';
    const login = 'dt';
    const pass = '123456';
    let table = document.querySelector('.table-styled tbody');

    const getData = async (url, login, pass) => {

        let h = new Headers();
        const auth = `Basic ${btoa(login + ":" + pass)}`;
        h.append('Authorization', auth);

        const options = {
            mode: 'no-cors',
            credentials: 'include',
            headers: h,
        }

        const resp = await fetch(url, options)
        
        if (resp.ok) {
            
            return resp.json();
        }
    }

    const getFloorData = async (floor) => {
        
        let data = await getData(url, login, pass).then(resp => {
            console.log(resp);

            let apartments = resp['towers']['tower_1'].floors[floor - 1]['apartments'];

            let freeApCount = apartments.filter(apartment => apartment.status == "Свободна").length;

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
            sessionStorage.setItem('floorData', info.toString());

            return info;
        });
            
        return data;
    }

    const getFullFloorData = (floor=null) => {
        if(floor != null){
            getFloorData(floor);
        }

        try {
            let roomList = document.querySelector('.js-room-list');

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

    const fillSvg = async (floor) => {
        let svg = document.querySelector('.js-etag-svg');

        let data = await getData(url, login, pass).then(resp =>{
            const rec = resp => {
                for(let key in resp){
                    if (typeof(resp[key]) == 'object' ){
                        if(key == 'apartments'){
                            let savgApartments = document.querySelectorAll('.svg_apartment');
                            let counter = 0;
                            resp[key].forEach((item, index)=> {
                                if(item.floor == floor){
                                    savgApartments[counter].dataset.apid = item.id;
                                    
                                    counter += 1;
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
            rec(resp);
        });
    }

    const showApPage = () => {
        event.preventDefault();

        let tr = event.target;

        while(tr.tagName != 'TR'){
            tr = tr.parentNode;
        }

        let appId = Number(tr.querySelector('td .number').innerText);
        sessionStorage.setItem('appId', appId);

        window.location.assign('./apartments-plan.html');
    }

    const showSvgApPage = () => {
        let svg = event.target;

        while(!svg.classList.contains('svg_apartment')){
            svg = svg.parentNode;
        }

        let appId = svg.dataset.apid;
        
        sessionStorage.setItem('appId', appId);

        window.location.assign('./apartments-plan.html');
    }

    const fillTable = async (floorCount=null) => {

        while (table.firstChild) {
            table.firstChild.remove();
        }

        let data = await getData(url, login, pass).then(resp => {
            let floor = 0;
            var tower = 1;
            let count = 1;

            const rec = resp => {
                if(floorCount != null){
                    for(let key in resp){
                        if (typeof(resp[key]) == 'object' ){
                            if (key == 'tower_2') {
                                floor = 0;
                                tower += 1;
                            }
                            if (key == 'floors') {
                            }
                            if(key == 'apartments'){
                                floor++;
                                if(count++ == floorCount){
                                    resp[key].forEach(item => {
                                        let tr = document.createElement("tr");
                                        tr.classList.add('table-styled__tr');
                                        tr.classList.add('js-ap-page');
                                        tr.innerHTML = `
                                            <td><div class="number">${item.id}</div></td>
                                            <td>${item.square}</td>
                                            <td>${item.rooms}</td>
                                            <td>${item.side}</td>
                                            <td>${floor}</td>
                                            <td>Башня ${tower}</td>
                                            <td>${item.price} р.</td>
                                        `;
                                        table.appendChild(tr);
                                    });
                                }
                                
                            }
                            rec(resp[key]);
                        }
                        else{
                            return;
                        }
                    }
                }
                else{
                    for(let key in resp){
                        if (typeof(resp[key]) == 'object' ){
                            if (key == 'tower_2') {
                                floor = 0;
                                tower += 1;
                            }
                            if (key == 'floors') {
                            }
                            if(key == 'apartments'){
                                floor += 1;
                                resp[key].forEach(item => {
                                    let tr = document.createElement("tr");
                                    tr.classList.add('table-styled__tr');
                                    tr.classList.add('js-ap-page');
                                    tr.innerHTML = `
                                        <td><div class="number">${item.id}</div></td>
                                        <td>${item.square}</td>
                                        <td>${item.rooms}</td>
                                        <td>${item.side}</td>
                                        <td>${floor}</td>
                                        <td>Башня ${tower}</td>
                                        <td>${item.price} р.</td>
                                    `;
                                    table.appendChild(tr);
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

    getFullFloorData();

    if(window.location.href.indexOf('home-plan.html') > 0){
        fillTable();
    }
    else if(window.location.href.indexOf('etag.html') > 0){

        document.querySelector('.js-room-list input').checked = true;
        let currFloor = Number(sessionStorage.getItem('floor'));

        fillSvg(currFloor);
        fillTable(currFloor);
        
        let svgAparts = document.querySelectorAll('.svg_apartment');

        svgAparts.forEach(apart => apart.addEventListener('click', showSvgApPage))
    }
    else if(window.location.href.indexOf('apartments-plan.html') > 0){

        let currFloor = Number(sessionStorage.getItem('floor'));
        let currAp = Number(sessionStorage.getItem('appId'));

        document.querySelector('.section-title h1').innerText = "Квартира " + currAp;

        document.querySelector('.room-name span').innerText = currFloor;

        let data = getData(url, login, pass).then(resp => {
            const rec = resp => {
                for(let key in resp){
                    if (typeof(resp[key]) == 'object' ){
                        if(key == 'apartments'){
                            resp[key].forEach(item => {
                                if(item.id == currAp && item.floor == currFloor){
                                    console.log(item);
                                    let data = document.createElement("div");
                                    data.classList.add('col-md-6');
                                    data.innerHTML = `
                                                    <ul class="room-info">
                                                    <li>
                                                        <div class="row">
                                                            <div class="col-sm-auto">
                                                                <div class="name">Комнат:</div>
                                                            </div>
                                                            <div class="col-sm">
                                                                <span class="number">${item.rooms}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="row">
                                                            <div class="col-sm-auto">
                                                                <div class="name">Площадь:</div>
                                                            </div>
                                                            <div class="col-sm">
                                                                <div class="sub"><span class="number">${item.square}</span> м<sup>2</sup></div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="row">
                                                            <div class="col-sm-auto">
                                                                <div class="name">Отделка:</div>
                                                            </div>
                                                            <div class="col-sm">
                                                                с отделкой
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="row">
                                                            <div class="col-sm-auto">
                                                                <div class="name">Исполнение:</div>
                                                            </div>
                                                            <div class="col-sm">
                                                                готова к заселению
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="row">
                                                            <div class="col-sm-auto">
                                                                <div class="name">Стоимость:</div>
                                                            </div>
                                                            <div class="col-sm">
                                                                <div class="sub"><span class="number">${item.price}</span> руб.</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <p>${item.description}</p>
                                    `;
                                    document.querySelector('.room-data.row').appendChild(data);
                                    return;
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
            rec(resp);
        });
    }
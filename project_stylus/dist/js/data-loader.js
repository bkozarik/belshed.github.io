    const url = './js/data.json';
    const login = 'dt';
    const pass = '123456';

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

            let apList = resp['towers'][1].floors[floor]['apartments'];
            let freeApCount = 0;

            let roomArr = [];

            apList.forEach(apartment => {
                if(apartment.status == "Свободна"){
                    freeApCount += 1;
                }
                roomArr.push({
                    amount: apartment.rooms,
                    apAmount: 0,
                });
            });

            console.log(roomArr);

            roomArr = Array.from(new Set(roomArr));

            let info = {
                totalAp: apList.length,
                freeAp: freeApCount,
            }
            
            return info;
        });
            
        return data;
    }
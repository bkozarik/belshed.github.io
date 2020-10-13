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
        await getData(url, login, pass).then(resp => {
            // console.log(resp);

            let info = {
                totalAp: resp['towers'][1].floors[floor]['apartments'].length,
            }
            
            return info;
        });
    }
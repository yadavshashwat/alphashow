import axios from 'axios';


let baseurl = null;
baseurl = "http://finance.shashwatyadav.com/api/";


export function api(url, filters) {
    var bodyFormData = new FormData();
    for (const key in filters) {
        let value = filters[key]
        bodyFormData.set(key, value);
    }
    return axios({
        method: 'post',
        baseURL: {
            baseurl
        }.baseurl,
        url: url,
        data: bodyFormData,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }).then(response => response.data)
}


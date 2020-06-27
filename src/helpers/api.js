import axios from 'axios';


let baseurl = null;
baseurl = "http://finance.shashwatyadav.com/api/";


export function api_get(url, filters) {
    var url_send = baseurl + url + '?'
    for (const key in filters) {
        // console.log(key)
        // console.log(filters[key])
        url_send = url_send + key + '=' + filters[key] + '&'
        // bodyFormData.set(key, value);
    }
    return axios.get(url_send).then(response => response.data)
}

export function api_post(url, filters) {
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


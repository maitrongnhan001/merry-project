import axios from 'axios'

export default function getAPI(method, url, data = null, token = null) {
    axios({
        method: method,
        url: url,
        data: data,
        headers:  token && `Authorization: Bearer  + ${token}`
    })
}


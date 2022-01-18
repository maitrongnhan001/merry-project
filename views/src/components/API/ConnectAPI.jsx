import axios from 'axios'

export default function getAPI(method, url, data = null, token = null) {
    return axios({
        method: method,
        url: url,
        data: data,
        headers:  token && `Authorization: Bearer ${token}`
    })
    .then(res=>{
        return {
            timeout: 1,
            status : res.status,
            data: res.data
        }
    })
    .catch(err=>{
        return {
            message: 'Errors happened!',
            err
        }
    })
}


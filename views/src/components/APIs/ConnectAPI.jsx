import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

export default function getAPI(method, url, data = null, token = null) {
    return axios({
        method: method,
        url: url,
        headers:  token && `Authorization: Bearer ${token}`,
        //headers: { 'Content-Type': 'multipart/form-data' },
        data: data
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
            status: err.response.status,
            message: 'Errors happened!',
            err
        }
    })
}

//APIs get start
async function verifiEmail (email) {
    const data = {
        email: email
    }
    const result = await getAPI('POST', '/check-email', data)
    console.log(result);
    switch (result.status) {
        case 200:
            return result.data
        
        case 404:
            return {error: "Chưa nhập email"}
        
        case 500:
            return {error: "Có lỗi xảy ra, xin vui lòng thử lại"}
    }
}

async function register (userInfo) {
    if (!userInfo) return
    const result = await getAPI('POST', '/register', userInfo)

    switch (result.status) {
        case 200:
            return result.data
        
        case 404:
            return {error: "Lỗi, dữ liệu không đúng định dạng"}
        
        case 500:
            return {error: "Có lỗi xảy ra, xin vui lòng thử lại"}
    }
}

export {
    verifiEmail,
    register
}
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
    // eslint-disable-next-line default-case
    switch (result.status) {
        case 200:
            return result.data
        
        case 404:
            return {error: "Chưa nhập email"}
        
        case 500:
            return {error: "Có lỗi xảy ra, xin vui lòng thử lại"}
    }
}


//APIs get chats list
async function getListChat(userId) {
    const result = await getAPI('GET', `/chat/list-chat/${userId}`)
    return result
}

//APIs get friends list
async function getFriendsList(userId) {
    const result = await getAPI('GET', `/friends/${userId}`)
    return result
}

//APIs get groups list
async function getGroupsList(userId) {
    const result = await getAPI('GET', `/groups/${userId}`)
    return result
}

async function register (userInfo) {
    if (!userInfo) return
    const result = await getAPI('POST', '/register', userInfo)

    // eslint-disable-next-line default-case
    switch (result.status) {
        case 200:
            return result.data
        
        case 404:
            return {error: "Lỗi, dữ liệu khans dunk danu dạng"}
        
        case 500:
            return {error: "Có lỗi xảy ra, xin vui lòng thử lại"}
    }
}

//APIs get user profile
async function getUserById(userId) {
    return await getAPI('get', `/users/${userId}`)
}

//APIs get friends request
async function getFriendRequest(userId) {
    return await getAPI('get', `/friends/friends-request/${userId}`)
}

//APIs set template 
async function setTemplate(userId, data) {
    return await getAPI('put', `/users/template/${userId}`, data)
}

//APIs get content chat
async function getContentChat(userId, receiveId) {
    return await getAPI('get', `/chat/content?senderId=${userId}&receiverId=${receiveId}`)
}


export {
    verifiEmail,
    getListChat,
    getFriendsList,
    getGroupsList,
    register,
    getUserById,
    getFriendRequest,
    setTemplate,
    getContentChat
}
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'
const urlImage = 'http://localhost:8080/Medias/'
const urlUserAvatar = 'http://localhost:8080/avatarUser/'
const urlDocument = 'http://localhost:8080/documents/'

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

//APIs extension
async function getLinks(receiverId, limit, offset) {
    if (!receiverId) return
    const endLimit = limit || 10000
    const endOffset = offset || 0
    
    return await getAPI('GET', `/content/link?receiveId=${receiverId}&limit=${endLimit}&position=${endOffset}`)
}

async function getGroupInfo (groupId, userId) {
    if ( !(groupId && userId) ) return
    
    return await getAPI('GET', `/groups?groupId=${groupId}&userId=${userId}`)
}

async function getDocuments(receiverId, limit, offset) {
    if (!receiverId) return
    const endLimit = limit || 10000
    const endOffset = offset || 0
    
    return await getAPI('GET', `/content/document?receiveId=${receiverId}&limit=${endLimit}&position=${endOffset}`)
}

async function getMedias(receiverId, limit, offset) {
    if (!receiverId) return
    const endLimit = limit || 10000
    const endOffset = offset || 0
    
    return await getAPI('GET', `/content/media?receiveId=${receiverId}&limit=${endLimit}&position=${endOffset}`)
}

async function getMembers (idGroup, limit, offset) {
    if (!idGroup) return;
    const endLimit = limit || 1000;
    const endOffset = offset || 0;

    return await getAPI('GET', `/groups/member-list?receiverId=${idGroup}&limit=${endLimit}&position=${endOffset}`);
}

//APIs get content chat
async function getContentChat(userId, receiveId) {
    return await getAPI('get', `/chat/content?senderId=${userId}&receiverId=${receiveId}`)
}

async function getOthersUsers(userId) {
    return await getAPI('get', `/users/others-users/${userId}`)
}

async function getMemberListFromGroupByGroupId(userId,groupId) {
    return await getAPI('get', `/groups/memberIds-list?userId=${userId}&groupId=${groupId}`)
}

async function getUserByEmail(senderId, email) {
    return await getAPI('get', `/users?senderId=${senderId}&search=${email}`)
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
    getLinks,
    getDocuments,
    getMedias,
    getContentChat,
    urlImage,
    urlUserAvatar,
    urlDocument,
    getOthersUsers,
    getGroupInfo,
    getMembers,
    getMemberListFromGroupByGroupId,
    getUserByEmail,
}
const saveChatList = (payload) => {
    return  {
        type: 'SAVE_CHAT_LIST',
        data: payload
    }
}

const saveFriendsList = (payload) =>{
    return {
        type: 'SAVE_FRIENDS_LIST',
        data: payload
    }
}

const saveFriendRequest = (payload) =>{
    return { 
        type: 'SAVE_FRIEND_REQUEST',
        data: payload
    }
}

const showFriendProfile = (payload) => {
    return {
        type: 'SHOW_FRIEND_PROFILE',
        data: payload
    }
}

const addFriendRequest = (payload) => {
    return {
        type: 'ADD_FRIEND_REQUEST',
        data: payload
    }
}


const saveFriendProfile = (payload) => {
    return {
        type: 'SAVE_FRIEND_PROFILE',
        data: payload
    }
}

const deleteFromFriendRequest = (payload) => {
    return {
        type: 'DELETE_FRIEND_REQUEST',
        data: payload
    }
}

const addFriendAfterAccept = (payload) => {
    return { 
        type: 'ADD_FRIEND_AFTER_ACCEPT',
        data: payload
    }
}

const updateInfomationFriend = (payload) => {
    return { 
        type: 'UPDATE_CHAT_INFOMATION',
        data: payload
    }
}

const deleteFriend = (payload) => {
    return {
        type: 'DELETE_FRIEND',
        data: payload
    }
}

const updateChatsList = (payload) => {
    return {
        type: 'UPDATE_CHAT_LIST',
        data: payload
    }
}

const deleteGroupChat = (payload) => {
    return {
        type: 'DELETE_GROUP_CHAT',
        data: payload
    }
}

const updateStatusChatList = (payload) => {
    return { 
        type: 'UPDATE_STATUS_CHAT_LIST',
        data: payload
    }
}

export { 
    saveChatList,
    saveFriendsList,
    showFriendProfile,
    saveFriendRequest,
    saveFriendProfile,
    addFriendRequest,
    deleteFromFriendRequest,
    addFriendAfterAccept,
    updateInfomationFriend,
    deleteFriend,
    updateChatsList,
    deleteGroupChat,
    updateStatusChatList
}
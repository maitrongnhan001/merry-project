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

export { 
    saveChatList,
    saveFriendsList 
}
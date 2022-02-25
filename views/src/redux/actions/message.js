
const saveEmoji = (payload)=> {
    return {
        type: 'SAVE_EMOJI',
        data: payload
    }
}

const saveCurrentChat = (payload)=> {
    return {
        type: 'SAVE_CURRENT_CHAT',
        data: payload
    }
}

export {
    saveEmoji,
    saveCurrentChat
}
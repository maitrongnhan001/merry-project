
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

const saveMassage = (payload)=> {
    return {
        type: 'SEND_MESSAGE',
        data: payload
    }
}

export {
    saveEmoji,
    saveCurrentChat,
    saveMassage
}
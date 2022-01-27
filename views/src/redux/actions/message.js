
const saveEmoji = (payload)=> {
    return {
        type: 'SAVE_EMOJI',
        data: payload
    }
}

export {
    saveEmoji
}
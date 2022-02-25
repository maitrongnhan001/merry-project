const initial = {
    emoji: '',
    currentChat: {},
}

const messageReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'SAVE_EMOJI': {
            return {
                ...state,
                emoji: action.data
            }
        }

        case 'SAVE_CURRENT_CHAT': {
            const currentChat = action.data
            return {
                ...state,
                currentChat
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default messageReducer
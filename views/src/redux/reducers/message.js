const initial = {
    emoji: '',
    currentChat: {},
    message: {
        messageId: '',
        senderId: 0,
        receiverId: '',
        name: '',
        message: 
        {
            type: 'text',
            content: '',
            time: 0,
            status: 'đã gửi'
        }
    }
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
            return {
                ...state,
                currentChat:  action.data
            }
        }

        case 'SEND_MESSAGE': {
            
            return {
                ...state,
                message: action.data

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
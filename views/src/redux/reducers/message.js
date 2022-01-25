const initial = {
    emoji: ''
}

const messageReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'SAVE_EMOJI': {
            return {
                ...state,
                emoji: action.data
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
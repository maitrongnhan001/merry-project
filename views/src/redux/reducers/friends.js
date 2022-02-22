
const initial = {
    friendProfile: 0,
    chatsList: [], 
    friendRequest: [],
    friendsList: []
}

const friendsReducer = (state = initial, action) => {
    switch(action.type) {
        case 'SAVE_CHAT_LIST': {
            const chatsList = [...action.data]
            return {
                ...state,
                chatsList
            }
        }
        case 'SAVE_FRIENDS_LIST': {
            const friendsList = [...action.data]
            console.log(friendsList)
            return {
                ...state,
                friendsList
            }
        }
        case 'SAVE_FRIEND_REQUEST': {
            const friendRequest = [...action.data]
            return {
                ...state,
                friendRequest
            }
        }
        case 'SHOW_FRIEND_PROFILE' : {
            return {
                ...state,
                friendProfile: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default friendsReducer
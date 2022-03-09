
const initial = {
    friendProfile: 0,
    friendProfileData: {},
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
        case 'ADD_FRIEND_REQUEST': {
            let newFriendRequest = state.friendRequest
            // eslint-disable-next-line eqeqeq
            if(action.data.senderId != localStorage.getItem('userId'))
                newFriendRequest.unshift(action.data)
            return {
                ...state,
                friendRequest: newFriendRequest
            }
        }
        case 'DELETE_FRIEND_REQUEST': {
            let newFriendRequest = state.friendRequest
            const idx = newFriendRequest.findIndex((value)=>{ return value.senderId === action.data.senderId && value.receiverId === action.data.receiverId})
            newFriendRequest.splice(idx, 1)
            return {
                ...state,
                friendRequest: newFriendRequest
            }
        }
        case 'SHOW_FRIEND_PROFILE' : {
            return {
                ...state,
                friendProfile: action.data
            }
        }
        case 'SAVE_FRIEND_PROFILE': {
            return {
                ...state,
                friendProfileData: action.data
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
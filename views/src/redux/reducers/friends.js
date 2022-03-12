
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
        case 'UPDATE_CHAT_LIST': {
            const chatsList = [...state.chatsList]
            for(let value of chatsList) {
                // eslint-disable-next-line eqeqeq
                if(value.receiverId == action.data.receiverId) {
                    value.lastMessage.type = action.data.type
                    // eslint-disable-next-line eqeqeq
                    if(action.data.type == 'text') {
                        value.lastMessage.type = 'text'
                        value.lastMessage.content = action.data.content
                    }
                }
            }
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
        case 'ADD_FRIEND_AFTER_ACCEPT': {
            let newFriendList = [...state.friendsList]
            let data = action.data
            // eslint-disable-next-line eqeqeq
            if(data.sender.id == localStorage.getItem('userId')) {
                newFriendList.unshift(data.receiver)
            // eslint-disable-next-line eqeqeq
            }else if(data.receiver.id == localStorage.getItem('userId')){
                newFriendList.unshift(data.sender)
            }
            return {
                ...state,
                friendsList: newFriendList
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
            let newFriendRequest = [...state.friendRequest]
            let data = action.data
            // eslint-disable-next-line eqeqeq
            if(!action.data.status && action.data.senderId != localStorage.getItem('userId'))
                newFriendRequest.unshift(data)
            return {
                ...state,
                friendRequest: newFriendRequest
            }
        }
        case 'DELETE_FRIEND_REQUEST': {
            let newFriendRequest = [...state.friendRequest]
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
        case 'DELETE_FRIEND': {
            let newFriendList = [...state.friendsList]
            // eslint-disable-next-line eqeqeq
            if(action.data.senderId == localStorage.getItem('userId')) {
                // eslint-disable-next-line eqeqeq
                const idx = newFriendList.findIndex((value)=> value.id == action.data.receiverId)
                newFriendList.splice(idx, 1)
            // eslint-disable-next-line eqeqeq
            }else if(action.data.receiverId == localStorage.getItem('userId')){
                // eslint-disable-next-line eqeqeq
                const idx = newFriendList.findIndex((value)=> value.id == action.data.senderId)
                newFriendList.splice(idx, 1)
            }
            return {
                ...state,
                friendsList: newFriendList
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
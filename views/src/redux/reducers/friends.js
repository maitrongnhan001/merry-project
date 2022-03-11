
const initial = {
    friendProfile: 0,
    friendProfileData: {},
    chatsList: [],
    friendRequest: [],
    friendsList: []
}

const friendsReducer = (state = initial, action) => {
    switch (action.type) {
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
        case 'ADD_FRIEND_AFTER_ACCEPT': {
            const friendList = [...state.friendsList]
            // eslint-disable-next-line eqeqeq
            if (action.data.sender.id != localStorage.getItem('userId')) {
                friendList.push(action.data.receiver)
            } else {
                friendList.push(action.data.sender)
            }
            return {
                ...state,
                friendList
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
            if (!action.data.status && action.data.senderId != localStorage.getItem('userId'))
                newFriendRequest.unshift(data)
            return {
                ...state,
                friendRequest: newFriendRequest
            }
        }
        case 'DELETE_FRIEND_REQUEST': {
            let newFriendRequest = [...state.friendRequest]
            const idx = newFriendRequest.findIndex((value) => { return value.senderId === action.data.senderId && value.receiverId === action.data.receiverId })
            newFriendRequest.splice(idx, 1)
            return {
                ...state,
                friendRequest: newFriendRequest
            }
        }
        case 'SHOW_FRIEND_PROFILE': {
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
        case 'UPDATE_CHAT_INFOMATION': {
            //update infomation: Name, image
            const Id = action.data.groupId
            const groupName = action.data.groupName
            const image = action.data.image

            let chatsListTemp = [...state.chatsList]
            for (let index = 0; index < chatsListTemp.length; index++) {
                if (chatsListTemp[index].receiverId === Id) {
                    chatsListTemp[index].receiverName = groupName
                    chatsListTemp[index].image = {
                        image1: image.img1,
                        image2: image.img2
                    }
                }
            }

            return {
                ...state,
                chatsList: chatsListTemp
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
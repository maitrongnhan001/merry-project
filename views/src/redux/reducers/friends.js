
const initial = {
    chatsList: [
        {
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        }
    ], 
    friendsList: [
        {
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
    ]
}

const friendsReducer = (state = initial, action) => {
    switch(action.type) {
        case 'SAVE_CHAT_LIST': {
            const chatsList = [...state.chatsList]
            chatsList.push(action.data)
            return {
                ...state,
                chatsList
            }
        }
        case 'SAVE_FRIENDS_LIST': {
            const friendsList = [...state.friendsList]
            friendsList.push(action.data)
            return {
                ...state,
                friendsList
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
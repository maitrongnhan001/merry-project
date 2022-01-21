
const initial = {
    friendProfile: 0,
    chatsList: [
        {
            id: 1,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 2,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 3,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 4,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 5,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 6,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 7,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 8,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 9,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 10,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 11,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
    ], 
    friendsList: [
        {
            id: 1,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 2,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 3,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 4,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 5,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 6,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 7,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 8,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 9,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 10,
            firstName: 'Phuc Khang',
            lastName: 'Dinh',
            image:'/img/me.jpg'
        },
        {
            id: 11,
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
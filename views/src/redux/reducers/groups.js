const initial = {
    groupsList: [
        {
            id: 'g1',
            name: 'Group 1',
            image: {
                isGroup: 1,
                firstAvatarMember: '/img/me.jpg',
                secondAvatarMember: '/img/me.jpg'
            } ,
            members: [
                {
                    firstName: 'Phuc Khang',
                    lastName: 'Dinh',
                    image: '/img/me.jpg'
                },
                {
                    firstName: 'Phuc Khang',
                    lastName: 'Dinh',
                    image: '/img/me.jpg'
                },
            ]
        },
        {
            id:'g2',
            name: undefined,
            image: '/img/me.jpg',
            members: [
                {
                    firstName: 'Phuc Khang',
                    lastName: 'Dinh',
                    image: '/img/me.jpg'
                },
                {
                    firstName: 'Phuc Khang',
                    lastName: 'Dinh',
                    image: '/img/me.jpg'
                },
            ]
        },
    ]
}


const groupsReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'GET_GROUPS': {
            const newData = action.data.map((value, idx)=>{
                if(value.image) {
                    return value
                }else {
                    return {
                        ...value,
                        image: {
                            isGroup: 1,
                            firstAvatarMember: value.members[0].image,
                            secondAvatarMember: value.members[1].image
                        }
                    }
                }
            })
            const data = [...state.groupsList, ...newData]
            return {
                ...state,
                groupsList: data
            }
        }
        default: {
            return{
                ...state
            }
        }
    }
}

export default groupsReducer
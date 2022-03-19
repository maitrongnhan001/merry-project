const initial = {
    groupsList: [],
    leaveGroup: ''
}

const groupsReducer = (state = initial, action) => {
    switch (action.type) {
        case 'GET_GROUPS': {
            const data = [...action.data]
            return {
                ...state,
                groupsList: data
            }
        }

        case 'ADD_GROUP': {
            let data = [...state.groupsList]
            data.push(action.data)
            return {
                ...state,
                groupsList: data
            }
        }

        case 'UPDATE_GROUP_INFOMATION': {
            //update infomation: Name, image
            const groupId = action.data.groupId
            const groupName = action.data.groupName
            const image = action.data.image

            let groupListTemp = [...state.groupsList]
            for (let index = 0; index < groupListTemp.length; index++) {
                if (groupListTemp[index].groupId === groupId) {
                    groupListTemp[index].groupName = groupName
                    groupListTemp[index].image = {
                        image1: image.img1,
                        image2: image.img2
                    }
                }
            }

            return {
                ...state,
                groupsList: groupListTemp
            }
        }

        case 'DELETE_GROUP': {
            let newList = [...state.groupsList]
            newList.forEach((Element, Index) => {
                // eslint-disable-next-line eqeqeq
                if (Element.groupId == action.data.groupId) {
                    if(action.data.isAdmin) {
                        newList.splice(Index, 1)
                    // eslint-disable-next-line eqeqeq
                    }else if(action.data.memberId == localStorage.getItem('userId')) {
                        newList.splice(Index, 1)
                    }
                }
            })
            return {
                ...state,
                groupsList: newList,
            }
        }

        case 'LEAVE_GROUP': {
            return {
                ...state,
                leaveGroup: action.data
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default groupsReducer
const initial = {
    groupsList: []
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
                if (Element.groupId == action.groupId && action.isAdmin) {
                    newList.splice(Index, 1)
                } else {
                    if (action.memberId == localStorage.getItem('userId')) {
                        newList.splice(Index, 1)
                    }
                }
            })
            return {
                ...state,
                groupsList: newList
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
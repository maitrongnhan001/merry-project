const initial = {
    groupsList: []
}

const groupsReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'GET_GROUPS': {
            const data = [...action.data]
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
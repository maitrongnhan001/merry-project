
const initial = {
    data: 0
}

const taskbarReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'SET_TAB': {
            return {
                ...state,
                data: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default taskbarReducer
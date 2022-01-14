
const initial = {
    data: 0,
    theme: 'light-theme'
}

const taskbarReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'SET_TAB': {
            return {
                ...state,
                data: action.data
            }
        }
        case 'SET_THEME': {
            return {
                ...state,
                theme: action.data
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
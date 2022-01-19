
const initial = {
    data: 0,
    theme: 'light-theme',
    addedForm: 0
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
        case 'SHOW_DIALOG': {
            return {
                ...state,
                addedForm : action.data
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
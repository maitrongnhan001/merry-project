
const initial = {
    data: 0,
    theme: 'light-theme',
    addedForm: 0,
    center: 0,
    feature : {
        isShow: 0,
        id: 0,
        offset: {
            top: 0,
            left: 0
        }
    }
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
        case 'SHOW_FEATURE': {
            return {
                ...state,
                feature : {
                    isShow: action.data.isShow,
                    id: action.data.id,
                    offset: {
                        top: action.data.offset.top,
                        left: action.data.offset.left
                    }
                }
            }
        }
        case 'SHOW_CENTER': {
            return {
                ...state,
                center: action.data
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
import $ from 'jquery'

const initial = {
    isShow: $(window).width() <= 1200 ? 0 : 1
}

const extensionReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'SHOW_EXTENSION': {
            return {
                ...state,
                isShow: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default extensionReducer
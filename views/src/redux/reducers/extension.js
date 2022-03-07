import $ from 'jquery'

const initial = {
    isShow: $(window).width() <= 1200 ? 0 : 1,
    showOrderFeature: null
}

const extensionReducer = (state = initial, action)=> {
    switch(action.type) {
        case 'SHOW_EXTENSION': {
            return {
                ...state,
                isShow: action.data
            }
        }

        case 'UPDATE_SHOW_ORDER_FEATURE': {
            return {
                ...state,
                showOrderFeature: action.data
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
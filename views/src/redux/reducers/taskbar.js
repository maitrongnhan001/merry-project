import $ from 'jquery'

const initial = {
    data: 0,
    theme: 'light-theme',
    addedForm: 0,
    center: 0,
    showTab: $(window).width() <= 800 ? 1 : 0,
    displayCenter: $(window).width() <= 800 ? 0 : 1,
    feature : {
        group: 0,
        isShow: 0,
        id: 0,
        userId: 0,
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
                    group: action.data.group,
                    isShow: action.data.isShow,
                    id: action.data.id,
                    userId: action.data.userId,
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
        case 'SHOW_TAB' : {
            return {
                ...state,
                showTab: action.data
            }
        }
        case 'SET_DISPLAY_CENTER' : {
            return {
                ...state,
                displayCenter: action.data
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
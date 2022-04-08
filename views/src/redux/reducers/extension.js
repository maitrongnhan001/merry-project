import $ from 'jquery'

const initial = {
    isShow: $(window).width() <= 1200 ? 0 : 1,
    showOrderFeature: null,
    showForm: 0,
    newMember: null,
    deleteMember: null,
    updateManagerFriend: 0,
    idUserWillCreateGroup: null
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

        case 'UPDATE_SHOW_FORM_FEATURE_EXTENSION': {
            return {
                ...state,
                showForm: action.data
            }
        }

        case 'UPDATE_NEW_MEMBER': {
            return {
                ...state,
                newMember: action.data
            }
        }

        case 'UPDATE_DELETE_MEMBER': {
            return {
                ...state,
                deleteMember: action.data
            }
        }

        case 'UPDATE_MANAGER_FRIEND': {
            return {
                ...state,
                updateManagerFriend: action.data
            }
        }

        case 'UPDATE_USERID_WILL_CREATE_GROUP': {
            return {
                ...state,
                idUserWillCreateGroup: action.data
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}

export default extensionReducer
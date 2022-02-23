const initial = {
    email: "",
    showNotification: false
}

const emailReducer = (state = initial, action) => {
    switch (action.type) {
        case "UPDATE" : {
            return {
                ...state,
                email: action.data.email,
                showNotification: action.data.showNotification
            }
        }

        case "UPDATE_EMAIL": {
            return {
                ...state,
                email: action.data
            }
        }

        case "UPDATE_NOTIFICATION" : {
            return {
                ...state,
                showNotification: action.data
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default emailReducer;
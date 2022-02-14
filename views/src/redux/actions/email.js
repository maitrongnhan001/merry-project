const initial = {
    email: ""
}

const emailReducer = (state = initial, action) => {
    switch (action.type) {
        case "UPDARE_EMAIL": {
            return {
                ...state,
                email: action.data
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


const initial =  {
    data: {},
} 

const userReducer = (state = initial, action) => {
    switch(action.type) {
        case "USER_LOGIN": {
            return {
                ...state,
                data: action.payload,
            }
        }
        default: {
            return {
                state
            }
        }
    }
}

export default userReducer
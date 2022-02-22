

const initial =  {
    userLogin: []
} 

const userReducer = (state = initial, action) => {
    switch(action.type) {
        case "USER_LOGIN": {
            const newUserLogin = state.userLogin
            newUserLogin.push(action.data)
            return {
                ...state,
                isLogin: newUserLogin,
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
const initial =  {
    userOnline: [1, 2]
} 

const userReducer = (state = initial, action) => {
    switch(action.type) {
        case 'USER_ONLINE': {
            let newUserOnline = state.userOnline
            // for (let idx in newUserOnline) {
            //     if (newUserOnline[idx] !== action.data) {
            //         if(idx === newUserOnline.length - 1) 
            //             newUserOnline.push(action.data)
            //         continue
            //     }else {
            //         break
            //     }
            // }
            console.log(action.data)
            newUserOnline.push(parseInt(action.data))
            return  {
                ...state,
                userOnline: newUserOnline,
            }
        }
        case 'USER_LOGOUT': {
            let userOnline = state.userOnline
            for (let idx in userOnline) {
                if(userOnline[idx] === action.data) {
                    userOnline.splice(idx, 1)
                    break;
                }
            }
            return {
                ...state,
                userOnline
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default userReducer
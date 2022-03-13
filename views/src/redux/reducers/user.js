const initial =  {
    userOnline: []
} 

const userReducer = (state = initial, action) => {
    switch(action.type) {
        case 'USER_ONLINE': {
            let newUserOnline = [...state.userOnline]
            if(newUserOnline.length === 0) {
                newUserOnline.push(action.data)
            }else 
                for (let idx in newUserOnline) {
                    // eslint-disable-next-line eqeqeq
                    if (newUserOnline[idx] != action.data) {
                        // eslint-disable-next-line eqeqeq
                        if(idx == newUserOnline.length - 1) 
                            newUserOnline.push(action.data)
                        continue
                    }else {
                        break
                    }
                }
            return  {
                ...state,
                userOnline: newUserOnline,
            }
        }
        case 'USER_OFFLINE': {
            let newUserOnline = [...state.userOnline]
            for (let idx in newUserOnline) {
                console.log(action.data)
                if(newUserOnline[idx] === action.data) {
                    console.log(idx)
                    newUserOnline.splice(idx, 1)
                    break;
                }
            }
            return {
                ...state,
                userOnline: newUserOnline
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
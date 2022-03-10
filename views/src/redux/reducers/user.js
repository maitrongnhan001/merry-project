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
                    if (newUserOnline[idx] !== action.data) {
                        console.log(action.data)
                        console.log(idx)
                        if(idx === newUserOnline.length - 1) 
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
            let userOnline = [...state.userOnline]
            for (let idx in userOnline) {
                console.log(action.data)
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
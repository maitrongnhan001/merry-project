const saveUserOnline = (payload)=> {
    return {
        type: "USER_ONLINE",
        data: payload
    }
}

const saveUserOffline = (payload)=> {
    return {
        type: "USER_OFFLINE",
        data: payload
    }
}

const saveCurrentUser = (payload)=> {
    return {
        type: "USER_CURRENT",
        data: payload
    }
}

export {
    saveUserOnline,
    saveUserOffline,
    saveCurrentUser,
}
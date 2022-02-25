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

export {
    saveUserOnline,
    saveUserOffline
}
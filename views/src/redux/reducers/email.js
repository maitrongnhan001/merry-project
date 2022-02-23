const update = (payload) => {
    return {
        type: "UPDATE",
        data: payload
    }
}

const updateEmail = (payload) => {
    return {
        type: "UPDATE_EMAIL",
        data: payload
    }
}

const updateNotofication = (payload) => {
    return {
        type: "UPDATE_NOTIFICATION",
        data: payload
    }
}

export {
    update,
    updateEmail,
    updateNotofication
}
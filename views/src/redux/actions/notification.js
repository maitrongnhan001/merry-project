const updateAmountNotification = (payload) => {
    return {
        type: 'UPDATE_AMOUNT_NOTIFICATION',
        data: payload
    }
}

const updateNotification = (payload) => {
    return {
        type: 'UPDATE_NOTIFICATION',
        data: payload
    }
}

export {
    updateAmountNotification,
    updateNotification
}
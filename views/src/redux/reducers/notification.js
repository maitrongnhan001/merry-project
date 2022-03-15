const initial = {
    notification: null,
    amountNotification: 0
}

const notificationReduce = (state = initial, action)=> {
    switch(action.type) {
        case 'UPDATE_AMOUNT_NOTIFICATION': {
            const newAmount = state.amountNotification + action.data
            return {
                ...state,
                amountNotification: newAmount
            }
        }

        case 'UPDATE_NOTIFICATION': {
            const newAmount = state.amountNotification + 1
            return {
                ...state,
                notification: action.data,
                amountNotification: newAmount
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default notificationReduce
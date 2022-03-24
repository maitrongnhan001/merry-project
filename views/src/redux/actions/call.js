const updateCallStatus = (payload)=> {
    return {
        type: 'UPDATE_CALL_STATUS',
        data: payload
    }
}

export {
    updateCallStatus
}
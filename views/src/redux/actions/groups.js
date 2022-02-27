const saveGroupsList = (payload) =>{
    return {
        type: 'GET_GROUPS',
        data: payload
    }
}

export {
    saveGroupsList
}
const getGroups = (payload) =>{
    return {
        type: 'GET_GROUPS',
        data: payload
    }
}

export {
    getGroups
}
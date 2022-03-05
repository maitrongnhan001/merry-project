const saveGroupsList = (payload) =>{
    return {
        type: 'GET_GROUPS',
        data: payload
    }
}

const addGroup = (payload) => {
    return {
        type: 'ADD_GROUP',
        data: payload
    }
}

export {
    saveGroupsList,
    addGroup
}
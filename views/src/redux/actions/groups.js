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

const updateInfomationGroup = (payload) => {
    return {
        type: 'UPDATE_GROUP_INFOMATION',
        data: payload
    }
}

export {
    saveGroupsList,
    addGroup,
    updateInfomationGroup
}
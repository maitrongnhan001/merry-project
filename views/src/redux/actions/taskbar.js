const saveTab = (payload)=> {
    return  {
        type: 'SET_TAB',
        data: payload
    }
}

const setTheme = (payload)=> {
    return {
        type: 'SET_THEME',
        data: payload
    }
}

const showAddedFriend = (payload)=> {
    return {
        type: 'SHOW_ADDED_FRIEND',
        data: payload
    }
}

export {
    saveTab,
    setTheme,
    showAddedFriend
}
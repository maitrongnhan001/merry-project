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

const showDialog = (payload)=> {
    return {
        type: 'SHOW_DIALOG',
        data: payload
    }
}

export {
    saveTab,
    setTheme,
    showDialog
}
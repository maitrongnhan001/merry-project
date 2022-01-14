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

export {
    saveTab,
    setTheme
}
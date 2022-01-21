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

const showFeature = (payload)=> {
    return {
        type: 'SHOW_FEATURE',
        data: payload
    }
}

const showCenter = (payload)=> {
    return {
        type: 'SHOW_CENTER',
        data: payload
    }
}

export {
    saveTab,
    setTheme,
    showDialog,
    showFeature,
    showCenter
}
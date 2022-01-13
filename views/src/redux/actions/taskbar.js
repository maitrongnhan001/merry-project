const saveTab = (payload)=> {
    return  {
        type: 'SET_TAB',
        data: payload
    }
}

export {
    saveTab,
}
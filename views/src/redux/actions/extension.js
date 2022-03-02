
const showExtension = (payload)=>{
    return {
        type: 'SHOW_EXTENSION',
        data: payload
    }
}

const updateIdHeader = (payload) => {
    return {
        type: 'UPDATE_ID_HEADER',
        data: payload
    }
}

export {
    showExtension,
    updateIdHeader
}
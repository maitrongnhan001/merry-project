
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

const updateShowOrderFeature = (payload) => {
    return {
        type: 'UPDATE_SHOW_ORDER_FEATURE',
        data: payload
    }
}

export {
    showExtension,
    updateIdHeader,
    updateShowOrderFeature
}

const showExtension = (payload)=>{
    return {
        type: 'SHOW_EXTENSION',
        data: payload
    }
}

const updateShowOrderFeature = (payload) => {
    return {
        type: 'UPDATE_SHOW_ORDER_FEATURE',
        data: payload
    }
}

const showFormFeatureExtension = (payload) => {
    return {
        type: 'UPDATE_SHOW_FORM_FEATURE_EXTENSION',
        data: payload
    }
}

const updateNewMember = (payload) => {
    return {
        type: 'UPDATE_NEW_MEMBER',
        data: payload
    }
}

const updateDeleteMember = (payload) => {
    return {
        type: 'UPDATE_DELETE_MEMBER',
        data: payload
    }
}

export {
    showExtension,
    updateShowOrderFeature,
    showFormFeatureExtension,
    updateNewMember,
    updateDeleteMember,
}
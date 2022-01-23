const isResponsive = (payload)=> {
    return {
        type: 'RESPONSIVE',
        data: payload,
    }
}

export {
    isResponsive
}
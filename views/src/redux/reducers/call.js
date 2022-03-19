const initial = {
    callStatus: 0
}

export default function callReducer(state = initial, action){
    switch (action.type) {
        case 'UPDATE_CALL_STATUS': {
            return {
                ...state,
                callStatus: action.data
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
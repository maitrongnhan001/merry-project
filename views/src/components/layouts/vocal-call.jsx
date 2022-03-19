import React from 'react'
import './vocal-call.scss'
import Waiting from '../partials/vocal-call/waiting/waiting'
import InCall from '../partials/vocal-call/in-call/in-call'


function VocalCall() {

    return (
        <div className="vocal-call-wrapper">
            <InCall></InCall>
        </div>
    )
}

export default VocalCall

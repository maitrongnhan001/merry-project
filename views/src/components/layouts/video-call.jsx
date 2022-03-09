import React from 'react'
import './video-call.scss'
import { useNavigate } from 'react-router-dom'
import Waiting from '../partials/video-call/waiting/waiting'
import Receive from '../partials/video-call/receive/receive'
import Webcam from "react-webcam"
import $ from 'jquery'


function VideoCall() {


    const [inCall, setInCall] = React.useState(0)

    const webcamRef = React.useRef(null)

    const navigate = useNavigate()

    React.useEffect(()=>{
        if(!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

    React.useEffect(()=> {
        if(inCall) {
            $('.video-call-background').animate({
                width: '15rem',
                height: '10rem',
                right: '4rem',
                bottom: '4rem',
                borderRadius: '1rem'
            })
        }else {
            $('.video-call-background').animate({
                width: '100%',
                height: '100%',
                right: '0',
                bottom: '0',
                borderRadius: '0'
            })
        }
    }, [inCall])

    const handleClick = (e)=> {
        setInCall(inCall? 0 : 1)
    }

    return (
        <div className="video-call-wrapper" onClick={handleClick}>
            
            <div className="video-call-background-partner">
                <Webcam
                    mirrored
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                />
            </div>

            <div className="video-call-background">
                <Webcam
                    mirrored
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                />
            </div>
            <Receive></Receive>
            {/* <Waiting></Waiting> */}
        </div>
    )
}

export default VideoCall
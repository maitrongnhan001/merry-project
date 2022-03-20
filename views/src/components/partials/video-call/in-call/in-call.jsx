import React, { useState, useEffect } from 'react'
import './in-call.scss'
import { getUserById } from '../../../APIs/ConnectAPI'
import { sendCallDown } from '../../../Sockets/socket-call'

function InCall() {
    //-----------------state-------------------//
    const [user, setUser] = useState({})
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)


    //-----------------handle-------------------//
    const handleToMissCall = (e) => {
        if (localStorage.getItem('callId')) {
            sendCallDown({
                senderId: localStorage.getItem('userId'),
                receiverId: localStorage.getItem('callId'),
                type: localStorage.getItem('callType')
            })
            localStorage.removeItem('callId')
        }
        localStorage.removeItem('callStatus')
        localStorage.removeItem('callType')
        window.close()
    }

    //-----------------life cycle-------------------//
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (localStorage.getItem('userId')) {
            const result = await getUserById(localStorage.getItem('userId'))
            if (result && result.status === 200) {
                setUser(result.data.data)
            }
        }
    }, []);

    useEffect(() => {
        let myInterval = setInterval(() => {
            let secondsWillChange = seconds
            let minutesWillChange = minutes
            let hoursWillChange = hours

            //set seconds
            if (secondsWillChange === 59) {
                secondsWillChange = 0
                //set minnutes
                if (minutesWillChange === 59) {
                    minutesWillChange = 0
                    //set hours
                    hoursWillChange ++
                } else {
                    minutesWillChange ++
                }
            } else {
                secondsWillChange ++
            }

            setSeconds(secondsWillChange)
            setMinutes(minutesWillChange)
            setHours(hoursWillChange)
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div className="in-call-video-call-wrapper">
            <div className="in-call-video-call-user-info-group">
                <p className='in-call-video-call-user-status'>
                    {`${hours < 10 ? `0${hours}` : hours}:
                    ${minutes < 10 ? `0${minutes}` : minutes}:
                    ${seconds < 10 ? `0${seconds}` : seconds}`}
                </p>
            </div>
            <div className="in-call-video-call-icons-group">
                <div className="in-call-video-call-phone-icon in-call-video-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default InCall;
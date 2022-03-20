import React, { useState, useEffect } from 'react'
import './in-call.scss'
import { useNavigate } from 'react-router-dom'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { sendCallDown } from '../../../Sockets/socket-call'

function InCall() {

    //-----------------state-------------------//
    const [user, setUser] = useState({})
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    //-----------------others-------------------//
    const navigate = useNavigate()

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
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (localStorage.getItem('userId')) {
            const result = await getUserById(localStorage.getItem('userId'))
            if (result && result.status === 200) {
                setUser(result.data.data)
            }
        }
    }, [])

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
        <div className='in-call-vocal-call-wrapper'>
            <img className='in-call-vocal-call-user-avt-background' src={urlUserAvatar + user.image} alt="" />
            <div className="in-call-vocal-call-user-info-group">
                <img className='in-call-vocal-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                <p className='in-call-vocal-call-user-status'>
                    {`${hours < 10 ? `0${hours}` : hours}:
                    ${minutes < 10 ? `0${minutes}` : minutes}:
                    ${seconds < 10 ? `0${seconds}` : seconds}`}
                </p>
            </div>
            <div className="in-call-vocal-call-icons-group">
                <div className="in-call-vocal-call-phone-icon in-call-vocal-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default InCall
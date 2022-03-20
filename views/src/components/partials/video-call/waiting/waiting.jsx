import React, { useState, useEffect } from 'react'
import './waiting.scss'
import { getMemberListFromGroupByGroupId, getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { sendCallDown } from '../../../Sockets/socket-call'

function Waiting({receiverId}) {

    //-----------------state-------------------//
    const [user, setUser] = useState({})

    //-----------------handle-------------------//
    const handleToMissCall = (e)=> {
        if(localStorage.getItem('callId')){
            sendCallDown({
                senderId: localStorage.getItem('userId'), 
                receiverId: localStorage.getItem('callId'),
                type: localStorage.getItem('callType')
            })
            localStorage.removeItem('callId')
            localStorage.removeItem('callType')
        }
        window.close()
    }

    //-----------------life cycle-------------------//
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=> {
        if(localStorage.getItem('userId')) {
            const result = await getMemberListFromGroupByGroupId(localStorage.getItem('userId'), receiverId)
            if(result && result.status === 200) {
                setUser(result.data.data.profile)
            }
        }
    }, [])

    return (
        <div className="waiting-video-call">
            <div className="waiting-video-call-user-info-group">
                <img className='waiting-video-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                <p className='waiting-video-call-user-status'>Đang gọi<span style={{"--value": 1}}>.</span ><span style={{"--value": 2}}>.</span><span style={{"--value": 3}}>.</span></p>  
            </div>
            <div className="waiting-video-call-icons-group">
                <div className="waiting-video-call-phone-icon waiting-video-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default Waiting

import React from 'react'
import './waiting.scss'
import { useNavigate } from 'react-router-dom'
import { getMemberListFromGroupByGroupId, getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { sendCallDown } from '../../../Sockets/socket-call'

function WaitingCall({receiverId}) {

    //-----------------state-------------------//
    const [user, setUser] = React.useState({})

    //-----------------other-------------------//
    const navigate = useNavigate()

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
    React.useEffect(()=>{
        if(!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async ()=> {
        if(localStorage.getItem('userId')) {
            const result = await getMemberListFromGroupByGroupId(localStorage.getItem('userId'), receiverId)
            if(result && result.status === 200) {
                setUser(result.data.data.profile)
            }
        }
    }, [])

    return (
        <div className="waiting-vocal-call-wrapper">
            <div className="waiting-vocal-call-user-info-group">
                <img className='waiting-vocal-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                <p className='waiting-vocal-call-user-status'>Đang gọi<span style={{"--value": 1}}>.</span ><span style={{"--value": 2}}>.</span><span style={{"--value": 3}}>.</span></p>  
            </div>
            <div className="waiting-vocal-call-icons-group">
                <div className="waiting-vocal-call-phone-icon waiting-vocal-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i className="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default WaitingCall

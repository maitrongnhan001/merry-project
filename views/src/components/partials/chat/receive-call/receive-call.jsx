import React from 'react'
import './receive-call.scss'
import { getMemberListFromGroupByGroupId, getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { showDialog } from '../../../../redux/actions/taskbar'
import { useDispatch, useSelector } from 'react-redux'
import { sendCallDown, sendCallUp } from '../../../Sockets/socket-call'
import { updateCallStatus } from '../../../../redux/actions/call'

function Receive() {

    const dispatch = useDispatch()

    const [user, setUser] = React.useState({})

    const handleToMissCall = (e)=> {
        // window.close()
        if(localStorage.getItem('callId')){
            sendCallDown({
                senderId: localStorage.getItem('userId'), 
                receiverId: localStorage.getItem('callId'),
                type: localStorage.getItem('callType')
            })
            localStorage.removeItem('callId')
            localStorage.removeItem('callType')
        }
        const display = showDialog(0)
        dispatch(display)
    }
    
    const handleClickToCallUp = (e)=> {
        sendCallUp({ 
            senderId: localStorage.getItem('userId'), 
            receiverId: localStorage.getItem('callId'),
            type: localStorage.getItem('callType')
        })
        localStorage.setItem('callStatus', 1) 
        const callStatus = updateCallStatus(1)
        dispatch(callStatus)
        const display = showDialog(0)
        dispatch(display)
        if (localStorage.getItem('callType') == 'video') {
            window.open(`http://localhost:3000/call/video-call/${localStorage.getItem('callId')}`, 'name','width=1000,height=600,left=250,top=100')
        } else {
            window.open(`http://localhost:3000/call/vocal-call/${localStorage.getItem('callId')}`, 'name','width=1000,height=600,left=250,top=100')
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async ()=> {
        if(localStorage.getItem('userId')) {
            const result = await getMemberListFromGroupByGroupId(localStorage.getItem('userId'), localStorage.getItem('callId'))
            if(result && result.status === 200) {
                setUser(result.data.data.profile)
            }
        }
    }, [])

    return (
        <div className="receive-video-call-wrapper">
            <div className="receive-video-call">
                <div className="receive-video-call-user-info-group">
                    <img className='receive-video-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                    <p className='receive-video-call-user-status'>Cuộc gọi đến<span style={{"--value": 1}}>.</span ><span style={{"--value": 2}}>.</span><span style={{"--value": 3}}>.</span></p>  
                </div>
                <div className="receive-video-call-icons-group">
                    <div className="receive-video-call-phone-icon receive-video-call-phone-icon-phone-up" onClick={handleClickToCallUp}>
                        {localStorage.getItem('callType') == 'voice' ? <i className="fa-solid fa-phone"></i> :
                        <i className="fa-solid fa-video"></i>}
                    </div>
                    <div className="receive-video-call-phone-icon receive-video-call-phone-icon-phone-down" onClick={handleToMissCall}>
                        <i className="fa-solid fa-phone-slash"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receive;
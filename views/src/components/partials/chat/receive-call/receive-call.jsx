import React from 'react'
import './receive-call.scss'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { showDialog } from '../../../../redux/actions/taskbar'
import { useDispatch, useSelector } from 'react-redux'
import { sendCallDown, sendCallUp } from '../../../Sockets/socket-call'

function Receive() {

    const dispatch = useDispatch()

    const [user, setUser] = React.useState({})

    const handleToMissCall = (e)=> {
        // window.close()
        if(localStorage.getItem('callId')){
            sendCallDown({senderId: localStorage.getItem('userId'), receiverId: localStorage.getItem('callId')})
            localStorage.removeItem('callId')
        }
        const display = showDialog(0)
        dispatch(display)
    }
    
    const handleClickToCallUp = (e)=> {
        sendCallUp({ senderId: localStorage.getItem('userId'), receiverId: localStorage.getItem('callId')})
        localStorage.setItem('callStatus', 1)
        window.open(`http://localhost:3000/call/video-call/${localStorage.getItem('receiverId')}`, 'name','width=1000,height=600,left=250,top=100')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async ()=> {
        if(localStorage.getItem('userId')) {
            const result = await getUserById(localStorage.getItem('userId'))
            if(result && result.status === 200) {
                setUser(result.data.data)
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
                        <i class="fa-solid fa-phone"></i>
                    </div>
                    <div className="receive-video-call-phone-icon receive-video-call-phone-icon-phone-down" onClick={handleToMissCall}>
                        <i class="fa-solid fa-phone-slash"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receive;
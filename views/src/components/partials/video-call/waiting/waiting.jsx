import React from 'react'
import './waiting.scss'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { sendCallDown } from '../../../Sockets/socket-call'

function Waiting() {

    const [user, setUser] = React.useState({})

    const handleToMissCall = (e)=> {
        if(localStorage.getItem('callId')){
            sendCallDown({senderId: localStorage.getItem('userId'), receiverId: localStorage.getItem('callId')})
            localStorage.removeItem('callId')
        }
        window.close()
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

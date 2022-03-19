import React from 'react'
import './in-call.scss'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'

function InCall() {

    const [user, setUser] = React.useState({})

    const handleToMissCall = (e)=> {
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
        <div className="in-call-video-call-wrapper">
            <div className="in-call-video-call-user-info-group">
                {/* <img className='in-call-video-call-user-avt' src={urlUserAvatar + user.image} alt="" /> */}
                <p className='in-call-video-call-user-status'>00:00:00</p>  
            </div>
            <div className="in-call-video-call-icons-group">
            <div className="in-call-video-call-phone-icon in-call-video-call-phone-icon-volume" onClick={handleToMissCall}>
                    <i class="fa-solid fa-volume-xmark"></i>
                </div>
                <div className="in-call-video-call-phone-icon in-call-video-call-phone-icon-microphone" onClick={handleToMissCall}>
                    <i class="fa-solid fa-microphone-slash"></i>
                </div>
                <div className="in-call-video-call-phone-icon in-call-video-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default InCall;
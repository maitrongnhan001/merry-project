import React from 'react'
import './receive.scss'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'

function Receive() {

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
        <div className="receive-video-call-wrapper">
            <div className="receive-video-call-user-info-group">
                <img className='receive-video-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                <p className='receive-video-call-user-status'>Cuộc gọi đến<span style={{"--value": 1}}>.</span ><span style={{"--value": 2}}>.</span><span style={{"--value": 3}}>.</span></p>  
            </div>
            <div className="receive-video-call-icons-group">
                <div className="receive-video-call-phone-icon receive-video-call-phone-icon-phone-up">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <div className="receive-video-call-phone-icon receive-video-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default Receive;
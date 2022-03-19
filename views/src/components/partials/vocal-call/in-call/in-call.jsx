import React from 'react'
import './in-call.scss'
import { useNavigate } from 'react-router-dom'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'

function InCall() {

    const [user, setUser] = React.useState({})

    const navigate = useNavigate()


    const handleToMissCall = (e)=> {
        window.close()
    }

    React.useEffect(()=>{
        if(!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

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
        <div className='in-call-vocal-call-wrapper'>
            <img className='in-call-vocal-call-user-avt-background' src={urlUserAvatar + user.image} alt="" />
            <div className="in-call-vocal-call-user-info-group">
                <img className='in-call-vocal-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                <p className='in-call-vocal-call-user-status'>00:00:00</p>  
            </div>
            <div className="in-call-vocal-call-icons-group">
                <div className="in-call-vocal-call-phone-icon in-call-vocal-call-phone-icon-volume" onClick={handleToMissCall}>
                    <i class="fa-solid fa-volume-xmark"></i>
                </div>
                <div className="in-call-vocal-call-phone-icon in-call-vocal-call-phone-icon-microphone" onClick={handleToMissCall}>
                    <i class="fa-solid fa-microphone-slash"></i>
                </div>
                <div className="in-call-vocal-call-phone-icon in-call-vocal-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default InCall
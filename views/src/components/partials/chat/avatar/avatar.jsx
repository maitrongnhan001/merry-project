import React, { useEffect, useState } from 'react';
import { getLogout } from '../../../Sockets/home';
import './avatar.scss'

function Avatar({image}) {

    /*----states----*/
    const [isActive, setIsActive] = useState(0)

    useEffect(()=> {
        (async () => {
            const disconnection = await getLogout()
            if(disconnection) {
                setIsActive(0)
            }
        })()
    }, [])

    return (
        <div className="friend-group-avatar-wrapper">
            {
                image.image2 ?
                <>
                    <img src={image.image1} className="no-group-avatar no-group-avatar-1"  alt=""></img>
                    <img src={image.image2} className="no-group-avatar no-group-avatar-2" alt=""></img>
                </> : <img src={image.image1} className="avatar" alt=""></img>
            }
            <p className="friend-group-avatar-active" style={{backgroundColor: isActive ? 'rgb(0, 255, 0)' : '#bebebe'}}></p>
        </div>
    );
}

export default React.memo(Avatar)
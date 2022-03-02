import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { urlUserAvatar } from '../../../APIs/ConnectAPI';
import './avatar.scss'

function Avatar({image, id}) {

    /*----redux----*/
    const userOnline = useSelector((state)=> state.user.userOnline)

    /*----states----*/
    const [isActive, setIsActive] = useState(0)

    useEffect(()=> {
        //console.log(userOnline)
        userOnline.forEach((value)=> {
            if(parseInt(value) === parseInt(id)) {
                setIsActive(1)
            }
        })

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userOnline])

    return (
        <div className="friend-group-avatar-wrapper">
            {
                image.image2 ?
                <>
                    <img src={urlUserAvatar + image.image1} className="no-group-avatar no-group-avatar-1"  alt=""></img>
                    <img src={urlUserAvatar + image.image2} className="no-group-avatar no-group-avatar-2" alt=""></img>
                </> : <img src={urlUserAvatar + image.image1} className="avatar" alt=""></img>
            }
            <p className="friend-group-avatar-active" style={{backgroundColor: isActive ? 'rgb(0, 255, 0)' : '#bebebe'}}></p>
        </div>
    );
}

export default React.memo(Avatar)
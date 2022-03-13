import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { urlUserAvatar } from '../../../APIs/ConnectAPI';
import './avatar.scss'

function Avatar({image, id, members}) {

    /*----redux----*/
    const userOnline = useSelector((state)=> state.user.userOnline)
    
    /*----states----*/
    const [userOnlineId, setUserOnlineId] = React.useState(null)


    useEffect(()=> {
        if(members)
            for(let member of members) {
                let stop = 0;
                for(let user of userOnline) {
                    // eslint-disable-next-line eqeqeq
                    if(member == user) {
                        setUserOnlineId(member)
                        stop = 1
                        break;
                    }else
                        setUserOnlineId(null)
                }
                if(stop) break
            }
    }, [members, userOnline])

    return (
        <div className="friend-group-avatar-wrapper">
            {
                image.image2 ?
                <>
                    <img src={urlUserAvatar + image.image1} className="no-group-avatar no-group-avatar-1"  alt=""></img>
                    <img src={urlUserAvatar + image.image2} className="no-group-avatar no-group-avatar-2" alt=""></img>
                </> : <img src={urlUserAvatar + image.image1} className="avatar" alt=""></img>
            }
            <p className="friend-group-avatar-active" style={{backgroundColor: userOnlineId ? 'rgb(0, 255, 0)' : '#bebebe'}}></p>
        </div>
    );
}

export default Avatar
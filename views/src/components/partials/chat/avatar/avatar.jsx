import React from 'react';
import './avatar.scss'

function Avatar({image}) {

    return (
        <div className="friend-group-avatar-wrapper">
            {
                image.isGroup ?
                <>
                    <img src={image.firstAvatarMember} className="no-group-avatar no-group-avatar-1"  alt=""></img>
                    <img src={image.secondAvatarMember} className="no-group-avatar no-group-avatar-2" alt=""></img>
                </> : <img src={image} className="avatar" alt=""></img>
            }
            <p className="friend-group-avatar-active"></p>
        </div>
    );
}

export default React.memo(Avatar)
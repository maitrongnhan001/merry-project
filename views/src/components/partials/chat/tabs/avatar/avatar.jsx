import React from 'react';
import './avatar.scss'
function Avatar(props) {
    return (
        <div className="friend-group-avatar-wrapper">
            {
                props.image.isGroup ?
                <>
                    <img src={props.image.firstAvatarMember} className="no-group-avatar no-group-avatar-1"  alt=""></img>
                    <img src={props.image.secondAvatarMember} className="no-group-avatar no-group-avatar-2" alt=""></img>
                </> : <img src={props.image} className="avatar" alt=""></img>
            }
        </div>
    );
}

export default React.memo(Avatar)
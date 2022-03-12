import React from 'react'
import MyProfile from './my-profile/profile'
import FriendProfile from './friend-profile/profile'

function Profile({friendProfile}) {
    return (
        <>
        {
            friendProfile ? <FriendProfile></FriendProfile> : <MyProfile></MyProfile>
        }   
        </>
    );
}

export default Profile;
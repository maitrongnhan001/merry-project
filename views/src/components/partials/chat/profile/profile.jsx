import React from 'react'
import MyProfile from './my-profile/profile'
import FriendProfile from './friend-profile/profile'
import { useSelector } from 'react-redux'

function Profile() {

    /*----redux----*/
    //lay du lieu tu redux
    const friendProfile = useSelector(state=>state.friends.friendProfile)
    
    return (
        <>
        {
            friendProfile ? <FriendProfile></FriendProfile> : <MyProfile></MyProfile>
        }   
        </>
    );
}

export default Profile;
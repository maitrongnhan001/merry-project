import React from 'react'
import MyProfile from './my-profile/profile'
import FriendProfile from './friend-profile/profile'
import { useSelector } from 'react-redux'

function Profile(props) {

    //redux 
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
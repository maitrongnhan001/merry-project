import React, { useEffect } from 'react'
import './profile.scss'
import { useDispatch, useSelector } from 'react-redux' 
import $ from 'jquery'
import { deleteFromFriendRequest, showFriendProfile } from '../../../../../redux/actions/friends'
import { showDialog } from '../../../../../redux/actions/taskbar'
import { checkFriend, getAnotherUserByGroupId, urlUserAvatar } from '../../../../APIs/ConnectAPI'
import { sendAcceptFriend, sendAddFriend, sendDeleteFriend, sendDismissFriend } from '../../../../Sockets/socket-friend'
import { updateNotification } from '../../../../../redux/actions/notification'

function Profile() {

    /*----redux----*/
    //ket noi den redux
    const profileSelector = useSelector((state)=>state.friends.friendProfileData)

    const updateManagerFriend = useSelector(state => state.extension.updateManagerFriend)
    const dispatch = useDispatch()


    const userId = parseInt(localStorage.getItem('userId'))

    const [status, setStatus] = React.useState(0);

    const [anotherUser, setAnotherUser] = React.useState(null);

    const handleClickToCancelFriend = async (e) => {
        e.stopPropagation();
        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendDismissFriend(data);
        const showNotification = updateNotification('Hủy yêu cầu kết bạn thành công');
        dispatch(showNotification)
    }

    const handleClickToAddFriend = async (e) => {
        e.stopPropagation();
        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendAddFriend(data);

        const showNotification = updateNotification('Gửi yêu cầu kết bạn thành công');
        dispatch(showNotification)
    }

    const handleClickToDeleteFriend = async (e) => {
        e.stopPropagation();

        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendDeleteFriend(data);

        const showNotification = updateNotification('Huỷ kết bạn thành công');
        dispatch(showNotification)
    }

    const handleClickToAcceptFriend = async (e) => {
        e.stopPropagation();

        const data = {
            senderId: anotherUser,
            receiverId: userId
        }
        
        await sendAcceptFriend(data);
        const friendRequest = deleteFromFriendRequest(data)
        dispatch(friendRequest)
        const showNotification = updateNotification('Đồng ý yêu cầu kết bạn thành công');
        dispatch(showNotification)
    }

    /*----handles----*/
    const handleClickToHideFriendProfile = () => {
        const show = showDialog(0)
        dispatch(show)
        const display = showFriendProfile(0)
        dispatch(display)
    }


    /*----lifecycle----*/
    useEffect(()=> {
        $('.friend-profile-dialog-form').fadeTo('.5s', 1)
    })

    useEffect( () => {
        //check user is friend
        (async ()=> {
            if (profileSelector.profile.receiverId.indexOf('G') === 0) return

            const result = (await checkFriend(userId, profileSelector.profile.receiverId)).data;
    
            switch (result.statusFriend) {
                case 1: {
                    if (userId === result.data.sendId) {
                        setStatus(1);
                    } else {
                        setStatus(2);
                    }
                    break;
                }
    
                case 2: {
                    setStatus(3);
                    break;
                }
    
                default: {
                    setStatus(0)
                }
            }
    
            const ResultAnotherUser = (await getAnotherUserByGroupId(userId, profileSelector.profile.receiverId)).data.data;
    
            setAnotherUser(ResultAnotherUser);
    
            return () => {
                setAnotherUser(null);
                setStatus(null);
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileSelector.profile.receiverId, updateManagerFriend]);

    return (
        <div className="friend-profile-dialog-wrapper" onClick={handleClickToHideFriendProfile}>
            <form  className="friend-profile-dialog-form" onClick={(e)=>e.stopPropagation()}>
                <div className="friend-profile-dialog">
                    <p className="friend-profile-dialog-title">
                        Thông tin
                        <i className="fas fa-times" onClick={handleClickToHideFriendProfile}></i>
                    </p>
                    <div className="friend-profile-scroll">
                        <div className="friend-profile-avatar-wrapper">
                            <img src="/img/cover-background/cover-background.jpg" alt="" className="friend-profile-cover-background" />
                            <div className="friend-profile-avatar">
                                <div className="friend-profile-update-avatar">
                                    <label htmlFor=""><img src={urlUserAvatar + profileSelector.profile.image} alt="" /></label>
                                    <input type="file" id="friend-profile-change-avatar" accept="image/*" style={{ display: 'none' }} />
                                </div>
                                <div className="friend-profile-update-static">
                                    <p className="friend-profile-name">{profileSelector.profile.name}</p>
                                    <p className="friend-profile-email">{profileSelector.profile.email}</p>
                                </div>
                            </div>
                            <div className="friend-profile-action-btn">
                                {
                                    status == 0 ? 
                                    <input type="button" className="btn friend-profile-action-btn-2" value="Kết bạn" onClick={handleClickToAddFriend}/> 
                                    : status == 1 ?
                                    <input type="button" className="btn friend-profile-action-btn-2" value="Hủy yêu cầu" onClick={handleClickToCancelFriend}/>
                                    : status == 2 ?
                                    <input type="button" className="btn friend-profile-action-btn-2" value="Chấp nhận kết bạn" onClick={handleClickToAcceptFriend}/>
                                    :
                                    <input type="button" className="btn friend-profile-action-btn-2" value="Hủy kết bạn" onClick={handleClickToDeleteFriend}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotification } from '../../../../../../../redux/actions/notification';
import { updateShowOrderFeature } from '../../../../../../../redux/actions/extension';
import { sendAddFriend } from '../../../../../../Sockets/socket-friend';
import { sendDeleteMember } from '../../../../../../Sockets/socket-group';
import './feature.scss';

const Feature = (props) => {
    const { isActiveFeature, meIsAdmin, id } = props;
    const userId = localStorage.getItem('userId');
    const listFriend = useSelector(state => state.friends.friendsList);
    const idGroup = useSelector(state => state.message.currentChat.receiverId);

    const dispatch = useDispatch();

    const [isFriend, setIsFriend] = useState(() => {
        if (id === parseInt(userId)) return true;

        let resultFriend = false;
        for (var index of listFriend) {
            if (index.id === id) {
                resultFriend = true;
                break;
            }
        }

        return resultFriend;
    });

    useEffect(() => {
        if (id === parseInt(userId)) return setIsFriend(true);;

        let resultFriend = false;
        for (var index of listFriend) {
            if (index.id === id) {
                resultFriend = true;
                break;
            }
        }

        setIsFriend(resultFriend);

        return () => {
            setIsFriend(null);
        }
    }, [listFriend]);

    const handleClickAddfriend = async (e) => {
        e.stopPropagation();

        if (!userId || !id) return;

        const data = {
            senderId: userId,
            receiverId: id
        }
        await sendAddFriend(data);

        //set notification
        const notification = updateNotification('Gửi lời mời kết bạn thành công');
        dispatch(notification);

        //hide feature
        const hideOrderFeatureExtension = updateShowOrderFeature(null)
        dispatch(hideOrderFeatureExtension)
    }

    const handleClickDeleteMember = async (e) => {
        e.stopPropagation();

        if (!idGroup || !id) return;

        const data = {
            groupId: idGroup,
            memberId: id
        }
        await sendDeleteMember(data);

        //set notification
        const notification = updateNotification('Xoá thành viên nhóm thành công');
        dispatch(notification);

        //hide feature
        const hideOrderFeatureExtension = updateShowOrderFeature(null)
        dispatch(hideOrderFeatureExtension)
    }

    return (
        <div className={`feature-group ${!isActiveFeature ? 'hide' : ''}`}>
            {!isFriend ? <div
                className="feature-item"
                onClick={handleClickAddfriend}
            >
                Kết bạn
            </div> : ''}
            {meIsAdmin ? <div
                className="feature-item text-error"
                onClick={handleClickDeleteMember}
            >
                Mời ra khỏi nhóm
            </div> : ''}
        </div>
    );
}

export default Feature;

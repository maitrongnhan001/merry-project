import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendAddFriend } from '../../../../../../Sockets/socket-friend';
import './feature.scss';

const Feature = (props) => {
    const { isActiveFeature, meIsAdmin, id } = props;
    const userId = localStorage.getItem('userId');
    const listFriend = useSelector(state => state.friends.friendsList);
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
    }, [listFriend]);

    const handleClickAddfriend = async (e) => {
        e.stopPropagation();
        const data = {
            senderId: userId,
            receiverId: id
        }
        await sendAddFriend(data);
    }

    return (
        <div className={`feature-group ${!isActiveFeature ? 'hide' : ''}`}>
            {!isFriend ? <div
                className="feature-item"
                onClick={handleClickAddfriend}
            >
                Kết bạn
            </div> : ''}
            {meIsAdmin ? <div className="feature-item text-error">
                Mời ra khỏi nhóm
            </div> : ''}
        </div>
    );
}

export default Feature;

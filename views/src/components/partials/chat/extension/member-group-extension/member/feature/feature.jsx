import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './feature.scss';

const Feature = (props) => {
    const { isActiveFeature, meIsAdmin, id } = props;
    const listFriend = useSelector(state => state.friends.friendsList);
    const [isFriend, setIsFriend] = useState(() => {
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
        let resultFriend = false;
        for (var index of listFriend) {
            if (index.id === id) {
                resultFriend = true;
                break;
            }
        }

        setIsFriend(resultFriend);
    }, [listFriend]);

    return (
        <div className={`feature-group ${!isActiveFeature ? 'hide' : ''}`}>
            {!isFriend ? <div className="feature-item">
                Kết bạn
            </div> : ''}
            {meIsAdmin ? <div className="feature-item text-error">
                Mời ra khỏi nhóm
            </div> : ''}
        </div>
    );
}

export default Feature;

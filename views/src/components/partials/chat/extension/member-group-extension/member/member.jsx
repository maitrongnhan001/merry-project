import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from '../../../../../../redux/actions/taskbar';
import { showFriendProfile } from '../../../../../../redux/actions/friends';
import { updateShowOrderFeature } from '../../../../../../redux/actions/extension';
import { showExtension } from '../../../../../../redux/actions/extension';
import Image from '../../../avatar/avatar';
import Feature from './feature/feature';
import './member.scss';

const Member = (props) => {
    const userId = localStorage.getItem('userId');
    const listFriend = useSelector(state => state.friends.friendsList);
    const isShowOrderFeature = useSelector(state => state.extension.showOrderFeature);
    const { name, isAdmin, meIsAdmin, index, id } = props;

    const dispatch = useDispatch();

    const [isActiveFeature, setIsActiveItem] = useState(false);
    const [isFeature, setIsFeature] = useState(() => {
        let resultFriend = false;
        for (var index of listFriend) {
            if (index.id === id) {
                resultFriend = true;
                break;
            }
        }

        return (!resultFriend || meIsAdmin) && (id !== parseInt(userId));
    });

    useEffect(() => {
        let resultFriend = false;
        for (var index of listFriend) {
            if (index.id === id) {
                resultFriend = true;
                break;
            }
        }
        
        const endResult = (!resultFriend || meIsAdmin) && (id !== parseInt(userId));
        setIsFeature(endResult);
    }, [listFriend, meIsAdmin]);

    const image = {
        image1: props.image,
        image2: null
    }

    //xu ly an hien form thong tin ca nhan
    const handleClickToShowProfile = () => {
        const show = showDialog(3)
        dispatch(show)
        const display = showFriendProfile(1)
        dispatch(display)

        //hide extension
        const isShowExtension = showExtension(0);
        dispatch(isShowExtension);
    }

    useEffect(() => {
        if (isShowOrderFeature !== index) {
            setIsActiveItem(false);
        }
    }, [isShowOrderFeature]);

    const handleClickOrderFeature = (e) => {
        e.stopPropagation();
        const isActiveFeatureInProcess = isActiveFeature;
        setIsActiveItem(!isActiveFeatureInProcess);

        //store data to redux
        const updateShowOrderFeatureInProcess = updateShowOrderFeature(index);
        dispatch(updateShowOrderFeatureInProcess);
    }

    return (
        <div className='member-group' onClick={handleClickToShowProfile}>
            <div className="member-image">
                <Image image={image}></Image>
            </div>
            <div className={`member-text ${isAdmin ? 'admin' : ''}`}>
                <p className='member-fullname'>{(id === parseInt(userId)) ? 'Bạn' : name}</p>
                {isAdmin ? <span className='admin-text'>Trưởng nhóm</span> : ''}
            </div>
            {isFeature ? <button
                className='other-feature'
                onClick={handleClickOrderFeature}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </button> : ''}
            <Feature
                isActiveFeature={isActiveFeature}
                meIsAdmin={meIsAdmin}
                id={id}
            />
        </div>
    );
}

export default Member;

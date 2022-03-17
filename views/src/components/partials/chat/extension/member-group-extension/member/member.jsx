import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from '../../../../../../redux/actions/taskbar';
import { saveFriendProfile, showFriendProfile } from '../../../../../../redux/actions/friends';
import { updateShowOrderFeature } from '../../../../../../redux/actions/extension';
import { showExtension } from '../../../../../../redux/actions/extension';
import { getUserInformationForProfile } from '../../../../../APIs/ConnectAPI';
import Image from '../../../avatar/avatar';
import Feature from './feature/feature';
import './member.scss';

const Member = (props) => {
    //--------------------props-----------------------//
    const { name, isAdmin, meIsAdmin, index, id } = props;

    //--------------------redux-----------------------//
    const listFriend = useSelector(state => state.friends.friendsList);
    const isShowOrderFeature = useSelector(state => state.extension.showOrderFeature);
    const dispatch = useDispatch();

    //--------------------localstorage-----------------------//
    const userId = localStorage.getItem('userId');

    //-----------------------state--------------------------//
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

    //----------------------handle-------------------------//
    //xu ly an hien form thong tin ca nhan
    const handleClickToShowProfile = async () => {
        //get user's information
        const meUserId = parseInt(localStorage.getItem('userId'));
        const result = await getUserInformationForProfile(meUserId, id);
        if (result && result.status === 200) {
            const profileData = {
                isGroup: 0,
                profile: result.data.data
            }
            const friendProfileDataAction = saveFriendProfile(profileData);
            dispatch(friendProfileDataAction);
            const show = showDialog(3);
            dispatch(show);
            const display = showFriendProfile(1);
            dispatch(display);
        }

        //hide extension
        const isShowExtension = showExtension(0);
        dispatch(isShowExtension);
    }

    const handleClickOrderFeature = (e) => {
        e.stopPropagation();
        const isActiveFeatureInProcess = isActiveFeature;
        setIsActiveItem(!isActiveFeatureInProcess);

        //store data to redux
        const updateShowOrderFeatureInProcess = updateShowOrderFeature(index);
        dispatch(updateShowOrderFeatureInProcess);
    }

    //------------------life cycle-----------------------//
    useEffect(() => {
        if (isShowOrderFeature !== index) {
            setIsActiveItem(false);
        } else {
            setIsActiveItem(true);
        }

        return () => {
            setIsActiveItem(false);
        }
    }, [isShowOrderFeature]);

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

    //----------------------data-------------------------//
    const image = {
        image1: props.image,
        image2: null
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

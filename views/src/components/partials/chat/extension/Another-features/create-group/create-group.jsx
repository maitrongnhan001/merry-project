import React, { useState, useEffect } from 'react';
import './create-group.scss';
import { showDialog } from '../../../../../../redux/actions/taskbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAnotherUserByGroupId } from '../../../../../APIs/ConnectAPI';
import { updateUserIdWillCreateGroup, showExtension } from '../../../../../../redux/actions/extension';

const CreateGroup = () => {

    //----------connect to redux-----------//
    const dispatch = useDispatch();

    //----------get data from redux--------//
    const idChat = useSelector(state => state.message.currentChat.receiverId);
    const userId = parseInt(localStorage.getItem('userId'));

    //--------------hook-------------------//
    const [anotherUser, setAnotherUser] = useState(null);
    //-------------handle------------------//
    const handleClickCreateGroup = (e) => {
        e.stopPropagation();

        const updateUserId = updateUserIdWillCreateGroup(anotherUser);
        dispatch(updateUserId);

        const showFormCreateGroup = showDialog(2);
        dispatch(showFormCreateGroup);
    }
    //-------------life cycle--------------//
    useEffect( async () => {
        //check data
        if (!userId || !idChat || idChat.indexOf('G') === 0) return;

        //get it anotherUser
        const result = await getAnotherUserByGroupId(userId, idChat);
        
        if (result.status === 200) {
            setAnotherUser(result.data.data);
        }

        return () => {
            setAnotherUser(null);
        }
    }, [idChat]);

    return (
        <div 
            className='item-function'
            onClick={handleClickCreateGroup}
        >
            <p className='function-name'>Tạo nhóm với người này</p>
        </div>
    );
}

export default CreateGroup;

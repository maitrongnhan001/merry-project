import React from 'react';
import './leave-group.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showFormFeatureExtension} from '../../../../../../redux/actions/extension';
import { leaveGroup } from '../../../../../../redux/actions/groups';

const LeaveGroup = () => {
    //--------------------redux-----------------------//
    const dispatch = useDispatch();

    const receiverId = useSelector(state=>state.message.currentChat.receiverId)

    //----------------------handle-------------------------//
    const handleClickLeaveGroup = (e) => {
        e.stopPropagation();
        const groupId = leaveGroup(receiverId);
        dispatch(groupId)
        //show form
        const displayForm = showFormFeatureExtension(4);
        dispatch(displayForm);
    }

    return (
        <div 
            className='item-function'
            onClick={handleClickLeaveGroup}
        >
            <p className='function-name red'>Rời nhóm</p>

        </div>
    );
}

export default LeaveGroup;

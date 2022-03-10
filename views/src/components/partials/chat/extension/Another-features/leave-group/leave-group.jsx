import React from 'react';
import './leave-group.scss';
import { useDispatch } from 'react-redux';
import { showFormFeatureExtension, showExtension } from '../../../../../../redux/actions/extension';

const LeaveGroup = () => {
    const dispatch = useDispatch();

    const handleClickLeaveGroup = (e) => {
        e.stopPropagation();

        //show form
        const displayForm = showFormFeatureExtension(4);
        dispatch(displayForm);

        //hide extension
        const hideExtension = showExtension(0);
        dispatch(hideExtension);
    }

    return (
        <div 
            className='item-function'
            onClick={handleClickLeaveGroup}
        >
            <p className='function-name red'>Rời nhóm</p>
            <hr className='function-distingush' />
        </div>
    );
}

export default LeaveGroup;

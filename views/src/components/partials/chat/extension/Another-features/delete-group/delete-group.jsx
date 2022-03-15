import React from 'react';
import './delete-group.scss';
import { useDispatch } from 'react-redux';
import { showFormFeatureExtension, showExtension } from '../../../../../../redux/actions/extension';

const DeleteGroup = () => {

    //----------connect to redux-----------//
    const dispatch = useDispatch();

    //-------------handle------------------//
    const handleClickCreateGroup = (e) => {
        e.stopPropagation();

        const showFormCreateGroup = showFormFeatureExtension(5);
        dispatch(showFormCreateGroup);

        const hideExtension = showExtension(0);
        dispatch(hideExtension);
    }

    return (
        <div 
            className='item-function'
            onClick={handleClickCreateGroup}
        >
            <p className='function-name red'>Xoá nhóm</p>
        </div>
    );
}

export default DeleteGroup;

import React from 'react';
import { useDispatch } from 'react-redux';
import { showFormFeatureExtension, showExtension } from '../../../../../../redux/actions/extension';

const AddMember = () => {
     //--------------------redux-----------------------//
    const dispatch = useDispatch();

    //----------------------handle-------------------------//
    const clickAddMember = () => {
        //show form add members
        const displayFormAddMember = showFormFeatureExtension(1);
        dispatch(displayFormAddMember);
        
        //hide extension
        const hideExtension = showExtension(0);
        dispatch(hideExtension);
    }

    return (
        <div className='item-function'>
        <p 
            className='function-name'
            onClick={clickAddMember}
        >Thêm thành viên</p>
    </div>
    );
}

export default AddMember;

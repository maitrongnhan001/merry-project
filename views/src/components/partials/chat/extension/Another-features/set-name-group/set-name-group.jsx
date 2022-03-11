import React from 'react';
import { showFormFeatureExtension, showExtension } from '../../../../../../redux/actions/extension';
import { useDispatch } from 'react-redux';

const SetNameGroup = () => {

    //_____connect to redux------//
    const dispatch = useDispatch();

    //-----handle-------//
    const handleClickRename = (e) => {
        e.preventDefault()

        //show form
        const showFormRename = showFormFeatureExtension(3);
        dispatch(showFormRename);

        //hide extension
        const hideExtension = showExtension(0);
        dispatch(hideExtension);
    }

    return (
        <div className='item-function'>
            <p 
                className='function-name'
                onClick={handleClickRename}
            >Đổi tên nhóm</p>
            <hr className='function-distingush' />
        </div>
    );
}

export default SetNameGroup;

import React from 'react';
import { showFormFeatureExtension, showExtension } from '../../../../../../redux/actions/extension';
import { useDispatch } from 'react-redux';

const SetAvatarGroup = () => {
    //-------connect to redux-------------//
    const dispatch = useDispatch();

    //------------handle------------------//
    //show form update avatar
    const handleClickShowAvatarForm = (e) => {
        e.stopPropagation();
        
        const showFormUpdateAvatar = showFormFeatureExtension(2);
        dispatch(showFormUpdateAvatar);
        const hideExtension = showExtension(0);
        dispatch(hideExtension);
    }

    return (
        <div 
            className='item-function'
            onClick={handleClickShowAvatarForm}
        >
            <p className='function-name'>Thay đổi ảnh đại diện nhóm</p>
        </div>
    );
}

export default SetAvatarGroup;

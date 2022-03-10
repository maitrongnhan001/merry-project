import React from 'react';
import './leave-group.scss';

const LeaveGroup = () => {

    const handleClickLeaveGroup = (e) => {
        e.stopPropagation();
        console.log('click');
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

import React from 'react';
import Image from '../../avatar/avatar';
import './header-extension.scss';

const HeaderExtension = () => {

    const user = {
        id: '1',
        firstName: 'Phuc Khang',
        lastName: 'Dinh',
        image: '/img/me.jpg'
    }

    return (
        <div className='extension-header'>
            <div className="extension-header-avatar">
                <Image image={user.image} ></Image>
            </div>

            <p className='name-user-extension'>Đinh Phúc Khang</p>
        </div>
    );
}

export default HeaderExtension;

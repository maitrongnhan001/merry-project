import React, { useEffect, useState } from 'react';
import Image from '../../avatar/avatar';
import './header-extension.scss';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../../APIs/ConnectAPI';

const HeaderExtension = () => {

    const userId = useSelector(state => state.extension).idHeader;

    const [userInfo, setUserInfo] = useState({
        id: userId || null,
        image: '',
        name: ''
    });

    useEffect( async () => {
        //get data of the main use
        //const result = await getUserById(userInfo.id);

        // const image = `http://localhost:8080/avatarUser/${result.data.data.image}`;
 
        // setUserInfo({
        //     ...userInfo,
        //     image: image,
        //     name: result.data.data.name
        // });
    }, []);

    return (
        <div className='extension-header'>
            <div className="extension-header-avatar">
                <Image image={{image1: userInfo.image}} id={userInfo.id} ></Image>
            </div>

            <p className='name-user-extension'>{userInfo.name}</p>
        </div>
    );
}

export default HeaderExtension;

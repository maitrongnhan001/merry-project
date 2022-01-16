import React, { useState } from 'react';
import MeidaItem from './media-item/media-item';
import './medias.scss';
import $ from 'jquery';

const Medias = () => {

    const [is_active, setIsActive] = useState(false);

    const list_medias = [
        '/img/sample-image/1.jpeg',
        '/img/sample-image/2.jpeg',
        '/img/sample-image/1.jpeg',
        '/img/sample-image/2.jpeg',
        '/img/sample-image/2.jpeg',
        '/img/sample-image/1.jpeg',
        '/img/sample-image/2.jpeg',
        '/img/sample-image/1.jpeg',
    ];

    const list_media_tags = list_medias.map((element, index) => {
        return (
            <MeidaItem link_image={element} key={index} ></MeidaItem>
        );
    })

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-medias').animate({
            height: 'toggle'
        });
    }

    return (
        <div className='element-extension'>
            <div
                className="show-feature-extension-button"
                onClick={onActive}>
                <p>Đa phương tiện</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    fill="currentColor"
                    className={is_active ? 'active' : ''}
                    viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>

            <div className={`list-medias ${is_active ? 'show' : 'hide'}`}>
                {list_media_tags}
            </div>
        </div>
    );
}

export default Medias;

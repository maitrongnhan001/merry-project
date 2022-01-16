import React from 'react';
import './media-item.scss';

const MediaItem = (props) => {

    const { link_image } = props;

    return (
        <div className='media-item'>
            <a href={`${link_image}`}>
                <img src={`${link_image}`} alt={`${link_image}`} />
            </a>
        </div>
    );
}

export default MediaItem;

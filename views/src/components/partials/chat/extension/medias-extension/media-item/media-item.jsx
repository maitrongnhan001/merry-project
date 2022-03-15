import React from 'react';
import './media-item.scss';

const MediaItem = (props) => {
    //--------------------props-----------------------//
    const { link_media } = props;

    //---------------------data-----------------------//
    const image_media = link_media.split('.');
    const extension = image_media[image_media.length-1];
    const extension_video = ['avi', 'mp4', 'wmv', 'mkv', 'vob', 'flv'];

    if (extension_video.includes(extension)) {
        var media_element = <video src={`${link_media}`} className='media-element'/>;
    } else {
        var media_element = (<img src={`${link_media}`} alt={`${link_media}`} className='media-element'/>);
    }

    return (
        <div className='media-item'>
            <a href={`${link_media}`}>
                {media_element}
            </a>
        </div>
    );
}

export default MediaItem;

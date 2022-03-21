import React from 'react';
import './start-picture.scss';

const StartPicture = () => {
    return (
        <div className='start-picture-component'>
            <br />
            <div className="group-picture">
                <div className="picture-desktop"><img src="/img/cover-background/desktop.jpg" alt="" /></div>
                <div className="picture-tablet"><img src="/img/cover-background/tablet.jpg" alt="" /></div>
                <div className="picture-phone"><img src="/img/cover-background/phone.jpg" alt="" /></div>
            </div>
            <div className="end-space"></div>
        </div>
    );
}

export default StartPicture;

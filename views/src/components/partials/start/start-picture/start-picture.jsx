import React from 'react';
import './start-picture.scss';

const StartPicture = () => {
    return (
        <div className='start-picture-component'>
            <br />
            <div className="group-picture">
                <div className="picture-desktop"></div>
                <div className="picture-tablet"></div>
                <div className="picture-phone"></div>
            </div>
        </div>
    );
}

export default StartPicture;

import React, { useState } from 'react';
import './avatar.scss';

const Avatar = () => {
    const [img_tag, set_img_tag] = useState(
        <img
            src="/img/img-description/choose-avatar.jpeg"
            alt="choose avatar"></img>
    );

    //Update image file
    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        const type = file.type.split('/').splice(0, 1)[0];

        if (type === 'image') {
            var File = new FileReader();
            File.readAsDataURL(file);

            File.onload = e => {
                const img_review = (<img alt={file.name} src={e.target.result} ></img>);
                set_img_tag(img_review);
            }
        }
    }

    return (
        <div className='start-input-component'>
            <br /><br /><br /><br />

            <div className="review-avatar">
                {img_tag}
                <label className='label-input-avatar' htmlFor='input-avatar'></label>
            </div>


            <input
                type="file"
                name='avatar'
                id='input-avatar'
                className='input-avatar'
                onChange={handleChangeFile}
            />

            <div className="two-button">
                <button className='custom-btn left start-btn-white'>
                    Trở về
                </button>

                <button className='start-btn right start-btn-primary'>
                    Tiếp tục
                </button>
            </div>

            <br /><br /><br /><br />

        </div>
    );
}

export default Avatar;

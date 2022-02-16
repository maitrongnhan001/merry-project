import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './avatar.scss';

const Avatar = (props) => {
    const { token, handleUpdateAvatar, handleSubmitRegister } = props;

    const [img_tag, set_img_tag] = useState(
        <img
            src="/img/img-description/choose-avatar.jpeg"
            alt="choose avatar"></img>
    );

    const navigate = useNavigate();

    //Update image file
    const handleChangeFile = async (e) => {
        //animation for review image
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

        //handle change image
        handleUpdateAvatar(file.name, file);
    }

    const handleSubmitFile = () => {
        handleSubmitRegister();
    }

    const handleGoBack = () => {
        navigate(`/register/${token}/name`);
    }

    return (
        <div className='start-input-component'>
            <div className="start-space"></div>
            
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
                <button 
                    className='custom-btn left start-btn-white'
                    onClick={handleGoBack}
                >
                    Trở về
                </button>

                <button 
                    className='start-btn right start-btn-primary'
                    onClick={handleSubmitFile}
                >
                    Tiếp tục
                </button>
            </div>
            <div className="end-space"></div>
        </div>
    );
}

export default Avatar;

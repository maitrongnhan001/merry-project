import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StartLoading from '../../tools/start-loading/start-loading';
import './avatar.scss';

const Avatar = (props) => {
    const { token, error, handleUpdateAvatar, handleSubmitRegister, passwordProps } = props;

    const [img_tag, set_img_tag] = useState(
        <img
            src="/img/img-description/choose-avatar.jpeg"
            alt="choose avatar"></img>
    );

    const [isLoading, setIsloading] = useState(false);

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (!passwordProps) {
            navigate(`/register/${token}`);
            return;
        }

        return () => {}
    }, []);

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
        setIsloading(true);
        handleSubmitRegister();
        setIsloading(false);
    }

    const handleGoBack = () => {
        navigate(`/register/${token}/name`);
    }

    const handlePressEnter = (e) => {
        if (e.key !== 'Enter') return;

        handleSubmitFile();
    }

    return (
        <div 
        className='start-input-component'
        >
            <div className="start-space"></div>            
            <div 
                className="review-avatar"
                onKeyPress={(e) => handlePressEnter(e)}
                tabIndex='0'
                style={{outline: 'none'}}
            >
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
            <span className='text-error center'>
                {error ? iconError : ''}
                {error}
            </span>
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
                    {isLoading ? <StartLoading/> : 'Tiếp tục'}
                </button>
            </div>
            <div className="end-space"></div>
        </div>
    );
}

export default Avatar;

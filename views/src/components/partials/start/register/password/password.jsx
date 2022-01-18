import React from 'react';
import StartLogo from '../../start-logo/start-logo';

const Password = () => {
    return (
        <div className='start-input-component'>
            <div className="start-space"></div>
            <div className="start-space"></div>

            <StartLogo></StartLogo>

            <br /><br /><br /><br />

            <input
                type="password"
                name='password'
                className='input-start'
                placeholder='Nhập mật khẩu của bạn'
            />

            <span className='text-error'></span>

            <br /><br /><br />

            <div className="two-button">
                <button className='custom-btn left start-btn-white'>
                    Trở về
                </button>

                <button className='start-btn right start-btn-primary'>
                    Tiếp tục
                </button>
            </div>
            <div className="end-space"></div>
        </div>
    );
}

export default Password;

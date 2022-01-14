import React from 'react';
import StartLogo from '../../start-logo/start-logo';
import './name.scss';

const Name = () => {
    return (
        <div className='start-input-component'>
            <StartLogo></StartLogo>

            <br /><br /><br /><br />

            <div className="two-input">
                <div className="block-input">
                    <input
                        type="text"
                        name='last_name'
                        className='input-start'
                        placeholder='Nhập họ của bạn'
                    />
                    <span className='text-error'></span>
                </div>

                <div className="block-input">
                    <input
                        type="text"
                        name='first_name'
                        className='input-start'
                        placeholder='Nhập tên của bạn'
                    />
                    <span className='text-error'></span>
                </div>
            </div>

            <div className="clearfix"></div>

            <br />

            <select name='sex' className='input-start'>
                <option value='Nam' >
                    Nam
                </option>

                <option value='Nu'>
                    Nữ
                </option>
            </select>

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

            <br /><br /><br /><br />

        </div>
    );
}

export default Name;

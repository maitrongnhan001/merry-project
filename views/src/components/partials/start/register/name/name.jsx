import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StartLogo from '../../start-logo/start-logo';
import './name.scss';

const Name = (props) => {
    const { token, handleUpdateUserInfo } = props;

    const [firstName, setfirstName] = useState(null);

    const [lastName, setLastName] = useState(null);

    const [sex, setSex] = useState(null);

    const navigate = useNavigate();

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    const forcusSelect = () => {

    }

    const clickliElement = (value) => {

    }

    return (
        <div className='start-input-component'>
            <div className="start-space"></div>

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

            <div className="block-input-sex">
                <div className='input-start'></div>
                <ul name='sex' className='ul-input hide'>
                    <li
                        className='li-input'
                    >
                        Nam
                    </li>

                    <li
                        className='li-input'
                    >
                        Nữ
                    </li>
                </ul>
            </div>

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

export default Name;

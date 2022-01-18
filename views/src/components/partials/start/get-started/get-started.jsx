import React from 'react';
import { Link } from 'react-router-dom';
import StartLogo from '../start-logo/start-logo';
import './get-started.scss';

const GetStarted = () => {
    return (
        <div className='get-start-component'>
            <StartLogo></StartLogo>

            <div className='get-start-title'>

                <p>Chia sẻ</p>

                <p style={{'fontSize': '46px'}}>
                    Niềm vui,
                </p>

                <p>Gắn kết</p>

                <p style={{'fontSize': '50px'}}>
                    cuộc sống
                </p>

            </div>
            <p className='get-start-slogan'>
                Hãy để Merry kết nối chúng ta lại gần nhau hơn.
            </p>
            <input 
                type="mail" 
                name='email' 
                className='input-start' 
                placeholder='Nhập email của bạn'
            />

            <br/>

            <button className='start-btn start-btn-primary'>
                Bắt đầu
            </button>

            <br />

            <div className='center'>
                <Link 
                    className='text-primary' 
                    to="/login"
                >
                    Đăng nhập
                </Link>

            </div>
            <div className="end-space"></div>
        </div> 
    );
}

export default GetStarted;

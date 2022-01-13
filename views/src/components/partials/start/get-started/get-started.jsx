import React from 'react';
import { Link } from 'react-router-dom';
import './get-started.scss';
require('typeface-roboto');

const GetStarted = () => {
    return (
        <div className='get-start-component'>
            <img 
                src="/img/Logos/logo-merry-chat.png" 
                alt="logo-merry-chat" 
                className='logo-merry-chat' 
            />

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
                type="text" 
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
                    className='start-link-primary' 
                    to="/register"
                >
                    Đăng nhập
                </Link>

            </div>
            
            <br /><br />
        </div> 
    );
}

export default GetStarted;

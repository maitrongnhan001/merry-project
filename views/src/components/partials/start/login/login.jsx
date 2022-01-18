import React from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
    return (
        <div className='start-input-component'>
            <div className="start-space"></div>
            
            <img
                src="/img/Logos/logo-merry-chat.png"
                alt="logo-merry-chat"
                className='logo-merry-chat'
            />

            <br /><br /><br /><br />

            <input
                type="mail"
                name='email'
                className='input-start'
                placeholder='Nhập email của bạn'
            />

            <span className='text-error'></span>

            <br /><br />

            <input
                type="password"
                name='password'
                className='input-start'
                placeholder='Nhập mật khẩu của bạn'
            />

            <span className='text-error'></span>

            <br />

            <div className='text-order-feature'>
                <Link
                    className='left text-primary'
                    to="#"
                >
                    Quên mật khẩu?
                </Link>

                <Link
                    className='right text-primary'
                    to="/"
                >
                    Đăng ký
                </Link>
            </div>

            <br /><br /><br />

            <div className="two-button">
                <button className='custom-btn start-btn-white'>
                    Trở về
                </button>

                <button className='start-btn start-btn-primary'>
                    Đăng nhập
                </button>
            </div>
            <div className="end-space"></div>
        </div>
    );
}

export default Login;

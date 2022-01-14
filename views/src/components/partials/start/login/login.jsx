import React from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
    return (
        <div className='get-login-component'>
            <img
                src="/img/Logos/logo-merry-chat.png"
                alt="logo-merry-chat"
                className='logo-merry-chat'
            />

            <br /><br /><br /><br />

            <input
                type="text"
                name='email'
                className='input-start'
                placeholder='Nhập email của bạn'
            />

            <span className='text-error'></span>

            <br /><br />

            <input
                type="text"
                name='email'
                className='input-start'
                placeholder='Nhập email của bạn'
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

            <div className="text-order-feature">
                <button className='custom-btn left start-btn-white'>
                    Trở về
                </button>

                <button className='start-btn right start-btn-primary'>
                    Đăng nhập
                </button>
            </div>

            <br /><br /><br /><br />

        </div>
    );
}

export default Login;

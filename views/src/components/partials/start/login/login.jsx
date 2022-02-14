import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Sockets/home';
import { useSelector } from 'react-redux';
import './login.scss';

const Login = () => {
    const initEmail = useSelector(state => state.email);
    const [user, setUser] = useState({ email: (""), password: "" });

    const [errorEmail, setErroremail] = useState({ error: null });

    const [errorPassword, setErrorPassword] = useState({ error: null });

    const [anotherError, setAnotherError] = useState({error: null});

    const navigate = useNavigate();

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErroremail({ error: "Xin hãy nhập email" });
        } else {
            if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ) {
                setErroremail({ error: "Không đúng định dạng. Ví dụ: mttam@gmail.com" });
            } else {
                setErroremail({ error: null });
            }
        }

        setUser({ ...user, email: value });
    }

    const handleChangePassword = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErrorPassword({ error: "Xin hãy nhập mật khẩu" });
        } else {
            setErrorPassword({ error: null });
        }
        setUser({ ...user, password: value });
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        //check data
        if (!user.email || user.email.length === 0) {
            setErroremail({ error: "Xin hãy nhập email" });
        }
        if (!user.password || user.password.length === 0) {
            setErrorPassword({ error: "Xin hãy nhập mật khẩu" });
            return;
        }
        setErroremail({ error: null });
        setErrorPassword({ error: null });
        const data = await login(user);

        
        if (data.token) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('userId', data.userId);
            navigate(`/me/${data.userId}`);
        } else {
            setAnotherError({error: 'Email hoặc mật khẩu không chính xác'});
        }
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className='start-input-component'>
            <div className="start-space"></div>

            <img
                src="/img/Logos/logo-merry-chat.png"
                alt="logo-merry-chat"
                className='logo-merry-chat'
            />

            <br /><br /><br /><br />
            <form onSubmit={(e) => handleSubmitLogin(e)} method='POST'>
                <input
                    type="mail"
                    name='email'
                    className={`input-start ${errorEmail.error ? 'input-start-error' : ''}`}
                    placeholder='Nhập email của bạn'
                    onChange={(e) => handleChangeEmail(e)}
                    value={user.email}
                />

                <span className='text-error'>
                    {errorEmail.error ? iconError : ""}
                    {errorEmail.error}
                </span>

                <br />

                <input
                    type="password"
                    name='password'
                    className={`input-start ${errorPassword.error ? 'input-start-error' : ''}`}
                    placeholder='Nhập mật khẩu của bạn'
                    onChange={(e) => handleChangePassword(e)}
                />

                <span className='text-error'>
                    {errorPassword.error ? iconError : ""}
                    {errorPassword.error}</span>
                <br/>

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

                <br /><br />
                <span className='text-error center'>
                    {anotherError.error ? (iconError) : ""}
                    {anotherError.error}</span>

                <div className="two-button">
                    <button 
                        className='custom-btn start-btn-white'
                        onClick={(e) => handleGoBack(e)}
                    >
                        Trở về
                    </button>

                    <button
                        className='start-btn start-btn-primary'
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>

            <div className="end-space"></div>
        </div>
    );
}

export default Login;

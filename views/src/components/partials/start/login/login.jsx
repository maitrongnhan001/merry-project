import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Sockets/home';
import { useSelector } from 'react-redux';
import StartLoading from '../tools/start-loading/start-loading';
import './login.scss';

const Login = () => {
    const initEmail = useSelector(state => state.email);

    const [user, setUser] = useState({ email: (""), password: "" });

    const [errorEmail, setErroremail] = useState(null);

    const [errorPassword, setErrorPassword] = useState(null);

    const [anotherError, setAnotherError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    useEffect(() => {
        if (initEmail.email) setUser({...user, email: initEmail.email});

        return () => setUser({email: null, password: null});
    }, []);

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErroremail("Xin hãy nhập email");
        } else {
            if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ) {
                setErroremail("Không đúng định dạng. Ví dụ: mttam@gmail.com");
            } else {
                setErroremail(null);
            }
        }

        setUser({ ...user, email: value });
    }

    const handleChangePassword = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErrorPassword("Xin hãy nhập mật khẩu");
        } else {
            setErrorPassword(null);
        }
        setUser({ ...user, password: value });
    }

    const handleSubmitLogin = async (e = null) => {
        setIsLoading(true);
        if (e) e.preventDefault();
        //check data
        if (!user.email || user.email.length === 0) {
            setErroremail("Xin hãy nhập email");
        }
        if (!user.password || user.password.length === 0) {
            setErrorPassword("Xin hãy nhập mật khẩu");
            setIsLoading(false);
            return;
        }
        setErroremail(null);
        setErrorPassword(null);

        //api login
        const data = await login(user);

        
        if (data.token) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userAvatar', data.userAvatar);
            navigate(`/me/${data.userId}`);
        } else {
            setAnotherError('Email hoặc mật khẩu không chính xác');
        }
        setIsLoading(false);
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handlePressEnter = (e) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();
        handleSubmitLogin();
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
                    value={user.email}
                    className={`input-start ${errorEmail ? 'input-start-error' : ''}`}
                    placeholder='Nhập email của bạn'
                    onChange={(e) => handleChangeEmail(e)}
                    onKeyPress={(e) => handlePressEnter(e)}
                />

                <span className='text-error'>
                    {errorEmail ? iconError : ""}
                    {errorEmail}
                </span>

                <br />

                <input
                    type="password"
                    name='password'
                    className={`input-start ${errorPassword ? 'input-start-error' : ''}`}
                    placeholder='Nhập mật khẩu của bạn'
                    onChange={(e) => handleChangePassword(e)}
                    onKeyPress={(e) => handlePressEnter(e)}
                />

                <span className='text-error'>
                    {errorPassword ? iconError : ""}
                    {errorPassword}</span>
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
                    {anotherError ? (iconError) : ""}
                    {anotherError}</span>

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
                        {isLoading ? <StartLoading/> : 'Đăng nhập'}
                    </button>
                </div>
            </form>

            <div className="end-space"></div>
        </div>
    );
}

export default Login;

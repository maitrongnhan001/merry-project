import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Sockets/home';
import './login.scss';

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });

    const [errorEmail, setErroremail] = useState({ error: null });

    const [errorPassword, setErrorPassword] = useState({ error: null });

    const [anotherError, setAnotherError] = useState({error: null});

    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErroremail({ error: "Xin hãy nhập email" });
            return;
        }
        if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ) {
            setErroremail({ error: "Không đúng định dạng. Ví dụ: mttam@gmail.com" });
            return;
        }
        setErroremail({ error: null });
        setUser({ ...user, email: value });
    }

    const handleChangePassword = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErrorPassword({ error: "Xin hãy nhập mật khẩu" });
            return;
        }
        setErrorPassword({ error: null });
        setUser({ ...user, password: value });
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        //check data
        if (user.email.length === 0) {
            setErroremail({ error: "Xin hãy nhập email" });
        }
        if (user.password.length === 0) {
            setErrorPassword({ error: "Xin hãy nhập mật khẩu" });
            return;
        }
        setErroremail({ error: null });
        setErrorPassword({ error: null });
        const data = await login(user);
        
        if (data.token) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('userId', data.userId);
            navigate('/me');
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
                />

                <span className='text-error'>
                    {errorEmail.error ? (<svg aria-hidden="true" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>) : ""}
                    &nbsp; {errorEmail.error}
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
                    {errorPassword.error ? (<svg aria-hidden="true" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>) : ""}
                    &nbsp; {errorPassword.error}</span>
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
                    {anotherError.error ? (<svg aria-hidden="true" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>) : ""}
                    &nbsp; {anotherError.error}</span>

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

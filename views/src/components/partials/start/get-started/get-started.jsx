import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StartLogo from '../start-logo/start-logo';
import StartLoading from '../tools/start-loading/start-loading';
import { verifiEmail } from '../../../APIs/ConnectAPI';
import { useDispatch } from 'react-redux';
import { update, updateEmail } from '../../../../redux/reducers/email';
import './get-started.scss';

const GetStarted = () => {
    const localEmail = localStorage.getItem('email');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState(localEmail);

    const [anotherError, setAnotherError] = useState(null);

    const [errorEmail, setErroremail] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    const checkMail = (value) => {
        if (!value || value.length === 0) {
            setErroremail("Xin hãy nhập email");
            return false;
        } else {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
                setErroremail("Không đúng định dạng. Ví dụ: mttam@gmail.com");
                return false;
            } else {
                setErroremail(null);
                return true;
            }
        }
    }

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        checkMail(value);
        setEmail(value);
    }

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (!checkMail(email)) return;
        setIsLoading(true);

        const result = await verifiEmail(email);

        setIsLoading(false);

        if (result.message) {
            if (result.message === "Email đã được đăng ký!") {
                //luu thong tin email len reduct
                const action = updateEmail(email);
                localStorage.setItem('email', email);
                dispatch(action);
                navigate('/login');
            } else {
                //email chua duoc dang ky
                const stoteData = {
                    email: email,
                    showNotification: true
                }
                const action = update(stoteData);
                dispatch(action);
                localStorage.setItem('email', email);
            }
        } else {
            setAnotherError(result.error);
        }
    }

    return (
        <>
            <div className='get-start-component'>
                <StartLogo></StartLogo>
                <div className='get-start-title'>
                    <p>Chia sẻ</p>
                    <p style={{ 'fontSize': '46px' }}>
                        Niềm vui,
                    </p>
                    <p>Gắn kết</p>
                    <p style={{ 'fontSize': '50px' }}>
                        cuộc sống
                    </p>
                </div>
                <p className='get-start-slogan'>
                    Hãy để Merry kết nối chúng ta lại gần nhau hơn.
                </p>
                <form onSubmit={e => handleSubmitEmail(e)} method='POST'>
                    <input
                        type="mail"
                        name='email'
                        value={email ?? ''}
                        className={`input-start ${errorEmail ? 'input-start-error' : ''} ${(email) ? 'on-have-data' : ''}`}
                        placeholder='Nhập email của bạn'
                        onChange={(e) => handleChangeEmail(e)}
                    />
                    <span className='text-error'>
                        {errorEmail ? (iconError) : ""}
                        {errorEmail}
                    </span>
                    <span className='text-error center'>
                        {anotherError ? (iconError) : ""}
                        {anotherError}
                    </span>
                    <button className='start-btn start-btn-primary custom-btn-start '>
                        {isLoading ? <StartLoading /> : 'Bắt đầu'}
                    </button>
                </form>
                <br />
                <div className='center'>
                    {!isLoading ? <Link
                        className='text-primary'
                        to="/login"
                    >
                        Đăng nhập
                    </Link> : ''}
                </div>
                <div className="end-space"></div>
            </div>
        </>
    );
}

export default GetStarted;

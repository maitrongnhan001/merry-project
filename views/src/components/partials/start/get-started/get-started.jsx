import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StartLogo from '../start-logo/start-logo';
import { verifiEmail } from '../../../APIs/ConnectAPI';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../../../../redux/reducers/email';
import './get-started.scss';

const GetStarted = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [anotherError, setAnotherError] = useState({ error: null });

    const [errorEmail, setErroremail] = useState({ error: null });

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (!value || value.length === 0) {
            setErroremail({ error: "Xin hãy nhập email" });
            return;
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
            setErroremail({ error: "Không đúng định dạng. Ví dụ: mttam@gmail.com" });
            return;
        }
        setErroremail({ error: null });
        setEmail(value);
    }

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        if (email.length === 0) {
            setErroremail({ error: "Xin hãy nhập email" });
            return;
        }
        const result = await verifiEmail(email);

        if (result.message) {
            if (result.message === "Email đã được đăng ký!") {
                //luu thong tin email len reduct
                const action = updateEmail(email);
                dispatch(action);
                navigate('/login');
                return;
            }

            //email chua duoc dang ky
            alert("Hệ thống vừa gửi một email tới địa chỉ email của bạn. Vui lòng kiểm tra email để tiếp tục.");
            localStorage.setItem('email', email);
        } else {
            setAnotherError({ error: result.error });
        }
    }

    return (
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
                    className={`input-start ${errorEmail.error ? 'input-start-error' : ''}`}
                    placeholder='Nhập email của bạn'
                    onChange={(e) => handleChangeEmail(e)}
                />
                <span className='text-error'>
                    {errorEmail.error ? (<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>) : ""}
                    {errorEmail.error}
                </span>


                <span className='text-error center'>
                    {anotherError.error ? (<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>) : ""}
                    {anotherError.error}
                </span>

                <button className='start-btn start-btn-primary custom-btn-start'>
                    Bắt đầu
                </button>
            </form>

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

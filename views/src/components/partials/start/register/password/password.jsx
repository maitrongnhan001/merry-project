import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StartLogo from '../../start-logo/start-logo';

const Password = (props) => {
    const { token, handleUpdatePassword } = props;

    const [password, setPassword] = useState(null);

    const [errorPassword, setErrorPassword] = useState({ error: null });

    const [icon, setIcon] = useState(null);

    const navigate = useNavigate();

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    const iconWarning = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
        </svg>
    );

    const iconSuccess = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
    );

    const [color, setColor] = useState(null);

    const checkPassword = (value) => {
        // if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([A-Za-z0-9]{8,20})$/.test(value))
        //     return true;
        let passwordStrength = 0;

        if (!value || value.length === 0) {
            return -1;
        }

        if (value.length < 8) {
            return passwordStrength;
        }

        if (value.search(/[a-z]/) !== -1) {
            passwordStrength++;
        }

        if (value.search(/[A-Z]/) !== -1) {
            passwordStrength++;
        }

        if (value.search(/[0-9]/) !== -1) {
            passwordStrength++;
        }

        return passwordStrength;
    }

    const notification = (value) => {
        switch (value) {
            case 0: {
                setErrorPassword({ error: "Mật khẩu quá ngắn, độ dài mật khẩu tối thiểu: 8 kí tự" });
                setIcon(iconError);
                setColor('red');
                break;
            }

            case 1: {
                setErrorPassword({ error: "Mật khẩu yếu. Nên có thêm các kí tự in hoa và số" });
                setIcon(iconError);
                setColor('red');
                break;
            }

            case 2: {
                setErrorPassword({ error: "Mật khẩu trung bình. Nên có thêm các kí tự số" });
                setIcon(iconWarning);
                setColor('orange');
                break;
            }

            case 3: {
                setErrorPassword({ error: "Mật khẩu mạnh" });
                setIcon(iconSuccess);
                setColor('green');
                break;
            }

            default: {
                setErrorPassword({ error: "Xin hãy nhập mật khẩu" });
                setIcon(iconError);
                setColor('red');
            }
        }
    }

    const handleChangePassword = (e) => {
        const passwordValue = e.target.value;

        if (!passwordValue && passwordValue.length === 0) {
            setErrorPassword({ error: "Xin hãy nhập mật khẩu" });
            setIcon(iconError);
            return;
        }

        const resultCheckPassword = checkPassword(passwordValue);

        notification(resultCheckPassword);

        setPassword(passwordValue);
    }

    const handleStorePassword = () => {
        const resultCheckPassword = checkPassword(password);
        notification(resultCheckPassword)
        
        if (resultCheckPassword < 2 ) return;

        handleUpdatePassword(password);
        navigate(`/register/${token}/name`)
    }

    const handleGoBack = () => {
        navigate(`/`);
    }

    return (
        <div className='start-input-component'>
            <div className="start-space"></div>
            <div className="start-space"></div>

            <StartLogo></StartLogo>

            <br /><br /><br /><br />

            <input
                type="password"
                name='password'
                className={`input-start ${errorPassword.error ? 'input-start-error' : ''}`}
                style={{ borderColor: `${color}` }}
                placeholder='Nhập mật khẩu của bạn'
                onChange={(e) => handleChangePassword(e)}
            />

            <span className='text-error' style={{ color: color }}>
                {icon}
                {errorPassword.error}
            </span>

            <br /><br /><br />

            <div className="two-button">
                <button 
                    className='custom-btn left start-btn-white'
                    onClick={() => handleGoBack()}
                >
                    Trở về
                </button>

                <button 
                    className='start-btn right start-btn-primary'
                    onClick={() => handleStorePassword()}
                >
                    Tiếp tục
                </button>
            </div>
            <div className="end-space"></div>
        </div>
    );
}

export default Password;

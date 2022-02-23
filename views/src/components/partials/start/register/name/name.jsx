import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StartLogo from '../../start-logo/start-logo';
import './name.scss';

const Name = (props) => {
    const { token, handleUpdateUserInfo, passwordProps } = props;

    const [firstName, setFirstName] = useState(null);

    const [lastName, setLastName] = useState(null);

    const [errorFName, setErrorFName] = useState(null);

    const [errorLName, setErrorLName] = useState(null);

    const [errorSex, setErrorSex] = useState(null);

    const [sex, setSex] = useState(null);

    const [isShowList, setIsShowList] = useState('hide');

    const [forcus, setForcus] = useState(null);

    const navigate = useNavigate();

    const iconError = (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    );

    useEffect(() => {
        if (!passwordProps) {
            navigate(`/register/${token}`);
            return;
        }
    }, []);

    const forcusSelect = () => {
        if (isShowList === 'hide') {
            setIsShowList('show');
            setForcus('on-forcus');
        }
        else {
            setIsShowList('hide');
            setForcus(null);
        }
    }

    const hideSelect = () => {
        setIsShowList('hide');
            setForcus(null);
    }

    const clickLiElement = (value) => {
        if (!value) return;

        setSex(value);
        setErrorSex(null); 

        setIsShowList('hide');
        setForcus(null);
    }

    const checkName = (value) => {
        if (!value || value.length == 0) return false;
        return true;
    }

    const handleChangFirstName = (e) => {
        const value = e.target.value;

        if (!checkName(value))
            setErrorFName('Xin hãy nhập tên của bạn');
        else
            setErrorFName(null);

        setFirstName(value);
    }

    const handleChangLastName = (e) => {
        const value = e.target.value;

        if (!checkName(value))
            setErrorLName('Xin hãy nhập họ của bạn');
        else
            setErrorLName(null);

        setLastName(value);
    }

    const handleSubmitData = (e) => {
        if (e) e.preventDefault();

        const isErrorFName = !checkName(firstName);
        const isErrorLName = !checkName(lastName);
        const isErrorSex = !checkName(sex);

        if (isErrorFName) {
            setErrorFName('Xin hãy nhập tên của bạn');
        }

        if (isErrorLName) {
            setErrorLName('Xin hãy nhập họ của bạn');
        }

        if (isErrorSex) {
            setErrorSex('Xin hãy chọn giới tính của bạn');
        }

        if (isErrorFName || isErrorLName || isErrorSex) return;

        setErrorFName(null);
        setErrorLName(null);
        setErrorSex(null);
        handleUpdateUserInfo(firstName, lastName, sex);

        navigate(`/register/${token}/avatar`);
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(`/register/${token}/`);
    }

    const handlePressEnter = (e) => {
        if( e.key !== 'Enter' ) return;

        e.preventDefault();
        handleSubmitData();
    }

    return (
        <div className='start-input-component'>
            <div className="start-space"></div>

            <StartLogo></StartLogo>

            <br /><br /><br /><br />

            <form method='POST' onSubmit={(e) => handleSubmitData(e)}>
                <div className="two-input">
                    <div className="block-input">
                        <input
                            type="text"
                            name='last_name'
                            value={lastName ? lastName : ''}
                            className={`input-start ${(errorLName) ? 'input-start-error' : ''} ${(lastName) ? 'on-have-data' : ''}`}
                            placeholder='Nhập họ của bạn'
                            onChange={(e) => handleChangLastName(e)}
                            onKeyPress={(e) => handlePressEnter(e)}
                            onClick={() => hideSelect()}
                        />
                        <span className='text-error'>
                            {(errorLName) ? iconError : ''}
                            {errorLName}
                        </span>
                    </div>

                    <div className="block-input">
                        <input
                            type="text"
                            name='first_name'
                            value={firstName ? firstName : ''}
                            className={`input-start ${(errorFName) ? 'input-start-error' : ''} ${(firstName) ? 'on-have-data' : ''}`}
                            placeholder='Nhập tên của bạn'
                            onChange={(e) => handleChangFirstName(e)}
                            onKeyPress={(e) => handlePressEnter(e)}
                            onClick={() => hideSelect()}
                        />
                        <span className='text-error'>
                            {(errorFName) ? iconError : ''}
                            {errorFName}
                        </span>
                    </div>
                </div>

                <div className="clearfix"></div>

                <br />

                <div 
                    className="block-input-sex" 
                    onKeyPress={(e) => handlePressEnter(e)}
                    tabIndex="0"
                    style={{outline: 'none'}}
                    >
                    <div
                        className={`input-start div-input-start ${forcus} ${(errorSex) ? 'input-start-error' : ''} ${(sex) ? 'on-have-data' : ''}`}
                        onClick={() => forcusSelect()}
                    >{sex}</div>
                    <ul name='sex' className={`ul-input ${isShowList}`}>
                        <li
                            className={`li-input ${(errorSex) ? 'li-error' : ''}`}
                            onClick={() => clickLiElement('Nam')}
                        >
                            Nam
                        </li>

                        <li
                            className={`li-input ${(errorSex) ? 'li-error' : ''}`}
                            onClick={() => clickLiElement('Nữ')}
                        >
                            Nữ
                        </li>
                    </ul>
                </div>

                <span className='text-error'>
                    {(errorSex) ? iconError : ""}
                    {errorSex}
                </span>

                <br /><br />

                <div className="two-button">
                    <button 
                        className='custom-btn left start-btn-white'
                        onClick={(e) => handleGoBack(e)}    
                    >
                        Trở về
                    </button>

                    <button className='start-btn right start-btn-primary'>
                        Tiếp tục
                    </button>
                </div>
                <div className="end-space"></div>
            </form>
        </div>
    );
}

export default Name;

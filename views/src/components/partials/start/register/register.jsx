import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import FormData from 'form-data';
import Password from './password/password';
import Name from './name/name';
import Avatar from './avatar/avatar';
import './register.scss';
import { checkToken, register } from '../../../APIs/ConnectAPI';

const Register = () => {
    const params = useParams();
    const email = localStorage.getItem('email');

    const [token] = useState(params.token);

    const [password, setPassword] = useState(null);

    const [UserInfo, setUserInfo] = useState({
        firstName: null,
        lastName: null,
        sex: null
    });

    const [avatar, setAvatar] = useState({
        nameImg: null,
        file: null
    });

    const [errorAvatar, setErrorAvatar] = useState(null);

    const navigate = useNavigate();

    const handleUpdatePassword = (password) => {
        if (!password) return;

        setPassword(password);
    }

    const handleUpdateUserInfo = (firstName, lastName, sex) => {
        if (firstName && lastName && sex) {
            sex = (sex === 'Nam') ? 0 : 1;
            setUserInfo({
                firstName: firstName,
                lastName: lastName,
                sex: sex
            });
        }
    }

    const handleUpdateAvatar = (imageName, fileImage) => {
        if (!imageName && !fileImage) return;

        if (avatar.file.size >= 1024000) {
            setErrorAvatar('Vui lòng chon hình ảnh có kích thước nhỏ hơn 1MB');
        };

        setAvatar({ ...avatar, nameImg: imageName, file: fileImage });
    }

    const cleanData = () => {
        setPassword(null);
        setUserInfo({
            firstName: null,
            lastName: null,
            sex: null
        });
        setAvatar({
            nameImg: null,
            file: null
        });
        setErrorAvatar(null);
    }

    const handleSubmitRegister = async () => {
        if (avatar.file.size >= 1024000) {
            setErrorAvatar('Vui lòng chon hình ảnh có kích thước nhỏ hơn 1MB');
            return;
        };

        const formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)
        formData.append('lastName', UserInfo.lastName)
        formData.append('firstName', UserInfo.firstName)
        formData.append('sex', UserInfo.sex)
        formData.append('file', avatar.file)

        //get token
        const result = await register(formData, token);

        if (!result.error) {
            localStorage.setItem('accessToken', result.token);
            localStorage.setItem('userId', result.data.id);

            cleanData();
            navigate('/me');
        } else {
            const stringError = result.error;
            setErrorAvatar(stringError);
        }
    }

    useEffect(async () => {
        const resultCheckToken = await checkToken(token);
        if (resultCheckToken.status !== 200) {
            return navigate('/');
        }
    }, [token])

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Password
                        token={token}
                        passwordProps={password}
                        handleUpdatePassword={handleUpdatePassword}
                    />
                }
            ></Route>

            <Route
                path='/name/'
                element={
                    <Name
                        passwordProps={password}
                        token={token}
                        handleUpdateUserInfo={handleUpdateUserInfo}
                    />
                }
            ></Route>

            <Route
                path='/avatar/'
                element={
                    <Avatar
                        error={errorAvatar}
                        token={token}
                        passwordProps={password}
                        handleUpdateAvatar={handleUpdateAvatar}
                        handleSubmitRegister={handleSubmitRegister}
                    />
                }
            ></Route>
        </Routes>
    );
}

export default Register;

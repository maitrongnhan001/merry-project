import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import FormData from 'form-data';
import Password from './password/password';
import Name from './name/name';
import Avatar from './avatar/avatar';
import './register.scss';
import { register } from '../../../APIs/ConnectAPI';

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

    const handleUdpatePassword = (password) => {
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

        setAvatar({ ...avatar, nameImg: imageName, file: fileImage });
    }

    const handleSubmitRegister = async () => {
        const formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)
        formData.append('lastName', UserInfo.lastName)
        formData.append('firstName', UserInfo.firstName)
        formData.append('sex', UserInfo.sex)
        formData.append('file', avatar.file)

        // console.log(formData);

        console.log(await register(formData));

    }

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Password
                        token={token}
                        handleUpdatePassword={handleUdpatePassword}
                    />
                }
            ></Route>

            <Route
                path='/name/'
                element={
                    <Name
                        token={token}
                        handleUpdateUserInfo={handleUpdateUserInfo}
                    />
                }
            ></Route>

            <Route
                path='/avatar/'
                element={
                    <Avatar
                        token={token}
                        handleUpdateAvatar={handleUpdateAvatar}
                        handleSubmitRegister={handleSubmitRegister}
                    />
                }
            ></Route>
        </Routes>
    );
}

export default Register;

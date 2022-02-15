import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams, useNavigate, useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Password from './password/password';
import Name from './name/name';
import Avatar from './avatar/avatar';
import './register.scss';

const Register = () => {
    const params = useParams();
    const email = useSelector(state => state.email.email);

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

    const handleUpdateUserInfo = (firstName = null, lastName = null, sex = null) => {
        if (firstName) 
            setUserInfo({...UserInfo, firstName: firstName});
            
        if (lastName) 
            setUserInfo({...UserInfo, lastName: lastName});

        if (sex) 
            setUserInfo({...UserInfo, sex: sex});
    }

    const handleUpdateAvatar = (imageName, fileImage) => {
        if (!imageName && !fileImage) return;

        setAvatar({...avatar, nameImg: imageName, file: fileImage});
    }

    const handleSubmitRegister = async () => {
        const data = {
            password: password,
            lastName: UserInfo.lastName,
            firstName: UserInfo.firstName,
            sex: UserInfo.sex,
            imageName: avatar.nameImg,
            imageFile: avatar.file
        }

        console.log(data);
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
                element={<Avatar />}
            ></Route>
        </Routes>
    );
}

export default Register;

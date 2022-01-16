import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Password from './password/password';
import Name from './name/name';
import Avatar from './avatar/avatar';
import './register.scss';

const Register = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<Password />}
            >
            </Route>

            <Route
                path='/name'
                element={<Name />}
            ></Route>

            <Route
                path='/avatar'
                element={<Avatar />}
            ></Route>
        </Routes>
    );
}

export default Register;

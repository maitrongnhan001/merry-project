import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetStarted from '../partials/start/get-started/get-started';
import Register from '../partials/start/register/register';
import Login from '../partials/start/login/login';
import StartPicture from '../partials/start/start-picture/start-picture';
import './start.scss';

const Start = () => {
    return (
        <div className='start-component'>
            <div className='col-start-input'>
                <Routes>
                    <Route path='/' element={<GetStarted />} ></Route>
                    <Route path='/register' element={<Register />} ></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
            </div>
            <div className='col-start-picture'>
                <StartPicture />
            </div>
        </div>
    );
}

export default Start;

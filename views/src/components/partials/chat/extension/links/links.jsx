import React, { useState } from 'react';
import Member from '../member-group-extension/member/member';
import './links.scss';
import { useSelector } from 'react-redux';
import $ from 'jquery';

const Links = () => {

    const [is_active, setIsActive] = useState(false);

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
    }

    return (
        <div className='member-group-extension'>
            <div
                className="show-feature-extension-button"
                onClick={onActive}>
                <p>Thành viên nhóm</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    fill="currentColor"
                    className={is_active ? 'active' : ''}
                    viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
        </div>
    );
}

export default Links;

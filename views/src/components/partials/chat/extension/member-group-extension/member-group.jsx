import React, { useState } from 'react';
import Member from './member/member';
import './member-group.scss';
import { useSelector } from 'react-redux';
import $ from 'jquery';

const MemberGroup = () => {
    const [is_active, setIsActive] = useState(false);

    //get temp data
    const chatsList = useSelector(state => state.friends.chatsList);

    const list_member_group = chatsList.map((Element, index) => {
        return (
            <Member key={index}
                image={Element.image}
                first_name={Element.firstName}
                last_name={Element.lastName} ></Member>
        );
    })

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-member-group').animate({
            height: 'toggle'
        })
    }

    return (
        <div className='member-group-extension'>
            <div
                className="show-feature-extension-button"
                id='show-member-group'
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

            <div className={`list-member-group ${is_active ? 'show' : 'hide'}`}>
                {list_member_group}
            </div>
        </div>
    );
}

export default MemberGroup;

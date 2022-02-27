import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLinks } from '../../../../APIs/ConnectAPI';
import './links.scss';
import LinkItem from './link-item/link-item';
import $ from 'jquery';

const Links = () => {

    const [receiverId, setReceiverId] = useState(useSelector(state => state.extension).idHeader);
    const [is_active, setIsActive] = useState(false);

    //get list link
    useEffect(async () => {

    }, []);

    const list_links = [
        'https://www.facebook.com',
        'https://wwww.google.com',
        'https://merry-chat.com',
        'https://abc-xyz-edf-mnd.com',
        'https://hackerrank.com',
        'https://123456789.com',
        'https://www.facebook.com',
        'https://wwww.google.com',
        'https://merry-chat.com',
        'https://abc-xyz-edf-mnd.com',
        'https://hackerrank.com',
        'https://123456789.com',
        'https://www.facebook.com',
        'https://wwww.google.com',
        'https://merry-chat.com',
        'https://abc-xyz-edf-mnd.com',
        'https://hackerrank.com',
        'https://123456789.com',
    ]

    const list_links_tag = list_links.map((element, index) => {
        return (
            <LinkItem link={element} key={index} ></LinkItem>
        );
    });

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-links').animate({
            height: 'toggle'
        });
    }

    return (
        <div className='element-extension'>
            <div
                className="show-feature-extension-button"
                onClick={onActive}>
                <p>Các liên kết</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    fill="currentColor"
                    className={is_active ? 'active' : ''}
                    viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>

            <div className={`list-links ${is_active ? 'show' : 'hide'}`}>
                {list_links_tag}
            </div>
        </div>
    );
}

export default Links;

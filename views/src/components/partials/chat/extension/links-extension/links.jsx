import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLinks } from '../../../../APIs/ConnectAPI';
import DataLoader from '../../tools/data-loader/data-loader'
import './links.scss';
import LinkItem from './link-item/link-item';
import $ from 'jquery';

const Links = () => {
    //--------------------redux-----------------------//
    const receiverId = useSelector(state => state.message.currentChat.receiverId);

    //-----------------------state--------------------------//
    const [is_active, setIsActive] = useState(false);
    const [links, setLinks] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [listLinksTag, setListLinksTag] = useState(() => {
        const listElements = links.map((Element, Key) => {
            return <LinkItem link={Element} key={Key} />;
        });
        return listElements;
    });

    //----------------------handle-------------------------//
    const getListAndSetState = async (receiverId, limit, position, caseLoad) => {
        if (!receiverId) return;
        setIsLoading(true);
        const endLimit = limit || 10000;
        const endPosition = (position !== null) ? position : 0;
        const result = await getLinks(receiverId, endLimit, endPosition);

        switch (result.status) {
            case 200: {
                const listResponeLink = result.data.data;
                let list_links = caseLoad ? links : [];
                for (let index of listResponeLink) {
                    list_links.push(index.link);
                }
                setLinks(list_links);
                setOffset(list_links.length);
                const listElements = list_links.map((Element, Key) => {
                    return <LinkItem link={Element} key={Key} />
                });
                setListLinksTag(listElements);
                break;
            }

            case 404: {
                if (links.length === 0) {
                    setNotification("Không có tin nhắn liên kết nào");
                }
                break;
            }

            case 500: {
                setError("Có lỗi xảy ra, xin vui lòng thử lại");
                break;
            }
        }

        setIsLoading(false);
    }

    const handleScroll = async () => {
        const scroolTop = $('#list_link_elements').scrollTop();
        const heightParent = $('#list_link_elements').height();
        const fullHeight = $('#list-link-full-size').height();
        if (scroolTop + heightParent - fullHeight >= -10 && scroolTop + heightParent - fullHeight <= -5) {
            await getListAndSetState(receiverId, 10, offset, true);
        }
    }

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-links').animate({
            height: 'toggle'
        });
    }

    //------------------life cycle-----------------------//
    //get list link
    useEffect(async () => {
        setOffset(0);
        setLinks([]);
        setIsLoading(false);
        setError(null);
        setNotification(null);
        setListLinksTag(null);

        await getListAndSetState(receiverId, 10, 0);

        return () => {
            setOffset(0);
            setLinks([]);
            setIsLoading(false);
            setError(null);
            setNotification(null);
            setListLinksTag(null);
        }
    }, [receiverId]);

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

            <div
                className={`list-links ${is_active ? 'show' : 'hide'}`}
                id='list_link_elements'
                onScroll={handleScroll}
            >
                <div id='list-link-full-size'>
                    {listLinksTag}
                    <div className="text-notification center">{notification}</div>
                    <div className="text-error center">{error}</div>
                    {isLoading ? <DataLoader /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Links;

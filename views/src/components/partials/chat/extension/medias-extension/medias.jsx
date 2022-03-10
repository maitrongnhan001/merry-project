import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MeidaItem from './media-item/media-item';
import { getMedias } from '../../../../APIs/ConnectAPI';
import DataLoader from '../../tools/data-loader/data-loader';
import './medias.scss';
import $ from 'jquery';

const Medias = () => {
    const receiverId = useSelector(state => state.message.currentChat.receiverId);

    const [is_active, setIsActive] = useState(false);
    const [medias, setMedia] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [listMediasTag, setListMediasTag] = useState(() => {
        const listElements = medias.map((Element, Key) => {
            return <MeidaItem link_media={Element} key={Key} />;
        });
        return listElements;
    });

    const getListAndSetState = async (receiverId, limit, position, caseLoad) => {
        if (!receiverId) return;
        setIsLoading(true);
        const endLimit = limit || 10000;
        const endPosition = (position !== null) ? position : 0;
        const result = await getMedias(receiverId, endLimit, endPosition);

        switch (result.status) {
            case 200: {
                const listResponeMedias = result.data.data;
                let list_Medias = caseLoad ? medias : [];
                for (let index of listResponeMedias) {
                    list_Medias.push(`http://localhost:8080/Medias/${index.fileName}`);
                }
                setMedia(list_Medias);
                setOffset(list_Medias.length);
                const listElements = list_Medias.map((Element, Key) => {
                    return <MeidaItem link_media={Element} key={Key} />
                });
                setListMediasTag(listElements);
                break;
            }

            case 404: {
                setNotification('Không có hình ảnh nào được gửi');
                break;
            }

            case 500: {
                setError("Có lỗi xảy ra, xin vui lòng thử lại");
                break;
            }
        }

        setIsLoading(false);
    }

    useEffect(async () => {
        setOffset(0);
        setMedia([]);
        setIsLoading(false);
        setError(null);
        setNotification(null);
        setListMediasTag(null);

        await getListAndSetState(receiverId, 10, 0);

        return () => {
            setOffset(0);
            setMedia([]);
            setIsLoading(false);
            setError(null);
            setNotification(null);
            setListMediasTag(null);
        }
    }, [receiverId]);

    const handleScroll = async () => {
        if ($('#list_media_elements').scrollTop() + $('#list_media_elements').height() == $('#list-media-full-size').height()) {
            await getListAndSetState(receiverId, 10, offset, true);
        }
    }

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-medias').animate({
            height: 'toggle'
        });
    }

    return (
        <div className='element-extension'>
            <div
                className="show-feature-extension-button"
                onClick={onActive}>
                <p>Đa phương tiện</p>

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
                id='list_media_elements'
                className={`list-medias ${is_active ? 'show' : 'hide'}`}
                onScroll={handleScroll}
            >
                <div id='list-media-full-size'>
                    {listMediasTag}
                    <div className="text-notification center">{notification}</div>
                    <div className="text-error center">{error}</div>
                    {isLoading ? <DataLoader /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Medias;

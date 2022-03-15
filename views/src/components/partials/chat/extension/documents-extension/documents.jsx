import React, { useState, useEffect } from 'react';
import DocumentItem from './documents-item/document-item';
import { useSelector } from 'react-redux';
import { getDocuments } from '../../../../APIs/ConnectAPI';
import DataLoader from '../../tools/data-loader/data-loader'
import './documents.scss';
import $ from 'jquery';

const Documents = () => {
    //--------------------redux-----------------------//
    const receiverId = useSelector(state => state.message.currentChat.receiverId);

    //-----------------------state--------------------------//
    const [is_active, setIsActive] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

    const [listDocumentsTag, setListDocumentsTag] = useState(() => {
        const listElements = documents.map((Element, Key) => {
            return <DocumentItem link_document={Element} key={Key} />;
        });
        return listElements;
    });

    //----------------------handle-------------------------//
    const getListAndSetState = async (receiverId, limit, position, caseLoad) => {
        if (!receiverId) return;
        setIsLoading(true);
        const endLimit = limit || 10000;
        const endPosition = (position !== null) ? position : 0;
        const result = await getDocuments(receiverId, endLimit, endPosition);

        switch (result.status) {
            case 200: {
                const listResponeDocuments = result.data.data;
                let list_Documents = caseLoad ? documents : [];
                for (let index of listResponeDocuments) {
                    list_Documents.push(index.fileName);
                }
                setListDocumentsTag(list_Documents);
                setOffset(list_Documents.length);
                const listElements = list_Documents.map((Element, Key) => {
                    return <DocumentItem link_document={Element} key={Key} />
                });
                setListDocumentsTag(listElements);
                break;
            }

            case 404: {
                if (documents.length === 0) {
                    setNotification("Không có tài liệu nào được gửi");
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
        const scroolTop = $('#list_document_elements').scrollTop();
        const heightParent = $('#list_document_elements').height();
        const fullHeight = $('#list-link-full-size').height();
        if (scroolTop + heightParent - fullHeight >= -10 && scroolTop + heightParent - fullHeight <= -5) {
            await getListAndSetState(receiverId, 10, offset, true);
        }
    }

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-documents').animate({
            height: 'toggle'
        });
    }

    //------------------life cycle-----------------------//
    useEffect(async () => {
        setOffset(0);
        setDocuments([]);
        setIsLoading(false);
        setError(null);
        setNotification(null);
        setListDocumentsTag(null);

        await getListAndSetState(receiverId, 10, 0);

        return () => {
            setOffset(0);
            setDocuments([]);
            setIsLoading(false);
            setError(null);
            setNotification(null);
            setListDocumentsTag(null);
        }
    }, [receiverId]);

    return (
        <div className='element-extension'>
            <div
                className="show-feature-extension-button"
                onClick={onActive}>
                <p>Tài liệu</p>

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
                className={`list-documents ${is_active ? 'show' : 'hide'}`}
                id='list_document_elements'
                onScroll={handleScroll}
            >
                <div id='list-link-full-size'>
                    {listDocumentsTag}
                    <div className="text-notification center">{notification}</div>
                    <div className="text-error center">{error}</div>
                    {isLoading ? <DataLoader /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Documents;

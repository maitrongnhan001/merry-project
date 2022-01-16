import React, { useState } from 'react';
import DocumentItem from './documents-item/document-item';
import './documents.scss';
import $ from 'jquery';

const Documents = () => {

    const [is_active, setIsActive] = useState(false);

    const link_documents = [
        '/img/sample-doc/bao-cao-nien-luan-nganh.doc',
        '/img/sample-doc/bao-cao-luan-van.pdf',
        '/img/sample-doc/dac-ta-yeu-cau-nien-luan-nganh.xlsx',
        '/img/sample-doc/bao-cao-nien-luan-nganh.doc',
        '/img/sample-doc/bao-cao-luan-van.pdf',
        '/img/sample-doc/dac-ta-yeu-cau-nien-luan-nganh.xlsx',
        '/img/sample-doc/bao-cao-nien-luan-nganh.doc',
        '/img/sample-doc/bao-cao-luan-van.pdf',
        '/img/sample-doc/dac-ta-yeu-cau-nien-luan-nganh.xlsx',
        '/img/sample-doc/bao-cao-nien-luan-nganh.doc',
        '/img/sample-doc/bao-cao-luan-van.pdf',
        '/img/sample-doc/dac-ta-yeu-cau-nien-luan-nganh.xlsx',
    ];

    const list_document_tags = link_documents.map((element, index) => {
        return (
            <DocumentItem link_document={element} key={index} ></DocumentItem>
        );
    });

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-documents').animate({
            height: 'toggle'
        });
    }

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

            <div className={`list-documents ${is_active ? 'show' : 'hide'}`}>
                {list_document_tags}
            </div>
        </div>
    );
}

export default Documents;

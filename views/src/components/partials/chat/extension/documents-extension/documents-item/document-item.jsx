import React from 'react';
import './document-item.scss';

const DocumentItem = (props) => {

    const { link_document } = props;
    const link_arr = link_document.split('/');
    const name_document = link_arr[link_arr.length-1];


    return (
        <div className='document-item'>
            <a href={`${link_document}`}>{name_document}</a>
        </div>
    );
}

export default DocumentItem;

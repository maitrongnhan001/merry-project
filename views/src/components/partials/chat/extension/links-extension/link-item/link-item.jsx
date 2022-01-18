import React from 'react';
import './link-item.scss';

const LinkItem = (props) => {

    const { link } = props

    return (
        <div className='link-item'>
            <a href={`${link}`} target='_blank'>{link}</a>
        </div>
    );
}

export default LinkItem;

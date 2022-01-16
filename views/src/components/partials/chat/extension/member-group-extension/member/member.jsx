import React from 'react';
import Image from '../../../avatar/avatar';
import './member.scss';

const Member = (props) => {
    const full_name = `${props.last_name} ${props.first_name}`;
    const { image } = props;


    return (
        <div className='member-group'>
            <div className="member-image">
                <Image image={image}></Image>
            </div>
            <p className='member-fullname'>{full_name}</p>

            <button className='other-feature'>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    fill="currentColor" 
                    viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </button>
        </div>
    );
}

export default Member;

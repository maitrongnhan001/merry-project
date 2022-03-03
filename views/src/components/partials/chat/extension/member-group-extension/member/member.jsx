import React from 'react';
import Image from '../../../avatar/avatar';
import Feature from './feature/feature';
import './member.scss';

const Member = (props) => {
    const { name } = props;
    const image = {
        image1: props.image,
        image2: null
    }

    return (
        <div className='member-group'>
            <div className="member-image">
                <Image image={image}></Image>
            </div>
            <p className='member-fullname'>{name}</p>

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

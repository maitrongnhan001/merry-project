import React from 'react'
import Image from '../../avatar/avatar'
import './item.scss'

function Item({id, name, image}) {
    return (
        <div className="friend-group-item" data-id={id}>
            <div className="friend-group-avatar">
                <Image image={image ? image : undefined}></Image>
            </div>
            <div className="friend-group-info">
                <p className="friend-group-name">{name}</p>
            </div>
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
    )
}

export default Item
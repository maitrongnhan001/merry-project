import React, { useState } from 'react'
import Image from '../../avatar/avatar'
import './item.scss'
import $ from 'jquery'

function Item({id, name, image, addFriend, createGroup}) {
    //states

    const [checked, setChecked] = useState(false)

    //handles 
    const handleClickToCheckFriend = (e) => { 
        $(e.currentTarget).find('.friend-add-friend-checkbox').attr('checked', checked ? false : true)
        setChecked(checked ? false : true)
    }

    const handleChangeChecked = (e)=>{
        setChecked(e.target.checked)
    }

    return (
        <div className="friend-group-item" data-id={id} onClick={handleClickToCheckFriend}>
            <div className="friend-group-avatar">
                <Image image={image ? image : undefined}></Image>
            </div>
            <div className="friend-group-info">
                <p className="friend-group-name">{name}</p>
            </div>
            {
            addFriend ?  
            <button className="friend-add-friend-btn">Kết bạn</button> : 
            createGroup ?
            <input type="checkbox"  className="friend-add-friend-checkbox" checked={checked} onChange={handleChangeChecked}/> :
            <div className='other-feature' style={{visibility: addFriend ? 'visible': ''}}>
                {
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="currentColor" 
                        viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                }
            </div>
            }   
        </div>
    )
}

export default Item
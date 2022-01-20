import React from 'react'
import Item from '../friend-group-items/item'
import './friend.scss'
import  {useSelector} from 'react-redux'

function Friends(props) {
    //redux

    const friendsList = useSelector(state => state.friends.friendsList)
    

    const items = friendsList.map((value, idx)=>{
        const name = `${value.firstName} ${value.lastName}`
        return (
             <Item key={idx} id={value.id} image={value.image} name={name}></Item>
        )
    })

    return (
        <div className='tab-friend'>
            <div className="tab-friend-request">
                <div className="col col-left">
                    <p className="friend-request-title"> <i class="fas fa-user-check"></i> Lời mời kết bạn</p>
                    <p className="friend-request-quantity">(10)</p>
                </div>
                <div className="col col-right">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            {
                items    
            }
        </div>
    );
}

export default Friends
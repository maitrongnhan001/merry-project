import React from 'react'
import Item from '../friend-group-items/item'
import './friend.scss'
import $ from 'jquery'
import  {useDispatch, useSelector} from 'react-redux'
import { showCenter } from '../../../../../redux/actions/taskbar'

function Friends(props) {
    //redux

    const friendsList = useSelector(state => state.friends.friendsList)
    const dispatch = useDispatch()

    const items = friendsList.map((value, idx)=>{
        const name = `${value.firstName} ${value.lastName}`
        return (
             <Item key={idx} id={value.id} image={value.image} name={name}></Item>
        )
    })

    //handles 
    const handleClickToShowFriendRequest = ()=> {
        const display = showCenter(3)
        dispatch(display)
    }

    return (
        <div className='tab-friend'>
            <div className="tab-friend-request" onClick={handleClickToShowFriendRequest}>
                <div className="col col-left">
                    <p className="friend-request-title"> <i className="fas fa-user-check"></i> Lời mời kết bạn</p>
                    <p className="friend-request-quantity">(10)</p>
                </div>
                <div className="col col-right">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            {
                items    
            }
        </div>
    );
}

export default Friends
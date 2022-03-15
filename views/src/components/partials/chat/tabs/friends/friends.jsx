import React from 'react'
import Item from '../friend-group-items/item'
import './friends.scss'
import $ from 'jquery'
import  {useDispatch, useSelector} from 'react-redux'
import { showCenter } from '../../../../../redux/actions/taskbar'

function Friends() {

    /*----redux----*/
    //lay du lieu tu redux
    const friendsList = useSelector(state => state.friends.friendsList)
    const friendRequest = useSelector(state => state.friends.friendRequest)
    
    // ket noi voi redux
    const dispatch = useDispatch()
    /*----data----*/
    const items = friendsList.map((value, idx)=>{
        console.log(value.members)
        return (
              <Item key={idx} userId={value.id} members={[value.id]} id={value.groupId} image={value.image} name={value.name}></Item>
        )
    })

    /*----handles----*/
    //xu ly hien thi danh sach yeu cau ket ban
    const handleClickToShowFriendRequest = ()=> {
        $('#tab-wrapper').toggleClass('hide-tab-in-phones-screen')
        $('.main-chat-center').toggleClass('show-main-chat-phone-screen')
        $('.friend-group-item').removeClass('active-friend-group-item')
        const display = showCenter(3)
        dispatch(display)
    }

    return (
        <div className='tab-friend'>
            <div className="tab-friend-request" onClick={handleClickToShowFriendRequest}>
                <div className="col col-left">
                    <p className="friend-request-title"> <i className="fas fa-user-check"></i> Lời mời kết bạn</p>
                    <p className="friend-request-quantity">{friendRequest.length > 0 ? `(${friendRequest.length})` : ''}</p>
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
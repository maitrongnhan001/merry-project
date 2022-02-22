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
    
    // ket noi voi redux
    const dispatch = useDispatch()

    /*----data----*/
    const items = friendsList.map((value, idx)=>{
        const name = `${value.firstName} ${value.lastName}`
        return (
              <Item key={idx} id={value.id} image={value.image} name={name}></Item>
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
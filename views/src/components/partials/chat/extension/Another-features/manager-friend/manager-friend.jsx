import React, { useState, useEffect } from 'react';
import './manager-friend.scss';
import { useSelector, useDispatch } from 'react-redux';
import { checkFriend, getAnotherUserByGroupId } from '../../../../../APIs/ConnectAPI';
import { updateNotification } from '../../../../../../redux/actions/notification';
import { sendAddFriend, sendAcceptFriend, sendDismissFriend, sendDeleteFriend} from '../../../../../Sockets/socket-friend';


const ManagerFriend = () => {

    //-----------connect to redux------------//
    const dispatch = useDispatch();

    //---------get data form redux-----------//
    const idChat = useSelector(state => state.message.currentChat.receiverId);
    const updateManagerFriend = useSelector(state => state.extension.updateManagerFriend);

    //---------------localstorage------------//
    const userId = parseInt(localStorage.getItem('userId'));

    //---------------state------------------//
    const [status, setStatus] = useState(0);
    const [anotherUser, setAnotherUser] = useState(null);

    //-------------handle-------------------//
    const handleClickCancelFriend = async (e) => {
        e.stopPropagation();

        if (!anotherUser || !userId) return

        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendDismissFriend(data);

        const showNotification = updateNotification('Từ chối yêu cầu kết bạn thành công');
        dispatch(showNotification)
    }

    const handleClickAddFriend = async (e) => {
        e.stopPropagation();

        if (!anotherUser || !userId) return

        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendAddFriend(data);

        const showNotification = updateNotification('Gửi yêu cầu kết bạn thành công');
        dispatch(showNotification)
    }

    const handleClickDeleteFriend = async (e) => {
        e.stopPropagation();

        if (!anotherUser || !userId) return

        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendDeleteFriend(data);

        const showNotification = updateNotification('Huỷ kết bạn thành công');
        dispatch(showNotification)
    }

    const handleClickAcceptFriend = async (e) => {
        e.stopPropagation();

        if (!anotherUser || !userId) return

        const data = {
            senderId: userId,
            receiverId: anotherUser
        }
        
        await sendAcceptFriend(data);

        const showNotification = updateNotification('Đồng ý yêu cầu kết bạn thành công');
        dispatch(showNotification)
    }
    //-------------life cycle---------------//
    useEffect(async () => {
        //check user is friend
        if (idChat.indexOf('G') === 0) return

        const result = (await checkFriend(userId, idChat)).data;

        switch (result.statusFriend) {
            case 1: {
                if (userId === result.data.sendId) {
                    setStatus(1);
                } else {
                    setStatus(2);
                }
                break;
            }

            case 2: {
                setStatus(3);
                break;
            }

            default: {
                setStatus(0)
            }
        }

        const ResultAnotherUser = (await getAnotherUserByGroupId(userId, idChat)).data.data;

        setAnotherUser(ResultAnotherUser);

        return () => {
            setAnotherUser(null);
            setStatus(null);
        }
    }, [idChat, updateManagerFriend]);

    return (
        <div className='item-function'>
            {status === 0 ? <p
                className='function-name'
                onClick={handleClickAddFriend}
            >Kết bạn</p> : ''}
            {status === 1 ? <p
                className='function-name red'
                onClick={handleClickCancelFriend}
            >Huỷ yêu cầu</p> : ''}
            {status === 2 ?
                <p
                    className='function-name'
                    onClick={handleClickAcceptFriend}
                >Đồng ý yêu cầu kết bạn</p> : ''}
            {status === 3 ? <p
                className='function-name red'
                onClick={handleClickDeleteFriend}
            >Huỷ kết bạn</p> : ''}
        </div>
    );
}

export default ManagerFriend;
